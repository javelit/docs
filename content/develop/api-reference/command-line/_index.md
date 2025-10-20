---
title: Command-line options
slug: /develop/api-reference/cli
---

# Command-line interface

When you use the Javelit fat jar — a jar that contains javelit and all its dependencies packaged together — a command-line (CLI) tool is available.
The purpose of this tool is to run Javelit apps, change Javelit configuration options,
and help you diagnose and fix issues.

## Available commands

{/*

- [`javelit cache clear`](/develop/api-reference/cli/cache): Clear the on-disk cache.
- [`javelit config show`](/develop/api-reference/cli/config): Show all configuration options.
- [`javelit docs`](/develop/api-reference/cli/docs): Open the Javelit docs.
- [`javelit hello`](/develop/api-reference/cli/hello): Run an example Javelit app.
- [`javelit init`](/develop/api-reference/cli/init): Create the files for a new Javelit app.
  */}
- [`javelit --help`](/develop/api-reference/cli/help): Show the available CLI commands.
- [`javelit run`](/develop/api-reference/cli/run): Run your Javelit app.
- [`javelit --version`](/develop/api-reference/cli/version): Show the version of Javelit.

### Run your app

The most important command is `javelit run`, which is summarized for convenience here:

```bash
javelit run YourApp.java
```

At any time, in your terminal, you can stop the server with **Ctrl+C**.
