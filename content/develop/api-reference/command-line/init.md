---
title: jeamlit init
slug: /develop/api-reference/cli/init
draft: true
---

## `$ jeamlit init`

This command creates the files for a new Jeamlit app.

### Syntax

```
jeamlit init <directory>
```

### Arguments

`<directory>` (Optional): The directory location of the new project. If no directory is provided, the current working directory will be used.

### Examples

#### Example 1: Create project files the current working directory

1. In your current working directory (CWD), execute the following:

   ```bash
   jeamlit init
   ```

   Jeamlit creates the following files:

   ```
   CWD/
   ├── requirements.txt
   └── jeamlit_app.py
   ```

2. In your terminal, Jeamlit prompts, `❓ Run the app now? [Y/n]`. Enter `Y` for yes.

   This is equivalent to executing `jeamlit run jeamlit_app.py` from your current working directory.

3. Begin editing your `jeamlit_app.py` file and save your changes.

#### Example 2: Create project files in another directory

1. In your current working directory (CWD), execute the following:

   ```bash
   jeamlit init project
   ```

   Jeamlit creates the following files:

   ```
   CWD/
   └── project/
       ├── requirements.txt
       └── jeamlit_app.py
   ```

2. In your terminal, Jeamlit prompts, `❓ Run the app now? [Y/n]`. Enter `Y` for yes.

   This is equivalent to executing `jeamlit run project/jeamlit_app.py` from your current working directory.

3. Begin editing your `jeamlit_app.py` file and save your changes.
