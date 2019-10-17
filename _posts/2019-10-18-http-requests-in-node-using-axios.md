---
layout: post
date: 2019-10-18
title:  "asycn/await & Promises: HTTP requests in Node using Axios"
tags: 
- JavaScript
- Axios
---

🧩Reference Link:

- [HTTP requests in Node using Axios](https://flaviocopes.com/node-axios/)

## GET requests
One convenient way to use Axios is to use the modern (ES2017) async/await syntax.

This Node.js example queries the [Dog API](https://dog.ceo/) to retrieve a list of all the dogs breeds, using axios.get(), and it counts them:

```js
const axios = require('axios')

const getBreeds = async () => {
  try {
    return await axios.get('https://dog.ceo/api/breeds/list/all')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = await getBreeds()

  if (breeds.data.message) {
    console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
  }
}

countBreeds()
```

<!--more-->

If you don’t want to use async/await you can use the Promises syntax:

```js
const axios = require('axios')

const getBreeds = () => {
  try {
    return axios.get('https://dog.ceo/api/breeds/list/all')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = getBreeds()
    .then(response => {
      if (response.data.message) {
        console.log(
          `Got ${Object.entries(response.data.message).length} breeds`
        )
      }
    })
    .catch(error => {
      console.log(error)
    })
}

countBreeds()
```