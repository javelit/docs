---
title: Basic concepts of Jeamlit
slug: /get-started/fundamentals/main-concepts
---

# Basic concepts of Jeamlit

Working with Jeamlit is simple. First you sprinkle a few Jeamlit commands
into a normal Java class main method, then you run it with `jeamlit run`:

```bash
jeamlit run YourApp.java
```

As soon as you run the script as shown above, a local Jeamlit server will
spin up and your app will open in a new tab in your default web browser. This is called the [Standalone](/get-started/installation/standalone) mode. The app
is your canvas, where you'll draw charts, text, widgets, tables, and more.

What gets drawn in the app is up to you. For example
[`Jt.text`](/develop/api-reference/text/jt.text) writes raw text to your app, and
[`Jt.echarts`](/develop/api-reference/charts/jt.echarts) draws an (Apache echarts) chart. Refer to our [API documentation](/develop/api-reference) to see all commands that
are available to you.

{/* TODO CYRIL - argument passing is not implemented yet

<Note>

When passing your script some custom arguments, they must be passed after two dashes. Otherwise the
arguments get interpreted as arguments to Jeamlit itself.

</Note>
*/}

<Tip>

You can also pass a URL to `jeamlit run`! This is great when combined with
GitHub Gists. For example:

```bash
jeamlit run https://raw.githubusercontent.com/jeamlit/jeamlit/main/examples/getting_started/App.java
```

</Tip>



Another way of running Jeamlit is to run it [embedded](/get-started/installation/embedded-vanilla) in your existing Java project:

```java
import io.jeamlit.core.Server;

void runJeamlitServer() {
    final var server = Server.builder(YourApp.class, 8080).build();
    server.start();
}
```

## Development flow

In **Standalone** mode, every time you want to update your app, save the source 
file. When you do that, Jeamlit detects there is a change and will automatically 
update and run your app.   
In **Embedded** mode, use your IDE hot-reload feature to update the app, 
then refresh the page. No restart is required. Learn more about IDE hot-reload [here](/get-started/installation/embedded-vanilla#intellij-idea-setup).

This allows you to work in a fast interactive loop: you type some code, save
it, try it out live, then type some more code, save it, try it out, and so on
until you're happy with the results. This tight loop between coding and viewing
results live is one of the ways Jeamlit makes your life easier.

<Tip>

While developing a Jeamlit app, it's recommended to lay out your editor and
browser windows side by side, so the code and the app can be seen at the same
time. Give it a try!

</Tip>

## Data flow

Jeamlit's architecture allows you to write apps the same way you write plain
Java methods. To unlock this, Jeamlit apps have a unique data flow: any
time something must be updated on the screen, Jeamlit reruns your entire
Java main method from top to bottom.

This can happen in two situations:

- Whenever you modify your app's source code.

- Whenever a user interacts with widgets in the app. For example, when dragging
  a slider, entering text in an input box, or clicking a button.

Whenever a callback is passed to a widget via the `onChange` (or `onClick`) parameter, 
the callback will always run before the rest of your script. 
{/* TODO CYRIL document callbacks somewhere
For details on the Callbacks API, please refer to our [Session State API Reference Guide](/develop/api-reference/caching-and-state/st.session_state#use-callbacks-to-update-session-state).
*/}

And to make all of this fast and seamless, Jeamlit does some heavy lifting
for you behind the scenes. A big player in this story is the `Jt.cache`, which allows 
developers to skip certain costly computations when their apps rerun. We'll cover 
caching later in this page.

## Display and style data

There are a few ways to display data (text, tables, arrays, data frames) in Jeamlit
apps.

### Display text 

You can write all sorts of text with simple methods:

```java
import io.jeamlit.core.Jt;

public class ExampleApp {

    public static void main(String[] args) {
        Jt.title("My Jeamlit Example App").use();
        Jt.markdown("""
                    ## Welcome to Jeamlit!
                    This is a **markdown** example with:
                    - *Italic text*
                    - **Bold text**
                    - [A link](https://docs.jeamlit.io)
                    """).use();
        
        Jt.text("This is plain text displayed using Jt.text()").use();
        Jt.code("""
                print("hello world");
                """)
                .language("python").use();
    }
}
```

<Tip>

Most `Jt` methods return a builder with chainable optional parameters.   
For instance, you can see in the example above we chained `.language(...)` after `Jt.code(...)`.  
**Do not forget to call `.use()` after passing all required parameters!** This is a common mistake.  
You'll learn more advanced usage of `.use()` below.
</Tip>

### Display a table

Jeamlit can display tables from multiple data structures:

1. **List of objects** - Each object becomes a row:
    ```java
    record Person(String name, int age, String city) {}
    
    List<Person> people = List.of(
        new Person("Alice", 30, "NYC"),
        new Person("Bob", 25, "LA")
    );
    
    Jt.table(people).use();
    ```

2. **Map of column names to columns** - Each map entry is a column:

    ```java
    Map<String, List<?>> data = Map.of(
        "Product", List.of("Apple", "Banana", "Orange"),
        "Price", List.of(1.2, 0.5, 0.8),
        "Stock", List.of(100, 150, 75)
    );
    
    Jt.table(data).use();
    ```

3. **Dataframe** - A Tablesaw `Table`:
    ```java
    import tech.tablesaw.api.Table;
   
    ...   
   
    Table data = Table.read().csv("my_data.csv");
    Jt.table(data).use();
    ```

### Draw charts

{/* 
Jeamlit supports several popular data charting libraries like [Matplotlib,
Altair, deck.gl, and more](/develop/api-reference#chart-elements).
*/}
Jeamlit supports [Apache ECharts](https://echarts.apache.org/en/index.html) to draw almost any kind of charts.
[Java ECharts](https://echarts.icepear.org/#/overview) is included in Jeamlit to provide an easy-to-use Java-native way to build charts.

#### Draw a line chart

Create a simple line chart to visualize data trends:

```java
import io.jeamlit.core.Jt;
import org.icepear.echarts.Line;

Line line = new Line()
        .addXAxis(new String[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" })
        .addYAxis()
        .addSeries(new Number[] { 150, 230, 224, 218, 135, 147, 260 });

Jt.echarts(line).use();
```

#### Draw a gauge

Display a gauge chart for showing progress or metrics:

```java
import io.jeamlit.core.Jt;
import org.icepear.echarts.Gauge;
import org.icepear.echarts.charts.gauge.GaugeDataItem;
import org.icepear.echarts.charts.gauge.GaugeProgress;
import org.icepear.echarts.charts.gauge.GaugeSeries;

Gauge gauge = new Gauge()
        .setTooltip("item")
        .addSeries(new GaugeSeries()
                           .setName("Pressure")
                           .setProgress(new GaugeProgress().setShow(true))
                           .setData(new GaugeDataItem[]{new GaugeDataItem().setValue(50).setName("SCORE")}));

Jt.echarts(gauge).use();
```

{/* TODO ADD MAPS */}

## Widgets

When you've got the data or model into the state that you want to explore, you
can add in widgets like [`Jt.slider()`](/develop/api-reference/widgets/jt.slider),
[`Jt.button()`](/develop/api-reference/widgets/jt.button) or
[`Jt.selectbox()`](/develop/api-reference/widgets/jt.selectbox). It's really straightforward
— treat widgets as variables:

```python
import io.jeamlit.core.Jt;

var x = Jt.slider('x').use();  // 👈 this is a widget
Jt.text(x + " squared is " + x * x).use();
```

On first run, the app above should output the text "0 squared is 0". Then
every time a user interacts with a widget, Jeamlit simply reruns your script
from top to bottom, assigning the current state of the widget to your variable
in the process.

For example, if the user moves the slider to position `10`, Jeamlit will
rerun the code above and set `x` to `10` accordingly. So now you should see the
text "10 squared is 100".

Widgets can also be accessed by key, if you choose to specify a string to use as the unique key for the widget:

```python
import io.jeamlit.core.Jt;

Jt.textInput("Your name").key("name").use();

# You can access the value at any point with: 
Jt.componentsState().get("name");
```

Every widget value is added to the Components State. For more information about Session State and Components State, see [Session State Concept Guide](/develop/concepts/architecture/session-state).

### Use checkboxes to show/hide data

One use case for checkboxes is to hide or show a specific chart or section in
an app. [`Jt.checkbox()`](/develop/api-reference/widgets/jt.checkbox) takes a single argument,
which is the widget label. In this sample, the checkbox is used to toggle a
conditional statement.

```python
import io.jeamlit.core.Jt;
import org.icepear.echarts.Line;

if (Jt.checkbox("Show the chart").use()) {
    Line line2 = new Line()
        .addXAxis(new String[]{"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"})
        .addYAxis()
        .addSeries(new Number[]{150, 230, 224, 218, 135, 147, 260});
    Jt.echarts(line2).use();
}
```

### Use a selectbox for options

Use [`Jt.selectbox`](/develop/api-reference/widgets/jt.selectbox) to choose from a List. 


```python
import io.jeamlit.core.Jt;
import java.util.List;

String option = Jt.selectbox(
    "Which fruit do you like best?",
    List.of("Apple", "Banana", "Kiwi")).use();

Jt.text("You selected: " + option).use();
```

<Note>
You can pass list of objects that are not `String`! 
Jeamlit will stringify the objects when displaying them in the app. You can pass a custom stringify method 
by chaining `.formatFunction(<your stringify Function>)` after `selectbox(...)`.
</Note>
 

## Layout

Jeamlit makes it easy to organize your widgets in a left panel sidebar with
[`Jt.SIDEBAR`](/develop/api-reference/layout/jt.sidebar). Each element that's passed to
[`Jt.SIDEBAR`](/develop/api-reference/layout/jt.sidebar) is pinned to the left, allowing
users to focus on the content in your app while still having access to UI
controls.

For example, if you want to add a selectbox and a slider to a sidebar,
use `Jt.slider(...).use(Jt.SIDEBAR)` and `Jt.selectbox(...).use(Jt.SIDEBAR)` instead of `.use()`:

```java
import io.jeamlit.core.Jt;
import java.util.List;

...

// Add a selectbox to the sidebar:
String selection = Jt
        .selectbox("How would you like to be contacted?", List.of("Email", "Home phone", "Mobile phone"))
        .use(Jt.SIDEBAR);

// Add a slider to the sidebar:
double value = Jt.slider("Select a value").min(0.0).max(100.0).value(50).use(Jt.SIDEBAR);
```

Beyond the sidebar, Jeamlit offers several other ways to control the layout
of your app. [`Jt.columns`](/develop/api-reference/layout/jt.columns) lets you place widgets side-by-side, and
[`Jt.expander`](/develop/api-reference/layout/jt.expander) lets you conserve space by hiding away large content.

```java
import io.jeamlit.core.Jt;
import java.util.List;

var columns = Jt.columns(2).use();

// You can use a column by passing it to .use():
Jt.button("Press me!").use(columns.col(0));

// Place multiple elements in a column:
String chosen = Jt.radio(
    "Sorting hat",
    List.of("Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin")
).use(columns.col(1));

Jt.text("You are in " + chosen + " house!").use(columns.col(1));
```


{/* TODO CYRIL progress not implemented 

### Show progress

When adding long running computations to an app, you can use
[`st.progress()`](/develop/api-reference/status/st.progress) to display status in real time.

First, let's import time. We're going to use the `time.sleep()` method to
simulate a long running computation:

```python
import time
```

Now, let's create a progress bar:

```python
import streamlit as st
import time

'Starting a long computation...'

# Add a placeholder
latest_iteration = st.empty()
bar = st.progress(0)

for i in range(100):
  # Update the progress bar with each iteration.
  latest_iteration.text(f'Iteration {i+1}')
  bar.progress(i + 1)
  time.sleep(0.1)

'...and now we\'re done!'
```

*/}
