#!/usr/bin/env python3
"""
fix_slugs_from_contentindex.py

- Read public/static/contentIndex.json
- For each entry that has a 'path' pointing to content/... and a 'url',
  ensure the source content file has frontmatter with:
    slug: "<clean-slug>"
    aliases: ["<old-url>", ...]
- Dry-run mode shows planned edits.
- Backs up original file as <file>.bak before modifying.

Usage:
  ./scripts/fix_slugs_from_contentindex.py --dry-run
  ./scripts/fix_slugs_from_contentindex.py        # to apply (creates .bak files)
"""
import argparse, json, os, re, shutil
from pathlib import Path
from urllib.parse import unquote
import unicodedata

def slugify_for_frontmatter(s: str) -> str:
    # Make ASCII-safe slug with leading/trailing slash
    s = unquote(s)  # decode percent-encodings if present
    # remove protocol/host if present
    s = re.sub(r"^https?://[^/]+", "", s)
    # strip query/hash
    s = re.sub(r"[\?#].*$", "", s)
    s = s.strip()
    # normalize unicode -> ascii
    s = unicodedata.normalize("NFKD", s)
    s = s.encode("ascii", "ignore").decode("ascii")
    s = s.replace("\\", "/")
    s = re.sub(r"//+", "/", s)
    # replace non-alnum/slash with dash
    s = re.sub(r"[^a-zA-Z0-9/]+", "-", s)
    s = re.sub(r"-{2,}", "-", s)
    s = s.strip("-")
    s = s.strip("/")
    if s == "":
        return "/"
    return "/" + s + "/"

def read_frontmatter(text: str):
    # returns (fm_dict as text, content_after) - we won't parse YAML fully, but keep original fm block
    if text.startswith("---"):
        parts = text.split("---", 2)
        # parts[0] == "" , parts[1] == frontmatter, parts[2] == rest (may start with newline)
        if len(parts) >= 3:
            fm_raw = parts[1].strip()
            rest = parts[2].lstrip("\n")
            return fm_raw, rest
    return None, text

def build_new_frontmatter(orig_fm_raw: str, desired_slug: str, aliases_list):
    # parse existing frontmatter blocks lines, try to keep other keys
    lines = []
    kept = {}
    if orig_fm_raw:
        for line in orig_fm_raw.splitlines():
            m = re.match(r"^([A-Za-z0-9_\-]+):\s*(.*)$", line)
            if m:
                key = m.group(1)
                val = m.group(2).strip()
                kept[key] = val
            else:
                # preserve raw lines that don't match simple key: value
                lines.append(line)
    # build new mapping, overriding slug and aliases
    fm_lines = []
    fm_lines.append(f"slug: \"{desired_slug}\"")
    if aliases_list:
        fm_lines.append("aliases:")
        for a in aliases_list:
            fm_lines.append(f"  - \"{a}\"")
    # preserve other scalar keys from original frontmatter except slug/aliases
    for key, val in kept.items():
        if key in ("slug", "aliases"):
            continue
        fm_lines.insert(0, f"{key}: {val}")  # insert so original keys appear above slug
    return "\n".join(fm_lines)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--content-root", "-c", default="content", help="content folder root")
    ap.add_argument("--contentindex", "-j", default="public/static/contentIndex.json", help="path to contentIndex.json")
    ap.add_argument("--dry-run", action="store_true", help="don't modify files, only show planned changes")
    args = ap.parse_args()

    ci_path = Path(args.contentindex)
    if not ci_path.exists():
        print(f"[ERR] contentIndex.json not found at: {ci_path}")
        return 1

    data = json.loads(ci_path.read_text(encoding="utf-8"))
    # contentIndex.json may be list or dict with items
    entries = []
    if isinstance(data, dict) and "items" in data:
        entries = data["items"]
    elif isinstance(data, list):
        entries = data
    else:
        # try to extract list-like
        entries = data if isinstance(data, list) else []

    planned = []

    for e in entries:
        src = e.get("path")  # e.g. "content/1- Ders Notları (YBS)/1. Sınıf/index.md"
        url = e.get("url")
        if not src or not url:
            continue
        # only handle content files under content root
        if not str(src).startswith(args.content_root):
            continue
        src_path = Path(src)
        if not src_path.exists():
            # sometimes path is different form; try to find file by name
            # skip if not found
            continue

        # compute desired slug (safe) and alias (original url)
        desired_slug = slugify_for_frontmatter(str(src_path.parent.relative_to(args.content_root)))
        # the e['url'] may be percent-encoded; also create decoded form
        decoded_url = unquote(url)
        # ensure decoded url has leading slash and trailing slash
        if not decoded_url.startswith("/"):
            decoded_url = "/" + decoded_url
        if not decoded_url.endswith("/"):
            decoded_url = decoded_url + "/"

        # if desired_slug equals decoded_url (normalized), maybe no change needed
        norm_decoded = slugify_for_frontmatter(decoded_url)
        need_alias = (norm_decoded != desired_slug)

        # read file frontmatter
        text = src_path.read_text(encoding="utf-8")
        orig_fm_raw, body = read_frontmatter(text)
        # determine if slug/aliases present already
        already_slug = False
        already_aliases = False
        if orig_fm_raw:
            if re.search(r"(?m)^slug:\s*(.+)$", orig_fm_raw):
                already_slug = True
            if re.search(r"(?m)^aliases:\s*", orig_fm_raw):
                already_aliases = True

        # plan: if slug missing or slug not equal desired_slug OR alias missing then add/update
        planned_change = {
            "src": str(src_path),
            "desired_slug": desired_slug,
            "decoded_url": decoded_url,
            "has_slug": already_slug,
            "has_aliases": already_aliases,
            "need_alias": need_alias
        }
        # build new frontmatter if needed
        if already_slug and not need_alias:
            # nothing to do
            continue

        planned.append(planned_change)

    if not planned:
        print("[OK] No updates needed.")
        return 0

    print(f"[PLAN] {len(planned)} files to update:")
    for p in planned:
        print(f" - {p['src']}\n    desired_slug: {p['desired_slug']}\n    decoded_url: {p['decoded_url']}\n    has_slug: {p['has_slug']}  has_aliases: {p['has_aliases']}\n")

    if args.dry_run:
        print("\n[DRY-RUN] run without --dry-run to apply changes.")
        return 0

    # Apply changes
    for p in planned:
        src_path = Path(p["src"])
        bak = src_path.with_suffix(src_path.suffix + ".bak")
        shutil.copy2(src_path, bak)
        text = src_path.read_text(encoding="utf-8")
        orig_fm_raw, body = read_frontmatter(text)
        # build aliases: include decoded_url and also norm_decoded (slug form) if different
        decoded_url = p["decoded_url"]
        norm_decoded = slugify_for_frontmatter(decoded_url)
        aliases = []
        if decoded_url:
            aliases.append(decoded_url)
        if norm_decoded and norm_decoded != decoded_url:
            aliases.append(norm_decoded)
        # ensure uniqueness
        uniq_aliases = []
        for a in aliases:
            if a not in uniq_aliases:
                uniq_aliases.append(a)
        new_fm = build_new_frontmatter(orig_fm_raw, p["desired_slug"], uniq_aliases)
        new_text = f"---\n{new_fm}\n---\n\n{body}"
        src_path.write_text(new_text, encoding="utf-8")
        print(f"[UPDATED] {src_path} (bak: {bak.name})")

    print("\n[OK] Updates applied. Now run: rm -rf public && npx quartz build --serve")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
