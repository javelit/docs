#!/usr/bin/env python3
"""
Script to sync ignore flags from menu.md to corresponding content files.
Reads menu.md, finds entries with ignore: true, then adds ignore: true
to matching content files based on slug matching.
"""

import os
import yaml
import glob
import re
from pathlib import Path

def read_menu_ignored_urls():
    """Read menu.md and extract URLs of entries with ignore: true"""
    menu_path = "/Users/cyril/projects/jeamlit-docs/content/menu.md"

    try:
        with open(menu_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract front matter
        if not content.startswith('---'):
            print("Error: menu.md doesn't have front matter")
            return []

        parts = content.split('---', 2)
        if len(parts) < 3:
            print("Error: Invalid front matter format in menu.md")
            return []

        front_matter = yaml.safe_load(parts[1])
        site_menu = front_matter.get('site_menu', [])

        ignored_urls = []
        for item in site_menu:
            if item.get('ignore') is True:
                url = item.get('url')
                if url:
                    ignored_urls.append(url)
                    print(f"Found ignored menu item: {item.get('category', 'Unknown')} -> {url}")

        return ignored_urls

    except Exception as e:
        print(f"Error reading menu.md: {e}")
        return []

def find_matching_content_files(ignored_urls):
    """Find content files with slugs matching the ignored URLs"""
    api_ref_path = "/Users/cyril/projects/jeamlit-docs/content/develop"
    md_files = glob.glob(os.path.join(api_ref_path, "**", "*.md"), recursive=True)

    matches = []

    for md_file in md_files:
        try:
            with open(md_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if file has front matter
            if not content.startswith('---'):
                continue

            parts = content.split('---', 2)
            if len(parts) < 3:
                continue

            front_matter = yaml.safe_load(parts[1])
            file_slug = front_matter.get('slug')

            if file_slug in ignored_urls:
                matches.append({
                    'file_path': md_file,
                    'slug': file_slug,
                    'current_ignore': front_matter.get('ignore', False)
                })

        except Exception as e:
            print(f"Error processing {md_file}: {e}")

    return matches

def add_ignore_to_frontmatter(file_path):
    """Add ignore: true to front matter of a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Split front matter and body
        parts = content.split('---', 2)
        if len(parts) < 3:
            return False, "No valid front matter found"

        front_matter_text = parts[1]
        body = parts[2]

        # Parse front matter
        front_matter = yaml.safe_load(front_matter_text)

        # Check if ignore is already set
        if front_matter.get('ignore') is True:
            return False, "ignore: true already present"

        # Add ignore: true
        front_matter['ignore'] = True

        # Convert back to YAML
        new_front_matter = yaml.dump(front_matter, default_flow_style=False, sort_keys=False)

        # Reconstruct file
        new_content = f"---\n{new_front_matter}---{body}"

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, "Added ignore: true"

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Main function to orchestrate the sync process"""
    print("Starting ignore flag sync process...")
    print("=" * 50)

    # Read ignored URLs from menu.md
    print("1. Reading menu.md for ignored entries...")
    ignored_urls = read_menu_ignored_urls()

    if not ignored_urls:
        print("No ignored URLs found in menu.md")
        return

    print(f"Found {len(ignored_urls)} ignored URLs:")
    for url in ignored_urls:
        print(f"  - {url}")
    print()

    # Find matching content files
    print("2. Searching for matching content files...")
    matches = find_matching_content_files(ignored_urls)

    if not matches:
        print("No matching content files found")
        return

    print(f"Found {len(matches)} matching files:")
    for match in matches:
        status = "already ignored" if match['current_ignore'] else "needs update"
        print(f"  - {match['file_path']} (slug: {match['slug']}) - {status}")
    print()

    # Update files
    print("3. Updating front matter...")
    updated_count = 0

    for match in matches:
        file_path = match['file_path']
        relative_path = os.path.relpath(file_path, "/Users/cyril/projects/jeamlit-docs")

        success, message = add_ignore_to_frontmatter(file_path)

        if success:
            updated_count += 1
            print(f"  ✓ {relative_path}: {message}")
        else:
            print(f"  ✗ {relative_path}: {message}")

    print()
    print("=" * 50)
    print(f"Summary:")
    print(f"  Total ignored URLs in menu: {len(ignored_urls)}")
    print(f"  Matching content files found: {len(matches)}")
    print(f"  Files updated: {updated_count}")

if __name__ == "__main__":
    main()
