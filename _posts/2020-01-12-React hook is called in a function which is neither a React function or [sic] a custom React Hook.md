---
layout: post
date: 2020-01-12
title: "React hook is called in a function which is neither a React function or [sic] a custom React Hook"
tags:
  - React
---

🧩Reference Link:

- [JS Bites: React hook is called in a function which is neither a React function or [sic] a custom React Hook](https://dev.to/ranewallin/js-bites-react-hook-is-called-in-a-function-which-is-neither-a-react-function-or-sic-a-custom-react-hook-1g2c)

Here's the gotcha, when you are using React Hooks, your functional component's name MUST start with a capital letter. In this case, the function name is landingPage. If you change it to LandingPage it will work as expected.
