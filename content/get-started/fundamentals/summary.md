---
title: App model summary
slug: /get-started/fundamentals/summary
---

# App model summary

Now that you know a little more about all the individual pieces, let's close
the loop and review how it works together:

1. Javelit apps are Java class main methods that run from top to bottom.
2. Every time a user opens a browser tab pointing to your app, the main method is executed and a new session starts.
3. As the method executes, Javelit draws its output live in a browser.
4. Every time a user interacts with a widget, your method is re-executed and Javelit redraws its output in the browser.
   - The output value of that widget matches the new value during that rerun.
5. Methods use the Javelit **Cache** to avoid recomputing expensive functions, so updates happen very fast.
6. **Session State** lets you save information that persists between reruns when you need more than a simple widget.
7. Javelit apps can contain multiple pages, which are defined in separate Java classes.

![The Javelit app model](/images/app_model.png)
