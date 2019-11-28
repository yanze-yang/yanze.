---
layout: post
date: 2019-11-10
title: "Multiple cases in a switch, like an OR (||)"
tags:
  - JavaScript
---

🧩Reference Link:

- [Test for multiple cases in a switch, like an OR](https://stackoverflow.com/questions/6513585/test-for-multiple-cases-in-a-switch-like-an-or/6514571)

That works

```js
async getPropertiesList(groupId) {
    console.log('groupId', groupId);
    switch (groupId) {
      case '1849212':
        const devgroup = this.devProperties.find(
          elem => elem.groupId === groupId,
        );
        return devgroup.properties;
      case '4751041':
      case '6830782':
      case '8936504':
        const prodgroup = this.prodProperties.find(
          elem => elem.groupId === groupId,
        );
        return prodgroup.properties;

      default:
        return `Group ID ${groupId} Not Found!`;
    }
  }
```

<!--more-->

That won't work

```js
async getPropertiesList(groupId) {
    console.log('groupId', groupId);
    switch (groupId) {
      case '1849212':
        const devgroup = this.devProperties.find(
          elem => elem.groupId === groupId,
        );
        return devgroup.properties;
      case '4751041' || '6830782' || '8936504':
        const prodgroup = this.prodProperties.find(
          elem => elem.groupId === groupId,
        );
        return prodgroup.properties;

      default:
        return `Group ID ${groupId} Not Found!`;
    }
  }
```
