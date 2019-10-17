---
layout: post
date: 2019-07-01
title:  "How to call child component method from parent?"
tags: 
- JavaScript
- React
---

[Prevent using string references (react/no-string-refs)](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md)

Currently, two ways are supported by React to refer to components. The first way, providing a string identifier, is now considered legacy in the official documentation. The documentation now prefers a second method -- referring to components by setting a property on the this object in the reference callback.

<!--more-->

### Rule Details

The following patterns are considered warnings:

```js
var Hello = createReactClass({
  render: function() {
    return <div ref="hello">Hello, world.</div>;
  }
});

var Hello = createReactClass({
  componentDidMount: function() {
    var component = this.refs.hello;
    // ...do something with component
  },
  render: function() {
    return <div ref="hello">Hello, world.</div>;
  }
});
```

The following patterns are not considered warnings:

```js
var Hello = createReactClass({
  componentDidMount: function() {
    var component = this.hello;
    // ...do something with component
  },
  render() {
    return (
      <div
        ref={c => {
          this.hello = c;
        }}
      >
        Hello, world.
      </div>
    );
  }
});
```

---

## [How to call child component method from parent](https://github.com/kriasoft/react-starter-kit/issues/909)

### Example 1

```js
import s from "./Child.css";

class Child extends Component {
  getAlert() {
    alert("clicked");
  }
  render() {
    return <h1 ref="hello">Hello</h1>;
  }
}

export default withStyles(s)(Child);
```

## Example 2

```js
/* Parent.js */
class Parent extends Component {
 render() {
  onClick() {
    this.refs.child.getAlert() // undefined
  }
  return (
    <div>
      <Child ref="child" />
      <button onClick={this.onClick.bind(this)}>Click</button>
    </div>
  );
 }
}
```

```js
/* Child.js */
import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Child.css";

class Child extends React.Component {
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  method() {
    window.alert("do stuff");
  }
  render() {
    return <h1 className={s.root}>Hello World!</h1>;
  }
}

export default withStyles(s)(Child);
/* Parent.js */
import React from "react";
import Child from "./Child";

class Parent extends React.Component {
  onClick = () => {
    this.child.method(); // do stuff
  };
  render() {
    return (
      <div>
        <Child onRef={ref => (this.child = ref)} />
        <button onClick={this.onClick}>Child.method()</button>
      </div>
    );
  }
}
```

🧩 More Reference Links:

- [How do you trigger a function defined in the child component of a parent function in React?](https://www.quora.com/How-do-you-trigger-a-function-defined-in-the-child-component-of-a-parent-function-in-React)
- [React: Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)
