---
layout: post
date: 2019-03-15
title:  "React setState() with prevState and Object Spread Operator"
tags: 
- JavaScript
- React
---

🧩Reference Links:

- [React setState() with prevState and Object Spread Operator](https://www.rockyourcode.com/react-set-state-with-prev-state-and-object-spread-operator)
- [Using a function in setState instead of an object](https://medium.com/@wisecobbler/using-a-function-in-setstate-instead-of-an-object-1f5cfd6e55d1)

There are some gotchas with React's setState(). For example, state updates may be asynchronous: React sometimes batches multiple setState() calls for performance reasons.

<!--more-->

Make sure to set state correctly and to use the latest state. Here are some examples from the official documentation:

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
});
```

Instead you should use a function which takes the previous state as a first argument.

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Let's say you have an object in your state and want to use the object spread syntax:

```js
// This is the state of your React component
this.state = {
  person: {
    firstName: "",
    secondName: ""
  }
};
```

Now you want to change the state:

```js
this.setState(prevState => ({
  person: {
    ...prevState.person,
    firstName: "Tom",
    secondName: "Jerry"
  }
}));
```

This also works:

```js
this.setState(() => ({
  person: {
    ...this.state.person,
    firstName: "Tom",
    secondName: "Jerry"
  }
}));
```

Using functions is now the recommended way to set state in React.
