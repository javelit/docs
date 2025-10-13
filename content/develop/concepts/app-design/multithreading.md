---
title: Threading in Jeamlit
slug: /develop/concepts/design/multithreading
---

# Multithreading in Jeamlit

Jeamlit uses threads within its architecture, which can make it difficult for app developers to include their own multithreaded processes.

<Note>
Jeamlit Threading experience is a work in progress. Reach out [on the forum](https://github.com/jeamlit/jeamlit/discussions/) for any question. 
</Note>

Here is the current state:

- ❌ `Jt.` **commands in Threads are not supported** ❌
  ```java
  // DON'T - will throw an exception
  new Thread(
    () -> {Jt.text("Hello").use();}
  ).start();
  ```
- ❌ **non-daemon threads can outlive the app run and leak ...** ❌
  ```java
  // DON'T - the scheduler will run forever - one new scheduler will be recreated at every app run
  ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
  scheduler.scheduleAtFixedRate(() -> {...}, 10, 10, TimeUnit.SECONDS)
  ```
- ✅ **... but in some cases it's ok** ✅
    ````java
  // DANGEROUS but ok-ish - will complete eventually - using Threads for logging/tracing/metrics purpose is ok    
  new Thread(() -> {System.out.println("Log some traces")}).start();
  ````
- ✅ **Compute/IO in threads is supported, but make sure to complete all threads and shutdown the scheduler** ✅
  ```java
  // OK - background computation, render results on main thread
  ExecutorService executor = Executors.newFixedThreadPool(4);
  try {
      List<Future<String>> futures = new ArrayList<>();
      for (int i = 0; i < 5; i++) {
          final int taskId = i;
          futures.add(executor.submit(() -> {
              // ✅ Can do computation/IO here
              Thread.sleep(1000);
              return "Task " + taskId + " completed";
          }));
      }

      // Collect results and display on main thread
      for (Future<String> future : futures) {
          String result = future.get(); // Wait for result
          Jt.text(result).use(); // ✅ Safe - on main thread
      }
  } catch (ExecutionException e) {
            throw new RuntimeException(e);
  } finally {
      executor.shutdown(); // Always clean up
  }
  ```


{/* 

Multithreading is a type of concurrency, which improves the efficiency of computer programs. It's a way for processors to multitask. Jeamlit uses threads within its architecture, which can make it difficult for app developers to include their own multithreaded processes. Jeamlit does not officially support multithreading in app code, but this guide provides information on how it can be accomplished.

## Prerequisites

- You should have a basic understanding of Jeamlit's [architecture](/develop/concepts/architecture/architecture).

## When to use multithreading

Multithreading is just one type of concurrency. Multiprocessing and coroutines are other forms of concurrency. You need to understand how your code is bottlenecked to choose the correct kind of concurrency.

Multiprocessing is inherently parallel, meaning that resources are split and multiple tasks are performed simultaneously. Therefore, multiprocessing is helpful with compute-bound operations. In contrast, multithreading and coroutines are not inherently parallel and instead allow resource switching. This makes them good choices when your code is stuck _waiting_ for something, like an IO operation. AsyncIO uses coroutines and may be preferable with very slow IO operations. Threading may be preferable with faster IO operations. For a helpful guide to using AsyncIO with Jeamlit, see this [Medium article by Sehmi-Conscious Thoughts](https://sehmi-conscious.medium.com/got-that-asyncio-feeling-f1a7c37cab8b).

Don't forget that Jeamlit has [fragments](/develop/concepts/architecture/fragments) and [caching](/develop/concepts/architecture/caching), too! Use caching to avoid unnecessarily repeating computations or IO operations. Use fragments to isolate a bit of code you want to update separately from the rest of the app. You can set fragments to rerun at a specified interval, so they can be used to stream updates to a chart or table.

## Threads created by Jeamlit

Jeamlit creates two types of threads in Python:

- The **server thread** runs the Tornado web (HTTP + WebSocket) server.
- A **script thread** runs page code &mdash; one thread for each script run in a session.

When a user connects to your app, this creates a new session and runs a script thread to initialize the app for that user. As the script thread runs, it renders elements in the user's browser tab and reports state back to the server. When the user interacts with the app, another script thread runs, re-rendering the elements in the browser tab and updating state on the server.

This is a simplifed illustration to show how Jeamlit works:

![Each user session uses script threads to communicate between the user's front end and the Jeamlit server.](/images/concepts/Streamlit-threading.svg)

## `streamlit.errors.NoSessionContext`

Many Jeamlit commands, including `st.session_state`, expect to be called from a script thread. When Jeamlit is running as expected, such commands use the `ScriptRunContext` attached to the script thread to ensure they work within the intended session and update the correct user's view. When those Jeamlit commands can't find any `ScriptRunContext`, they raise a `streamlit.errors.NoSessionContext` exception. Depending on your logger settings, you may also see a console message identifying a thread by name and warning, "missing ScriptRunContext!"

## Creating custom threads

When you work with IO-heavy operations like remote query or data loading, you may need to mitigate delays. A general programming strategy is to create threads and let them work concurrently. However, if you do this in a Jeamlit app, these custom threads may have difficulty interacting with your Jeamlit server.

This section introduces two patterns to let you create custom threads in your Jeamlit app. These are only patterns to provide a starting point rather than complete solutions.

### Option 1: Do not use Jeamlit commands within a custom thread

If you don't call Jeamlit commands from a custom thread, you can avoid the problem entirely. Luckily Python threading provides ways to start a thread and collect its result from another thread.

In the following example, five custom threads are created from the script thread. After the threads are finished running, their results are displayed in the app.

```python
import streamlit as st
import time
from threading import Thread


class WorkerThread(Thread):
    def __init__(self, delay):
        super().__init__()
        self.delay = delay
        self.return_value = None

    def run(self):
        start_time = time.time()
        time.sleep(self.delay)
        end_time = time.time()
        self.return_value = f"start: {start_time}, end: {end_time}"


delays = [5, 4, 3, 2, 1]
threads = [WorkerThread(delay) for delay in delays]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()
for i, thread in enumerate(threads):
    st.header(f"Thread {i}")
    st.write(thread.return_value)

st.button("Rerun")
```

<Cloud name="doc-multithreading-no-st-commands-batched" height="700px" />

If you want to display results in your app as various custom threads finish running, use containers. In the following example, five custom threads are created similarly to the previous example. However, five containers are initialized before running the custom threads and a `while` loop is used to display results as they become available. Since the Jeamlit `write` command is called outside of the custom threads, this does not raise an exception.

```python
import streamlit as st
import time
from threading import Thread


class WorkerThread(Thread):
    def __init__(self, delay):
        super().__init__()
        self.delay = delay
        self.return_value = None

    def run(self):
        start_time = time.time()
        time.sleep(self.delay)
        end_time = time.time()
        self.return_value = f"start: {start_time}, end: {end_time}"


delays = [5, 4, 3, 2, 1]
result_containers = []
for i, delay in enumerate(delays):
    st.header(f"Thread {i}")
    result_containers.append(st.container())

threads = [WorkerThread(delay) for delay in delays]
for thread in threads:
    thread.start()
thread_lives = [True] * len(threads)

while any(thread_lives):
    for i, thread in enumerate(threads):
        if thread_lives[i] and not thread.is_alive():
            result_containers[i].write(thread.return_value)
            thread_lives[i] = False
    time.sleep(0.5)

for thread in threads:
    thread.join()

st.button("Rerun")
```

<Cloud name="doc-multithreading-no-st-commands-iterative" height="700px" />

### Option 2: Expose `ScriptRunContext` to the thread

If you want to call Jeamlit commands from within your custom threads, you must attach the correct `ScriptRunContext` to the thread.

<Warning>

- This is not officially supported and may change in a future version of Jeamlit.
- This may not work with all Jeamlit commands.
- Ensure custom threads do not outlive the script thread owning the `ScriptRunContext`. Leaking of `ScriptRunContext` may cause security vulnerabilities, fatal errors, or unexpected behavior.

</Warning>

In the following example, a custom thread with `ScriptRunContext` attached can call `st.write` without a warning.

```python
import streamlit as st
from streamlit.runtime.scriptrunner import add_script_run_ctx, get_script_run_ctx
import time
from threading import Thread


class WorkerThread(Thread):
    def __init__(self, delay, target):
        super().__init__()
        self.delay = delay
        self.target = target

    def run(self):
        # runs in custom thread, but can call Jeamlit APIs
        start_time = time.time()
        time.sleep(self.delay)
        end_time = time.time()
        self.target.write(f"start: {start_time}, end: {end_time}")


delays = [5, 4, 3, 2, 1]
result_containers = []
for i, delay in enumerate(delays):
    st.header(f"Thread {i}")
    result_containers.append(st.container())

threads = [
    WorkerThread(delay, container)
    for delay, container in zip(delays, result_containers)
]
for thread in threads:
    add_script_run_ctx(thread, get_script_run_ctx())
    thread.start()

for thread in threads:
    thread.join()

st.button("Rerun")
```

<Cloud name="doc-multithreading-expose-context" height="700px" />


*/}
