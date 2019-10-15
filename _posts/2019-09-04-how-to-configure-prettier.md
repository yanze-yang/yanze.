---
layout: post
date: 2019-09-04
title:  "How to Configure Prettier"
tags: 
- Prettier
---

🧩Reference Links:

- [Prettier Docs - Configuration File](https://prettier.io/docs/en/configuration.html)
- [VSCode + TypeScript + Prettier = Happy Developer](https://www.fiznool.com/blog/2018/12/07/vscode---typescript---prettier--happy-developer/)

## Configuration File

Prettier uses cosmiconfig for configuration file support. This means you can configure prettier via (in order of precedence):

- A `"prettier"` key in your package.json file.
- A `.prettierrc` file, written in JSON or YAML, with optional extensions: `.json/.yaml/.yml` (without extension takes precedence).
- A `.prettierrc.js` or `prettier.config.js` file that exports an object.
- A `.prettierrc.toml` file, written in TOML (the `.toml` extension is required).
The configuration file will be resolved starting from the location of the file being formatted, and searching up the file tree until a config file is (or isn't) found.

## Basic Configuration

JSON:
```json
{
  "trailingComma": "es5",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

<!--more-->

JS:
```js
// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true
};
```

YAML:
```yaml
# .prettierrc or .prettierrc.yaml
trailingComma: "es5"
tabWidth: 4
semi: false
singleQuote: true
```

TOML:
```toml
# .prettierrc.toml
trailingComma = "es5"
tabWidth = 4
semi = false
singleQuote = true
```