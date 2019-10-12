---
layout: post
date: 2019-02-05
title:  "How to filter an array with another array"
mood: happy
tags: 
- JavaScript
---

🧩Reference link:

- [How to filter an array with another array](https://www.freecodecamp.org/forum/t/how-to-filter-an-array-with-another-array/139352)

<!--more-->

## Example 1

```js
var array1 = ["a", "b", "c", "d", "e"];
var array2 = ["b", "d", "f"];

array1 = array1.filter(function(item) {
  return !array2.includes(item);
});
console.log(array1); // [ 'a', 'c', 'e' ]
console.log(array2); // [ 'b', 'd', 'f' ]
```

## Example 2

```js
var array1 = ["a", "b", "c", "d", "e"];
var array2 = ["b", "d", "f"];

var tempArr = array2.filter(function(item) {
  return !array1.includes(item);
});
array1 = array1.filter(function(item) {
  return !array2.includes(item);
});
array2 = tempArr;

console.log(array1); // [ 'a', 'c', 'e' ]
console.log(array2); // [ 'f' ]
```

## Another solution for the 2nd example

```js
var array1 = ["a", "b", "c", "d", "e"];
var array2 = ["b", "d", "f"];

array2 = array2.filter(function(item) {
  return !array1.includes(item)
    ? true
    : array1.splice(array1.indexOf(item), 1) && false;
});

console.log(array1); // [ 'a', 'c', 'e' ]
console.log(array2); // [ 'f' ]
```