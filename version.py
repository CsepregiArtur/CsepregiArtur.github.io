"""Update the version timestamp in index.html and connect.html.

Usage:
    python version.py           # stamp v1.4-<current timestamp>
    python version.py <custom>  # stamp v1.4-<custom>

Run before every push so each deploy gets a unique timestamp.
"""

import re
import sys
from datetime import datetime

FILES = ["index.html", "connect.html"]
# Matches v1.4- followed by exactly 12 digits
PATTERN = re.compile(r'(v1\.4-)(\d{12})')
# Matches the full version+copyright line for replacement
LINE_PATTERN = re.compile(
    r'(© 2026 Artur Csepregi · v)1\.4-\d{12}'
)


def main():
    if len(sys.argv) > 1:
        ts = sys.argv[1]
    else:
        ts = datetime.now().strftime("%Y%m%d%H%M")

    if not re.match(r'^\d{12}$', ts):
        print(f"Error: timestamp must be 12 digits, got '{ts}'")
        sys.exit(1)

    new_version = f"v1.4-{ts}"

    for filepath in FILES:
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        def replace_line(m):
            return f"© 2026 Artur Csepregi · {new_version}"

        updated = LINE_PATTERN.sub(replace_line, content)

        if updated == content:
            print(f"⚠  {filepath}: version pattern not found — skipping")
        else:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(updated)
            print(f"✓  {filepath} → {new_version}")

    print("Done.")


if __name__ == "__main__":
    main()
