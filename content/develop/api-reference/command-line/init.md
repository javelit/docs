---
title: javelit init
slug: /develop/api-reference/cli/init
draft: true
ignore: true
---

## `$ javelit init`

This command creates the files for a new Javelit app.

### Syntax

```
javelit init <directory>
```

### Arguments

`<directory>` (Optional): The directory location of the new project. If no directory is provided, the current working directory will be used.

### Examples

#### Example 1: Create project files the current working directory

1. In your current working directory (CWD), execute the following:

   ```bash
   javelit init
   ```

   Javelit creates the following files:

   ```
   CWD/
   ├── requirements.txt
   └── javelit_app.py
   ```

2. In your terminal, Javelit prompts, `❓ Run the app now? [Y/n]`. Enter `Y` for yes.

   This is equivalent to executing `javelit run javelit_app.py` from your current working directory.

3. Begin editing your `javelit_app.py` file and save your changes.

#### Example 2: Create project files in another directory

1. In your current working directory (CWD), execute the following:

   ```bash
   javelit init project
   ```

   Javelit creates the following files:

   ```
   CWD/
   └── project/
       ├── requirements.txt
       └── javelit_app.py
   ```

2. In your terminal, Javelit prompts, `❓ Run the app now? [Y/n]`. Enter `Y` for yes.

   This is equivalent to executing `javelit run project/javelit_app.py` from your current working directory.

3. Begin editing your `javelit_app.py` file and save your changes.
