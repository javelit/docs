---
title: Command-line options
slug: /develop/api-reference/cli
---

# Command-line interface

When you use the Jeamlit fat jar — a jar that contains jeamlit and all its dependencies packaged together — a command-line (CLI) tool is available.
The purpose of this tool is to run Jeamlit apps, change Jeamlit configuration options,
and help you diagnose and fix issues.

## Available commands

{/\*\*

- [`jeamlit cache clear`](/develop/api-reference/cli/cache): Clear the on-disk cache.
- [`jeamlit config show`](/develop/api-reference/cli/config): Show all configuration options.
- [`jeamlit docs`](/develop/api-reference/cli/docs): Open the Jeamlit docs.
- [`jeamlit hello`](/develop/api-reference/cli/hello): Run an example Jeamlit app.
- [`jeamlit init`](/develop/api-reference/cli/init): Create the files for a new Jeamlit app.
  \*\*/}
- [`jeamlit --help`](/develop/api-reference/cli/help): Show the available CLI commands.
- [`jeamlit run`](/develop/api-reference/cli/run): Run your Jeamlit app.
- [`jeamlit --version`](/develop/api-reference/cli/version): Show the version of Jeamlit.

### Run your app

The most important command is `jeamlit run`, which is summarized for convenience here:

```bash
jeamlit run YourApp.java
```

At any time, in your terminal, you can stop the server with **Ctrl+C**.
