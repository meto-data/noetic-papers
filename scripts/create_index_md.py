#!/usr/bin/env python3
"""
create_index_md.py

- Recursively scans a content root (default: ./content)
- For every directory that DOES NOT contain index.md or README.md (case-insensitive),
  creates content/<dir>/index.md with a safe slug and a minimal frontmatter + placeholder.
- Has a dry-run mode to preview changes.
- Ignores common folders: .obsidian, private, templates, quartz, public, node_modules.
"""

import os, sys, argparse, unicodedata, re
from pathlib import Path

IGNORE = {".obsidian", "private", "templates", "quartz", "public", "node_modules", ".git"}

def slugify(path: str) -> str:
    # normalize unicode -> ascii
    s = unicodedata.normalize("NFKD", path)
    s = s.encode("ascii", "ignore").decode("ascii")
    s = s.lower()
    # replace separators with -
    s = re.sub(r"[\/\\]+", "/", s)
    # replace any non-alnum/slash with dash
    s = re.sub(r"[^a-z0-9/]+", "-", s)
    # collapse multiple dashes
    s = re.sub(r"-{2,}", "-", s)
    # trim dashes/slashes
    s = s.strip("-")
    s = s.strip("/")
    if s == "":
        return "/"
    return "/" + s + "/"

def pretty_title(name: str) -> str:
    # simple cleanup for title: replace -, _ and multiple spaces; keep original chars
    title = name.replace("-", " ").replace("_", " ").strip()
    title = re.sub(r"\s{2,}", " ", title)
    return title

def has_index_like(files):
    names = [f.lower() for f in files]
    return ("index.md" in names) or ("readme.md" in names)

def main():
    ap = argparse.ArgumentParser(description="Create missing index.md files under content/")
    ap.add_argument("--root", "-r", default="content", help="content root (default: content)")
    ap.add_argument("--dry-run", action="store_true", help="show what would be created")
    ap.add_argument("--verbose", "-v", action="store_true", help="verbose output")
    ap.add_argument("--skip-empty", action="store_true", help="skip directories with no markdown children")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    if not root.exists():
        print(f"[ERR] root not found: {root}")
        sys.exit(1)

    to_create = []

    for dirpath, dirnames, filenames in os.walk(root):
        # filter ignored directories in-place so os.walk doesn't walk into them
        dirnames[:] = [d for d in dirnames if d not in IGNORE]

        # skip hidden dirs
        rel = os.path.relpath(dirpath, root)
        parts = rel.split(os.sep)
        if any(p.startswith('.') for p in parts if p not in ('.',)):
            continue

        # check presence of index/readme
        if has_index_like(filenames):
            if args.verbose:
                print(f"[SKIP] has index/readme: {dirpath}")
            continue

        # optionally skip dirs with no markdown children
        md_children = [f for f in filenames if f.lower().endswith(".md")]
        if args.skip_empty and not md_children:
            if args.verbose:
                print(f"[SKIP] no md files: {dirpath}")
            continue

        # compile slug from rel path
        # for root folder (dirpath == root) use '/'
        if os.path.samefile(dirpath, str(root)):
            slug = "/"
            title = "Home"
        else:
            relpath = os.path.relpath(dirpath, root)
            # convert OS sep to '/'
            relposix = relpath.replace(os.sep, "/")
            slug = slugify(relposix)
            title = pretty_title(os.path.basename(dirpath))

        to_create.append((dirpath, title, slug, md_children))

    if not to_create:
        print("[OK] No missing index.md files detected.")
        return

    print(f"[INFO] Directories missing index.md: {len(to_create)}")
    for i, (d, title, slug, children) in enumerate(to_create, 1):
        print(f"  {i}. {d} -> title: '{title}', slug: '{slug}', md_children: {len(children)}")

    if args.dry_run:
        print("\n[DRY-RUN] No files created. Rerun without --dry-run to create index.md files.")
        return

    # create the files
    for d, title, slug, children in to_create:
        idx_path = Path(d) / "index.md"
        if idx_path.exists():
            print(f"[WARN] unexpectedly exists (skipping): {idx_path}")
            continue
        # generate a simple children list for convenience
        children_md = ""
        if children:
            children_md_lines = []
            # sort children alphabetically but prefer numeric prefixes first
            children_sorted = sorted(children, key=lambda x: x.lower())
            for f in children_sorted:
                if f.lower() == "index.md": 
                    continue
                name_noext = Path(f).stem
                display = pretty_title(name_noext)
                # link to filename (Quartz will resolve accordingly)
                children_md_lines.append(f"- [{display}]({f})")
            if children_md_lines:
                children_md = "\n\n## İçerik\n\n" + "\n".join(children_md_lines) + "\n"

        content = f"""---
title: "{title}"
slug: "{slug}"
---

# {title}

Bu klasörün ana sayfası. Eğer istersen buraya kısa bir açıklama koy.

{children_md}
"""
        try:
            with open(idx_path, "w", encoding="utf-8") as fh:
                fh.write(content)
            print(f"[CREATED] {idx_path}")
        except Exception as e:
            print(f"[ERR] writing {idx_path}: {e}")

    print("\n[OK] index.md oluşturma tamamlandı. Şimdi `npx quartz build --serve` ile test et.")

if __name__ == "__main__":
    main()
