---
title: Run your Javelit app
slug: /develop/concepts/architecture/run-your-app
---

# Run your Javelit app

Working with Javelit is simple. First you sprinkle a few Javelit commands into a normal Java class, and then you run it. 
We list few ways to run your app, depending on your use case.

## Use javelit Standalone
Once you've created your Java class, say `MyApp.java`, the easiest way to run it is with `javelit run`:

```bash
javelit run MyApp.java
```

As soon as you run the script as shown above, a local Javelit server will spin up and your app will open in a new tab in your default web browser.

### Pass a URL to javelit run

You can also pass a URL to `javelit run`! This is great when your script is hosted remotely, such as a GitHub Gist. For example:

```bash
javelit run https://raw.githubusercontent.com/javelit/javelit/main/examples/getting_started/App.java
```

You can also pass a GitHub folder! This is especially handy for multipage apps.
```bash
javelit run  https://github.com/javelit/javelit/tree/main/examples/multipage_ai
```

For a folder, the convention to find the app entrypoint is the following: 
- if there is a single `.java` file at the root of the folder (other pages are put in a subfolder), this file is the entrypoint
- if a file named `App.java` is present, it is the entrypoint
- if a file named `Main.java` is present, it is the entrypoint
- an error is thrown


## Use Javelit embedded
You can embed Javelit in your existing Java project.
See [quick installation](/get-started/installation#embedded-server) and [javelit embedded details](/get-started/installation/embedded-vanilla).
