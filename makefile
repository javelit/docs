.PHONY: all
all:
	npm i

.PHONY: up
up:
	npm run dev

.PHONY: start
start:
	npm run start

.PHONY: export
export: llms
	npm run export

.PHONY: llms
llms:
	uv run python/generate_llms_full_txt.py

.PHONY: lint
lint:
	npm run lint

.PHONY: search
search:
	node ./scripts/build-search-index.js

.PHONY: docstrings
docstrings:
	cd python && python3 build_java.py
