---
title: Run your Jeamlit app
slug: /develop/concepts/architecture/run-your-app
---

# Run your Jeamlit app

Working with Jeamlit is simple. First you sprinkle a few Jeamlit commands into a normal Java class, and then you run it. 
We list few ways to run your script, depending on your use case.

## Use jeamlit standalone fat-jar



Once you've created your Java class, say `MyApp.java`, the easiest way to run it is with `jeamlit run`:

```bash
jeamlit run your_script.py
```

As soon as you run the script as shown above, a local Streamlit server will spin up and your app will open in a new tab in your default web browser.

### Pass arguments to your script

When passing your script some custom arguments, they must be passed after two dashes. Otherwise the arguments get interpreted as arguments to Streamlit itself:

```bash
streamlit run your_script.py [-- script args]
```

### Pass a URL to streamlit run

You can also pass a URL to `streamlit run`! This is great when your script is hosted remotely, such as a GitHub Gist. For example:

```bash
streamlit run https://raw.githubusercontent.com/streamlit/demo-uber-nyc-pickups/master/streamlit_app.py
```

## Run Streamlit as a Python module

Another way of running Streamlit is to run it as a Python module. This is useful when configuring an IDE like PyCharm to work with Streamlit:

```bash
# Running
python -m streamlit run your_script.py
```

```bash
# is equivalent to:
streamlit run your_script.py
```
