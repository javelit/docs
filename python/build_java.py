#!/usr/bin/env python3
"""
Script to download javadoc JARs from Maven Central and extract javelit.json files.
Creates a combined JSON file with all versions.
"""

import urllib.request
import xml.etree.ElementTree as ET
import zipfile
import json
import tempfile
import os
from pathlib import Path

# Constants
MAVEN_METADATA_URL = "https://repo1.maven.org/maven2/io/javelit/javelit/maven-metadata.xml"
MAVEN_JAR_URL_TEMPLATE = "https://repo1.maven.org/maven2/io/javelit/javelit/{version}/javelit-{version}-javadoc.jar"
LOOKBACK = 1
OUTPUT_FILE = "javelit.json"


def fetch_versions():
    """Fetch all versions from Maven metadata XML."""
    print(f"Fetching versions from {MAVEN_METADATA_URL}")

    try:
        response = urllib.request.urlopen(MAVEN_METADATA_URL)
        xml_content = response.read()
        root = ET.fromstring(xml_content)
        all_versions = [v.text for v in root.findall(".//version")]
        print(f"Found {len(all_versions)} total versions")
        print(f"Keeping the last {LOOKBACK} versions")

        return all_versions[-LOOKBACK:]

    except Exception as e:
        print(f"Error fetching versions: {e}")
        return []


def load_existing_versions():
    """Load existing versions from javelit.json if it exists."""
    if not os.path.exists(OUTPUT_FILE):
        print(f"No existing {OUTPUT_FILE} found")
        return set(), {}

    try:
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
        existing_versions = set(existing_data.keys())
        print(f"Found existing {OUTPUT_FILE} with {len(existing_versions)} versions: {list(existing_versions)}")
        return existing_versions, existing_data
    except Exception as e:
        print(f"Error reading existing {OUTPUT_FILE}: {e}")
        return set(), {}


def download_and_extract_json(version_str):
    """Download javadoc JAR for a version and extract javelit.json."""
    jar_url = MAVEN_JAR_URL_TEMPLATE.format(version=version_str)
    print(f"Processing version {version_str}")
    print(f"  Downloading: {jar_url}")

    try:
        # Create temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            # Download JAR file
            jar_path = os.path.join(temp_dir, f"javelit-{version_str}-javadoc.jar")
            urllib.request.urlretrieve(jar_url, jar_path)
            print(f"  Downloaded to: {jar_path}")

            # Extract JAR (it's a ZIP file)
            extract_dir = os.path.join(temp_dir, "extracted")
            with zipfile.ZipFile(jar_path, 'r') as zip_ref:
                zip_ref.extractall(extract_dir)
            print(f"  Extracted to: {extract_dir}")

            # Find javelit.json (always at root of extracted JAR)
            javelit_json_path = os.path.join(extract_dir, "javelit.json")

            if os.path.exists(javelit_json_path):
                print(f"  Found javelit.json at: {javelit_json_path}")

                # Read and parse JSON
                with open(javelit_json_path, 'r', encoding='utf-8') as f:
                    json_content = json.load(f)

                print(f"  Loaded JSON with {len(json_content)} entries")
                return json_content
            else:
                print(f"  WARNING: javelit.json not found in {version_str} JAR")
                return None

    except Exception as e:
        print(f"  ERROR processing version {version_str}: {e}")
        return None


def download_atom_feed():
    """Download Atom feed and save to public directory."""
    feed_url = "https://world.hey.com/cdecatheu/feed.atom"
    output_path = Path(__file__).parent.parent / "public" / "feed.atom"
    print(f"\nDownloading Atom feed from {feed_url}")
    try:
        # passing a user-agent to avoid 403
        req = urllib.request.Request(
            feed_url,
            headers={'User-Agent': 'curl/8.7.1'}
        )

        with urllib.request.urlopen(req) as response:
            feed_content = response.read()

        # Write to file
        with open(output_path, 'wb') as f:
            f.write(feed_content)

        print(f"Successfully saved feed to {output_path}")
        return feed_content
    except Exception as e:
        print(f"ERROR downloading Atom feed: {e}")
        raise e


def generate_feed_summary_entries():
    """Create empty summary entries for new feed posts."""
    print("\n=== Updating feed summaries ===")
    feed_path = Path(__file__).parent.parent / "public" / "feed.atom"
    summaries_path = Path(__file__).parent.parent / "public" / "feed-summaries.json"
    existing_summaries = {}
    if summaries_path.exists():
        try:
            with open(summaries_path, 'r', encoding='utf-8') as f:
                existing_summaries = json.load(f)
            print(f"Loaded {len(existing_summaries)} existing summaries")
        except Exception as e:
            print(f"Error loading existing summaries: {e}")
    if not feed_path.exists():
        print(f"ERROR: Feed file not found at {feed_path}")
        return
    try:
        tree = ET.parse(feed_path)
        root = tree.getroot()
        # Handle Atom namespace
        ns = {'atom': 'http://www.w3.org/2005/Atom'}
        entries = root.findall('atom:entry', ns)
        print(f"Found {len(entries)} entries in feed")
        new_entries = 0
        for entry in entries:
            # Extract URL as unique ID
            link = entry.find('atom:link[@rel="alternate"]', ns)
            if link is None:
                continue
            url = link.get('href')
            # Skip if we already have an entry (preserve manual summaries)
            if url in existing_summaries:
                print(f"  Skipping {url} (already exists)")
                continue
            # Add empty summary for new posts
            existing_summaries[url] = ""
            new_entries += 1
            print(f"  Added empty entry for {url}")
        # Save summaries
        with open(summaries_path, 'w', encoding='utf-8') as f:
            json.dump(existing_summaries, f, indent=2, ensure_ascii=False)
        print(f"\nSaved {len(existing_summaries)} entries to {summaries_path}")
        if new_entries > 0:
            print(f"  ({new_entries} new empty entries added - fill them in manually)")
    except Exception as e:
        print(f"ERROR updating summaries: {e}")

def main():
    """Main function to orchestrate the process."""
    # Download Atom feed
    download_atom_feed()

    # Generate summaries for feed entries
    generate_feed_summary_entries()

    print("Starting javelit documentation build process...")
    # Fetch versions to process
    versions = fetch_versions()
    if not versions:
        print("No versions found, exiting.")
        return

    # Load existing versions and filter out already processed ones
    existing_versions, existing_data = load_existing_versions()
    versions_to_process = [v for v in versions if v not in existing_versions]

    if existing_versions:
        skipped_versions = [v for v in versions if v in existing_versions]
        if skipped_versions:
            print(f"Skipping {len(skipped_versions)} already processed versions: {skipped_versions}")

    if not versions_to_process:
        print("All versions already processed, nothing to do.")
        return

    print(f"Processing {len(versions_to_process)} new versions: {versions_to_process}")

    # Process each new version
    new_versions_data = {}
    for version_str in versions_to_process:
        json_content = download_and_extract_json(version_str)
        if json_content:
            new_versions_data[version_str] = json_content
        else:
            print(f"Skipping version {version_str} due to errors")

    # Combine existing data with new data
    all_versions_data = existing_data.copy()
    all_versions_data.update(new_versions_data)

    # Write combined JSON
    if new_versions_data or existing_data:
        print(f"\nWriting combined data for {len(all_versions_data)} versions to {OUTPUT_FILE}")
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(all_versions_data, f, indent=2, ensure_ascii=False)

        print(f"Successfully updated {OUTPUT_FILE}")
        print(f"Total versions: {list(all_versions_data.keys())}")
        if new_versions_data:
            print(f"New versions added: {list(new_versions_data.keys())}")
    else:
        print("No data to write")


if __name__ == "__main__":
    main()
