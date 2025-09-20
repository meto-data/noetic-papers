#!/usr/bin/env python3
import sys, shutil
from pathlib import Path
from urllib.parse import unquote

if len(sys.argv) < 3:
    print("Usage: add_alias_to_file.py <content-file> <alias-url>")
    sys.exit(2)

file = Path(sys.argv[1])
alias = sys.argv[2].strip()
decoded = unquote(alias)

if not file.exists():
    print("ERR: file not found:", file)
    sys.exit(1)

bak = file.with_suffix(file.suffix + ".bak")
shutil.copy2(file, bak)

text = file.read_text(encoding='utf-8')
if text.startswith('---'):
    parts = text.split('---', 2)
    fm_raw = parts[1].strip()
    body = parts[2].lstrip("\n")
else:
    fm_raw = ""
    body = text

# prepare aliases block
aliases_block = f'aliases:\\n  - "{alias}"\\n  - "{decoded}"'

if 'aliases:' in fm_raw:
    # very simple check to avoid duplicates
    if alias in fm_raw or decoded in fm_raw:
        print("Alias already present, nothing to do.")
    else:
        fm_raw = fm_raw + "\\n" + aliases_block
else:
    # insert slug placeholder if there is no fm at all
    fm_raw = (fm_raw + "\\n" if fm_raw else "") + aliases_block

new_text = '---\\n' + fm_raw + '\\n---\\n\\n' + body
file.write_text(new_text, encoding='utf-8')
print("OK: alias added to", file, "(bak at", bak.name,")")
