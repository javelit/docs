---
title: Create an app
slug: /get-started/tutorials/create-an-app
---

# Create an app

If you've made it this far, chances are you've [installed Javelit](/get-started/installation) and run through the basics in [Basic concepts](/get-started/fundamentals/main-concepts) and [Advanced concepts](/get-started/fundamentals/advanced-concepts). If not, now is a good time to take a look.

The easiest way to learn how to use Javelit is to try things out yourself. As you read through this guide, test each method. As long as your app is running, every time you add a new element to your script and save, Javelit's UI will ask if you'd like to rerun the app and view the changes. This allows you to work in a fast interactive loop: you write some code, save it, review the output, write some more, and so on, until you're happy with the results. The goal is to use Javelit to create an interactive app for your data or model and along the way to use Javelit to review, debug, perfect, and share your code.

In this guide, you're going to use Javelit's core features to
create an interactive app; exploring a public Uber dataset for pickups and
drop-offs in New York City. When you're finished, you'll know how to fetch
and cache data, draw charts, plot information on a map, and use interactive
widgets, like a slider, to filter results.

<Tip>

If you'd like to skip ahead and see everything at once, the [complete script
is available below](#lets-put-it-all-together).

</Tip>

## Create your first app

Javelit is more than just a way to make data apps, it's also a community of creators that share their apps and ideas 
and help each other make their work better. Please come join us on the [community forum](https://github.com/javelit/javelit/discussions/). We love to hear your questions, 
ideas, and help you work through your bugs. Stop by today!

1. The first step is to create a new Java file. Let's call it
   `App.java`.

2. Open `App.java` in your favorite IDE or text editor, then add these
   lines:

   ```java
   ///usr/bin/env jbang "$0" "$@" ; exit $?

   //DEPS io.javelit:javelit:${JEAMLIT_VERSION}
   //DEPS tech.tablesaw:tablesaw-core:0.44.4

   import io.javelit.core.Jt;
   ```

3. Every good app has a title, so let's add one:

   ```java
   public class App {
       public static void main(String[] args) {
           Jt.title("Uber pickups in NYC").use();
       }
   }
   ```

4. Now it's time to run Javelit from the command line:

   ```bash
   javelit run App.java
   ```

   <Tip>

   Did you know you can also pass a URL to `javelit run`? This is great when combined with GitHub. For example:

   ```bash
   javelit run https://raw.githubusercontent.com/javelit/javelit/main/examples/getting_started/App.java
   ```

   </Tip>

5. As usual, the app should automatically open in a new tab in your
   browser.

## Fetch some data

Now that you have an app, the next thing you'll need to do is fetch the Uber
dataset for pickups and drop-offs in New York City.

1. Let's start by writing a function to load the data. Add a download method to your
   app:
   
   Imports: 
   ```java
   import java.io.BufferedReader;
   import java.io.IOException;
   import java.io.InputStream;
   import java.io.InputStreamReader;
   import java.net.URI;
   import java.time.LocalDateTime;
   import java.time.format.DateTimeFormatter;
   import java.util.Locale;
   import java.util.zip.GZIPInputStream;
   import tech.tablesaw.api.IntColumn;
   import tech.tablesaw.api.StringColumn;
   import tech.tablesaw.api.Table;
   import tech.tablesaw.selection.Selection;
   ```

   Method:
   ```java
   static Table loadData(int nrows) {
       final String DATE_COLUMN = "date/time";
       final String DATA_URL = "https://github.com/javelit/public_assets/raw/refs/heads/main/examples/uber-raw-data-sep14.csv.gz";
       try (InputStream in = URI.create(DATA_URL).toURL().openStream();
            GZIPInputStream gzipIn = new GZIPInputStream(in);
            InputStreamReader reader = new InputStreamReader(gzipIn);
            BufferedReader br = new BufferedReader(reader)) {
           // Read CSV
           Table df = Table.read().csv(br);
           // Convert column names to lowercase
           df.columns().forEach(c -> c.setName(c.name().toLowerCase(Locale.ROOT)));
           // Limit to nrows
           df = df.first(nrows);
           // Filter out points too far from Manhattan
           Selection closeToManhattan = df.doubleColumn("lon").isBetweenInclusive(-74.03, -73.85640176685645);
           df = df.where(closeToManhattan);

           // Parse date/time column and create hour column
           StringColumn dateStrCol = (StringColumn) df.column(DATE_COLUMN);
           DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy H:mm:ss");
           IntColumn hourColumn = IntColumn.create("hour");

           for (int i = 0; i < dateStrCol.size(); i++) {
               String dateStr = dateStrCol.getString(i);
               LocalDateTime dt = LocalDateTime.parse(dateStr.trim(), formatter);
               hourColumn.append(dt.getHour());
           }

           // Add hour column to table
           df.addColumns(hourColumn);

           return df;
       } catch (IOException e) {
           throw new RuntimeException("Failed to load dataset", e);
       }
   }
   ```

   You'll notice that `loadData` is a plain old function that downloads some
   data, puts it in a [Tablesaw](https://jtablesaw.github.io/tablesaw/) dataframe, and converts the date column from text
   to datetime. The function accepts a single parameter (`nrows`), which
   specifies the number of rows that you want to load into the dataframe.

2. Now let's test the method. In your `main` method, below the title, add these lines:

   ```java
   // Create a text element and let the reader know the data is loading.
   Jt.text("Loading data...").use();
   // Load 10,000 rows of data into the dataframe.
   Table data = loadData(10000);
   // Notify the reader that the data was successfully loaded.
   Jt.text("Loading data...done!").use();
   ```

   Save your file. The app will hot-reload. You'll see your
   changes automatically each time you save.

Ok, that's underwhelming...

It turns out that it takes a long time to download data and load 10,000 lines
into a dataframe. You don't want to reload the data each time the app is updated –
luckily Javelit allows you to cache the data.

## Effortless caching

1. Replace your data loading code with this cached version:

   ```java
   // Load data with caching
   Table data = (Table) Jt.cache().computeIfAbsent("data", k -> {
       Jt.text("Loading data...").use();
       Table df = loadData(10000);
       return df;
   });
   Jt.text("Loading data...done!").use();
   ```

2. Then save the script, and Javelit will automatically rerun your app. Since
   this is the first time you're running the script with `Jt.cache()`, you won't
   see anything change. Let's tweak your file a little bit more so that you can
   see the power of caching.

3. Replace the line `Jt.text("Loading data...done!").use();` with this:

   ```java
   Jt.text("Loading data...done! (using Jt.cache())").use();
   ```

4. Now save. See how the line you added appeared immediately? That's caching for you! 

### How does it work?

`Jt.cache()` returns a `Map`. The map is thread safe, 
it is shared between all sessions and it maintains its values across app reruns.  
Be cautious about mutating 
an element of the cache, as it will impact all users!   
Learn more about the cache in the [advanced concepts](/get-started/fundamentals/advanced-concepts#caching).

<Tip>

Whenever you have a long-running computation in your code, consider
refactoring it so you can use `Jt.cache()`, if possible. Please read [Caching](/develop/concepts/architecture/caching) for more details.

</Tip>

Now that you know how caching with Javelit works, let's get back to the Uber
pickup data.

## Inspect the raw data

It's always a good idea to take a look at the raw data you're working with
before you start working with it. Let's add a subheader and a printout of the
raw data to the app:

```java
Jt.markdown("## Raw data").use();
Jt.table(data.first(6)).use();
```

In the [Basic concepts](/get-started/fundamentals/main-concepts) guide you learned that
[`Jt.table`](/develop/api-reference/data/jt.table) can render a Tablesaw dataframe as table. 
In this case, you're passing in the first 6 rows of data to keep the table short.

[`Jt.table`](/develop/api-reference/data/jt.table) works with different data structures.
For a full list of options, see [API reference](/develop/api-reference).

## Draw a histogram

Now that you've had a chance to take a look at the dataset and observe what's
available, let's take things a step further and draw a histogram to see what
Uber's busiest hours are in New York City.

1. To start, let's add a subheader just below the raw data section:

   ```java
   Jt.markdown("## Number of pickups by hour").use();
   ```

2. Use Tablesaw to generate a histogram that breaks down pickup times by
   hour:

   ```java
   import org.icepear.echarts.Bar;
   import org.icepear.echarts.components.coord.cartesian.CategoryAxis;
   import org.icepear.echarts.components.tooltip.Tooltip;
   ...

   // Count pickups for each hour
   Table counts = data.intColumn("hour").countByCategory().sortOn("Category");
   ```

3. Now, let's use Javelit's
   [`Jt.echarts()`](/develop/api-reference/charts/jt.echarts) method to draw this
   histogram.

   ```java
   // Create bar chart using ECharts
   Bar barChart = new Bar()
           .setTooltip(new Tooltip().setTrigger("axis"))
           .addXAxis(new CategoryAxis().setData(counts.intColumn("Category").asObjectArray()))
           .addYAxis()
           .addSeries(counts.intColumn("Count").asObjectArray());
   // Plot the bar chart
   Jt.echarts(barChart).height(400).use();
   ```

4. Save your script. This histogram should show up in your app right away.
   After a quick review, it looks like the busiest time is 17:00 (5 P.M.).

To draw this diagram we used Javelit's `echarts()` method with Apache ECharts, a powerful
charting library. Javelit supports complex visualizations through ECharts.
{/* TODO CYRIL - add when there are more supported libariries
For a full list, see [supported charting libraries](/develop/api-reference/charts).
*/}

## Plot data on a map

Using a histogram with Uber's dataset helped us determine what the busiest
times are for pickups, but what if we wanted to figure out where pickups were
concentrated throughout the city. While you could use a bar chart to show this
data, it wouldn't be easy to interpret unless you were intimately familiar with
latitudinal and longitudinal coordinates in the city. To show pickup
concentration, let's use Javelit [`Jt.echarts()`](/develop/api-reference/charts/jt.echarts)
with a geographic visualization to overlay the data on a map of Manhattan.

1. Add a subheader for the section:

   ```java
   Jt.markdown("**Map of all pickups**").use();
   ```

2. Filter the data to show pickups at a specific hour (17:00):

   ```java
   int hourToFilter = 17;
   Table filteredData = data.where(data.intColumn("hour").isEqualTo(hourToFilter));
   ```

3. Prepare the data for the map visualization:

   ```java
   import java.util.List;
   import java.util.Map;
   import java.util.stream.IntStream;
   import org.icepear.echarts.Option;
   import org.icepear.echarts.charts.scatter.ScatterSeries;
   import org.icepear.echarts.components.series.ItemStyle;
   ...

   // Wrangle data for plotting
   List<Double> lons = filteredData.doubleColumn("lon").asList();
   List<Double> lats = filteredData.doubleColumn("lat").asList();
   List<Map<String, Double[]>> plotData = IntStream.range(0, lons.size())
            .mapToObj(i -> Map.of("value", new Double[]{lons.get(i), lats.get(i)}))
            .toList();
   ```

4. Create and display the map:

   ```java
   // Map chart config
   Option mapOption = new Option()
           .setGeo(Map.of("map", "manhattan",
                          "roam", true,
                          "zoom", 1.5,
                          "center", new Double[]{-73.98, 40.75},
                          "scaleLimit", Map.of("min", 1, "max", 10),
                          "tooltip", Map.of("show", true)))
           .setSeries(new ScatterSeries()
                              .setData(plotData.toArray())
                              .setCoordinateSystem("geo")
                              .setSymbolSize(5)
                              .setItemStyle(new ItemStyle().setColor("#b02a02").setOpacity(0.6)));
   // Plot the chart
   String mapBaseGeoJson = "https://raw.githubusercontent.com/javelit/public_assets/refs/heads/main/examples/manhattan.geo.json";
   Jt.echarts(mapOption).withMap("manhattan", URI.create(mapBaseGeoJson)).height(600).border(true).use();
   ```

5. Save your script. The map is fully interactive. Give it a try by panning or
   zooming in a bit. Hover on a neighborhood to see its name.

To draw this map we used the [`Jt.echarts()`](/develop/api-reference/charts/jt.echarts) function with ECharts geo coordinates.
This allows you to create rich, interactive geographic visualizations.

## Filter results with a slider

In the last section, when you drew the map, the time used to filter results was
hardcoded into the script, but what if we wanted to let a reader dynamically
filter the data in real time? Using Javelit's widgets you can. Let's add a
slider to the app with the `Jt.slider()` method.

1. Locate `hourToFilter` and replace it with this code snippet:

   ```java
   int hourToFilter = Jt.slider("Select an hour to show on the map").min(0).max(23).value(17).use().intValue();
   ```

2. Use the slider and watch the map update in real time.

## Use a button to toggle data

Sliders are just one way to dynamically change the composition of your app.
Let's use the [`Jt.checkbox`](/develop/api-reference/widgets/jt.checkbox) function to add a
checkbox to your app. We'll use this checkbox to show/hide the raw data
table at the top of your app.

1. Locate these lines:

   ```java
   Jt.markdown("## Raw data").use();
   Jt.table(data.first(6)).use();
   ```

2. Replace these lines with the following code:

   ```java
   if (Jt.checkbox("Show raw data").use()) {
       Jt.markdown("## Raw data").use();
       Jt.table(data.first(6)).use();
   }
   ```

We're sure you've got your own ideas. When you're done with this tutorial, check out all the widgets that Javelit exposes in our [API Reference](/develop/api-reference).

## Let's put it all together

That's it, you've made it to the end. Here's the complete script for our interactive app.

<Tip>

If you've skipped ahead, after you've created your script, the command to run
Javelit is `javelit run App.java`.

</Tip>

```java
///usr/bin/env jbang "$0" "$@" ; exit $?

//DEPS io.javelit:javelit:${JEAMLIT_VERSION}
//DEPS tech.tablesaw:tablesaw-core:0.44.4

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.IntStream;
import java.util.zip.GZIPInputStream;

import io.javelit.core.Jt;
import org.icepear.echarts.Bar;
import org.icepear.echarts.Option;
import org.icepear.echarts.charts.scatter.ScatterSeries;
import org.icepear.echarts.components.coord.cartesian.CategoryAxis;
import org.icepear.echarts.components.series.ItemStyle;
import org.icepear.echarts.components.tooltip.Tooltip;
import tech.tablesaw.api.IntColumn;
import tech.tablesaw.api.StringColumn;
import tech.tablesaw.api.Table;
import tech.tablesaw.selection.Selection;


public class App {

    public static void main(String[] args) {
        // Load data with caching
        Table data = (Table) Jt.cache().computeIfAbsent("data", k -> {
            Jt.text("Loading data...").use();
            Table df = loadData(10000);
            return df;
        });
        Jt.text("Loading data...done! (using Jt.cache())").use();

        // Title
        Jt.title("Uber pickups in NYC").use();

        // Checkbox to show raw data
        if (Jt.checkbox("Show raw data").use()) {
            Jt.markdown("## Raw data").use();
            Jt.table(data.first(6)).use();
        }

        // Create histogram data for pickups by hour
        Jt.markdown("## Number of pickups by hour").use();


        // Count pickups for each hour - counts is a dataframe with columns Category and Count
        Table counts = data.intColumn("hour").countByCategory().sortOn("Category");

        // Create bar chart using java ECharts - see https://echarts.icepear.org/#/chart-apis/bar
        Bar barChart = new Bar()
                .setTooltip(new Tooltip().setTrigger("axis"))
                .addXAxis(new CategoryAxis().setData(counts.intColumn("Category").asObjectArray()))
                .addYAxis()
                .addSeries(counts.intColumn("Count").asObjectArray());
        // plot the bar chart
        Jt.echarts(barChart).height(400).use();

        // Slider for hour selection
        int hourToFilter = Jt.slider("Select an hour to show on the map").min(0).max(23).value(17).use().intValue();

        // Filter data based on selected hour
        Table filteredData = data.where(data.intColumn("hour").isEqualTo(hourToFilter));

        // Display filtered data on map
        Jt.markdown("**Map of pickups at %d:00**".formatted(hourToFilter)).use();

        // Create map visualization
        // wrangle data for plotting --> list of points, with each point a {"value": [lon, lat]} - see https://echarts.apache.org/examples/en/editor.html?c=geo-graph
        List<Double> lons = filteredData.doubleColumn("lon").asList();
        List<Double> lats = filteredData.doubleColumn("lat").asList();
        List<Map<String, Double[]>> plotData = IntStream.range(0, lons.size())
                         .mapToObj(i -> Map.of("value", new Double[]{lons.get(i), lats.get(i)}))
                         .toList();
        // map chart config
        Option mapOption = new Option()
                .setGeo(Map.of("map", "manhattan",
                               "roam", true,
                               "zoom", 1.5,
                               "center", new Double[]{-73.98, 40.75},
                               "scaleLimit", Map.of("min", 1, "max", 10),
                               "tooltip", Map.of("show", true)))
                .setSeries(new ScatterSeries()
                                   .setData(plotData.toArray())
                                   .setCoordinateSystem("geo")
                                   .setSymbolSize(5)
                                   .setItemStyle(new ItemStyle().setColor("#b02a02").setOpacity(0.6)));
        // plot the chart
        String mapBaseGeoJson = "https://raw.githubusercontent.com/javelit/public_assets/refs/heads/main/examples/manhattan.geo.json";
        Jt.echarts(mapOption).withMap("manhattan", URI.create(mapBaseGeoJson)).height(600).border(true).use();
    }

    static Table loadData(int nrows) {
        final String DATE_COLUMN = "date/time";
        final String DATA_URL = "https://github.com/javelit/public_assets/raw/refs/heads/main/examples/uber-raw-data-sep14.csv.gz";
        try (InputStream in = URI.create(DATA_URL).toURL().openStream();
             GZIPInputStream gzipIn = new GZIPInputStream(in);
             InputStreamReader reader = new InputStreamReader(gzipIn);
             BufferedReader br = new BufferedReader(reader)) {
            // Read CSV
            Table df = Table.read().csv(br);
            // Convert column names to lowercase
            df.columns().forEach(c -> c.setName(c.name().toLowerCase(Locale.ROOT)));
            // Limit to nrows before filtering a few other rows - nrows is an approximate, it's ok for this example
            df = df.first(nrows);
            // Filter out the few points that are too far away from Manhattan
            Selection closeToManhattan = df.doubleColumn("lon").isBetweenInclusive(-74.03, -73.85640176685645);
            df = df.where(closeToManhattan);

            // Parse date/time column and create hour column
            StringColumn dateStrCol = (StringColumn) df.column(DATE_COLUMN);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy H:mm:ss");
            IntColumn hourColumn = IntColumn.create("hour");

            for (int i = 0; i < dateStrCol.size(); i++) {
                String dateStr = dateStrCol.getString(i);
                LocalDateTime dt = LocalDateTime.parse(dateStr.trim(), formatter);
                hourColumn.append(dt.getHour());
            }

            // Add hour column to table
            df.addColumns(hourColumn);

            return df;
        } catch (IOException e) {
            throw new RuntimeException("Failed to load dataset", e);
        }
    }
}
```

## Share your app

After you've built a Javelit app, it's time to share it! To show it off to the world you can share your Java file directly.

It works in simple steps:

1. Put your app in a public GitHub repo 
2. Open the <a href="https://railway.com/new/template/javelit-app?referralCode=NFgD4z" target="_blank">Railway one-click deploy Javelit template</a> and sign-in if prompted. 
3. Paste your GitHub project URL 
4. Click Deploy.

That's it! 🚠 You now have a shareable app.

_If you want to share the app with a user who will run it locally, they can simply run: `javelit run <Github URL>`._ 

## Get help

That's it for getting started, now you can go and build your own apps! If you
run into difficulties here are a few things you can do.

- Check out our [community forum](https://github.com/javelit/javelit/discussions/) and post a question
- Quick help from command line with `javelit --help` and `javelit run --help`
- Go through our [Knowledge Base](/knowledge-base) for tips, step-by-step tutorials, and articles that answer your questions about creating and deploying Javelit apps.
- Read more documentation! Check out:
  - [Concepts](/develop/concepts) for things like caching, {/* TODO CYRIL THEMING NOT IMPLEM theming, */}and adding statefulness to apps.
  - [API reference](/develop/api-reference/) for examples of every Javelit command.
