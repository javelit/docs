import os
import time
import json
import urllib.request
import urllib.parse

with open("streamlit_ref.json", "r") as f:
    s = json.load(f)

s = s["1.49.0"]
components = [e.replace("streamlit.", "") for e in s.keys()]
COMPONENTS = [ e for e in components
              if not (e.startswith("AppTest") or e.startswith("testing") or e.startswith("connections.") or e.startswith("column_config.") or "State" in e)]

# --- CONFIG ---
GITHUB_TOKEN = "ghp_something"  # Create one at https://github.com/settings/tokens
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"}
FILTER_STREAMLIT_ORG = True
RESULTS_FILE = "streamlit_results_filtered.json" if FILTER_STREAMLIT_ORG else "streamlit_results.json"
BASE_URL = "https://api.github.com/search/code?q="

# --- Load cached results if file exists ---
if os.path.exists(RESULTS_FILE):
    with open(RESULTS_FILE, "r") as f:
        RESULTS = json.load(f)
    print("✅ Loaded cached results")
else:
    RESULTS = {}

for comp in COMPONENTS:
    if comp in RESULTS:
        print(f"Skipping {comp}, already have cached result: {RESULTS[comp]}")
        continue

    query = f'"st.{comp}(" language:Python "import streamlit"'
    if FILTER_STREAMLIT_ORG:
        query += " -org:streamlit"
    url = BASE_URL + urllib.parse.quote(query)

    req = urllib.request.Request(url)
    req.add_header("Authorization", f"token {GITHUB_TOKEN}")
    req.add_header("Accept", "application/vnd.github.v3+json")

    print(f"🔍 Searching for: {query}")
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            RESULTS[comp] = data.get("total_count", 0)
            print(f"  → {RESULTS[comp]} occurrences")
    except Exception as e:
        print(f"⚠️ Error for {comp}: {e}")

    # Save intermediate results to file
    with open(RESULTS_FILE, "w") as f:
        json.dump(RESULTS, f, indent=2)

    time.sleep(5)  # avoid hitting rate limits

with open("streamlit_results_filtered.tsv" if FILTER_STREAMLIT_ORG else "streamlit_results.tsv", "w", encoding="utf-8") as f:
    # Write header
    f.write("component\tcount\n")
    # Write each component sorted by usage
    for comp, count in sorted(RESULTS.items(), key=lambda x: x[1], reverse=True):
        f.write(f"{comp}\t{count}\n")

print("✅ Results written to streamlit_results.tsv")
