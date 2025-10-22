# Javelit Docs

[![Netlify Status](https://api.netlify.com/api/v1/badges/1ddc1b5a-ec21-4b66-987d-feeb68854c28/deploy-status?branch=main)](https://app.netlify.com/sites/streamlit-docs/deploys)

We use Next.js and Netlify to build our [documentation site](https://docs.javelit.io/).

## Building

To build the docs, clone this repo, install the NPM dependencies, and start the development server.

### 1. Set up your base environment

Make sure you have [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and `make` installed.

#### Install `make` on MacOS

`make` is included with XCode Tools.

- In your terminal, run the following command:
  ```bash
  $ xcode-select --install
  ```

#### Install `make` on Windows

1. [Install Chocolately](https://chocolatey.org/install), a package manager for Windows.
2. In your terminal, run the following command:
   ```bash
   choco install make
   ```

### 2. Clone this repo:

```bash
git clone https://github.com/cyrilou242/javelit-docs.git
cd docs/
```

### 3. Install the NPM dependencies

```bash
make
```

### 4. Start the development server:

```bash
make up
```

The docs will be viewable at [http://localhost:3000](http://localhost:3000). Note that any time you modify the source files in the `content/` folder, you'll need to refresh your browser tab to view the changes. You **do not** need to restart the development server.

## File and folder structure

This repo follows a typical Next.js project structure. To contribute, you'll only edit Markdown files within the `content/` folder.

- `components/` Contains JS and MDX files.
- `content/` This is where all the Markdown files live. This is the only folder you'll edit.
- `lib/` Contains JS files.
- `pages/` You'll never have to edit this folder. It contains JSX files that handle the complex index page, mapping of URL slugs, and rendering of Markdown pages in `content/`.
- `public/` Contains all the images used in our docs.
- `python/` Contains Python code to generate the docstrings for the API Reference.
- `scripts/` Contains JS files.
- `styles/` Contains CSS files for styling and layout.

## Contributing

To add, edit, or delete content in our documentation, you have to modify Markdown (`.md`) files within folders and sub-folders in `content/` :

- `deploy/` Contains `.md` files that populate the Deploy section.
- `develop/`Contains `.md` files that populate the Develop section.
- `get-started/`Contains `.md` files that populate the Get Started section.
- `kb/` Contains `.md` files that populate the Knowledge Base.
- `cookie-settings.md` You'll never have to edit this file.
- `gdpr-banner.md` You'll never have to edit this file.
- `index.md` Contains text that populates the index page.
- `menu.md` This is a special file containing only front matter that defines the docs Menu. You will need to add an entry on this file for each new page you create within the docs' site.

The directory structure of `content/` does not matter as the files will be recursively read and will ignore the directories. However, we recommend following the directory structure to organize the files, mirroring the structure on the documentation website.

### Add a new page

Do you want to add a new page to the docs?

1. First, decide which section the page should live in (Deploy, Develop, Get Started or Knowledge Base).

2. Next, navigate to the relevant folder and subfolder within `content/` and create a `.md` file whose filename mirrors the title of the page. E.g. For a page titled "Create a component", navigate to `content/develop/concepts/custom-components/` and create a file named `create-component.md`.

### Structure of the `.md` file

Now that you've decided where the file should live and have named the file, it's time to add your content!

**File format**:

Every `.md` file has front matter at the very top that defines the page title which appears in the browser tab bar, and the URL slug which appears after the slash in `docs.javelit.io/` and `localhost:3000/`.

E.g. For a page titled "Create a component" that should exist at `docs.javelit.io/develop/concepts/custom-components/create`, the front matter at the top of `create-component.md` is:

```markdown
---
title: Create a Component
slug: /develop/concepts/custom-components/create
---
```

**Headings:**

Use standard Markdown for headings (#, ##, ###)

**Callouts:**

To add a callout (Note, Tip, Warning, Important), enter your Markdown text within the appropriate tags (MDX functions), making sure to add a blank line after the opening tag and another before the closing tag. E.g.

```markdown
<Note>

This is a **note** that links to our [website](https://docs.javelit.io/).

</Note>
```

**Embed code:**

Enclose code within \` \` to embed it inline. E.g.

```markdown
Create a header with `st.header`.
```

Embed code blocks like so:

````markdown
    ```java
    import io.javelit.core.Jt;

    public class TestApp {
        public static void main(String[] args) {
            Jt.code("some code").use();
        }
    }
    ```
````

We support syntax highlighting for Java, Python, Bash, TOML, SQL, and JSX.

**Link to other pages in docs:**

Use standard Markdown to link to other pages in the docs. E.g. Add an inline link to the "Create an app" page by including the slug defined in the front matter of the "Create an app" `.md` file:

```markdown
Learn how to [Create an app](/get-started/tutorials/create-an-app).
```

**Add images:**

Store images you want to display in `/public/images/`. There are two ways to display images.

1. To display a single image, use regular Markdown. Make sure to start the path of your images from `/images/` instead of `/public/images/`. E.g.:

   ```markdown
   ![Secrets manager screenshot](/images/databases/edit-secrets.png)
   ```

2. To display multiple images on the same line, add an `<Image />` tag containing the alt text and path to the image, for each image, and enclose all of them within `<Flex>` `</Flex>` tags. E.g. To display 3 images stored in `/public/images/databases/` :

   ```markdown
   <Flex>
   <Image alt="Bigquery screenshot 7" src="/images/databases/big-query-7.png" />
   <Image alt="Bigquery screenshot 8" src="/images/databases/big-query-8.png" />
   <Image alt="Bigquery screenshot 9" src="/images/databases/big-query-9.png" />
   </Flex>
   ```

**Discoverability:**

All it takes for a new page to be available at a URL is to create a Markdown file in the format described above, containing the title and slug in the front matter.

However, a user has to know the URL to visit the page. The page is therefore _reachable but not discoverable_. The next section describes how to add pages to the docs Menu so that users can find your page.

### Add pages to the Menu

How do you make the page you created appear in the Menu? Edit the special markdown file `content/menu.md`. All it has is front matter in YAML.

Suppose you have created an "Quickstart" page that is available at `docs.javelit.io/get-started/installation/quickstart`. You want to it to appear in the Menu within the "Get started" section, nested under the "Installation" page.

To do so, find the lines that define the `category`, `url` and `visible` properties for "Get Started" in `menu.md` and add three new lines below it, containing:

```YAML
- category: Get Started / Installation / Quickstart
  url: /get-started/installation/quickstart
  visible: true
```

> Important: You _always_ need to add the entry you created in `menu.md`, or otherwise the build will fail. It is important because we use the structure on this page to create the breadcrumbs for each page. If you don't want the page to show up on the menu, you _still_ need to add it, but you can set its `visible` property to `false`.

### Edit an existing page

To edit an existing page:

1. Locate the `.md` file for the page
2. Edit the Markdown and save the file

To preview your changes, refresh your browser tab and visit the edited page!

### Add a new docstring to the API Reference

Any time a new version of Javelit is released, the docstrings stored in `python/javelit.json` has to be updated by running `make docstrings`. This will update the json file with the documentation from the latest release on [maven.org](https://central.sonatype.com/artifact/io.javelit/javelit).

If you need to regenerate all function signatures, across all versions, delete `python/javelit.json` and run `make docstrings`. This will generate the `javelit.json` file with documentation for the last N releases. N is controlled by the `LOOKBACK` constant in the [python/build_java.py](python/build_java.py) script.

Suppose a new Javelit release includes a `Jt.myChart` method that you want to include in the "Chart elements" section of the API Reference:

1. Run `make docstrings`
2. Create Markdown file (`myChart.md`) in `content/develop/api/charts/`
3. Add the following to `myChart.md`:

   ```markdown
   ---
   title: st.my_chart
   slug: /develop/api-reference/charts/jt.myChart
   ---

   <Autofunction function="Jt.myChart" />
   ```

4. Add the following under the "Chart elements" heading in [content/develop/api-reference/_index.md](content/develop/api-reference/_index.md):
   1. A RefCard MDX function containing the URL slug defined in `myChart.md` . This is the card that will appear on the API Reference landing page.
   2. An Image MDX function containing alt text and the location of the image to be displayed on the card.
   3. A bold heading that will appear on the card (`#### Heading`). It appears below the card image.
   4. A brief description of the `Jt.myChart`. It appears below the card heading.
   5. A code block illustrating how to use `Jt.myChart`. It appears below the card description.
    ````markdown
        <RefCard href="/develop/api-reference/charts/jt.myChart">
        <Image pure alt="Tux, the Linux mascot" src="/img/data-table.png" />
    
        #### My charts
    
        Display a chart using the MyChart library.
    
        ```java
        Jt.myChart(my_data_frame)
        ```
    
        </RefCard>
    ````
5. Perform a similar addition in the `_index.md` file that corresponds to the component section. For instance, [content/develop/api-reference/charts/_index.md](content/develop/api-reference/charts/_index.md)

6. Add the following 2 new lines to `menu.md` so that `Jt.myChart` appears in the Menu:

   ```YAML
   - category: Develop / API Reference / Chart elements / Jt.myChart
     url: /develop/api-reference/charts/jt.myChart
   ```

7. Save your changes and refresh the browser tab. If all went well, you should see a new entry in the Menu, a new card in the API Reference, and a new page for `Jt.myChart`.

**NOTICE that in url and slug, `Jt` is in lower case `jt`. This is mandatory.**

### Add to the Knowledge Base

The Knowledge Base (KB) is divided into five sections:

1. **FAQ:** ... frequently asked questions
2. **Installing Dependencies:** System and Java dependency issues while using or deploying Javelit apps
3. **Deployment Issues:** Articles about deploying Javelit apps

If you know the answer to a Javelit user's pain point and want to add it to the KB:

1. Decide which of the above sections your article belongs to
2. Navigate to the relevant section's folder in `kb/` and
3. Create a `.md` file in the above specified format containing your article
   - Make sure the title in the front matter and the file header in Markdown are identical. E.g.

     ```markdown
     ---
     title: How do I fix the deployment issue on windows ?
     slug: /knowledge-base/deploy/fix-on-windows
     ---

     # How do I fix the deployment issue on windows ?
     ```

4. Add a line to the existing `_index.md` file in the same folder as your article. It should contain the title and URL slug specified in your article's front matter. This step ensures that users are able to discover your article in the index page of the relevant KB section. E.g.

   ```markdown
   - [How do I fix the deployment issue on windows ?](/knowledge-base/deploy/fix-on-windows)
   ```

#### Comment / hide in md files
The .md files in the [content](content) folder are actually mdx files. 
To comment, (ie not render a block) in a md file, use:
```markdown
{/*

will not appear
*/}
will appear
```
Make sure to put a blank line after the comment-opening string.

## Publishing

To publish your changes to the docs site:

1. Create a new branch containing your changes.
2. Create a Pull Request and mark cyrilou242 as reviewer.
3. Once the checks have completed, checkout the Preview build.
4. cyrilou242 will review your changes and merge your changes into the `main` branch.
5. Once merged, your changes will be live at [https://docs.javelit.io/](https://docs.javelit.io/).
