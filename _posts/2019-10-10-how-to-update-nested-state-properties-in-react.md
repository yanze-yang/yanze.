---
layout: post
date: 2019-10-10
title:  "How to update nested state properties in React"
tags: 
- JavaScript
---

🧩Reference links:

- [How State Updates Are Merged in React](https://medium.com/@rykyou/how-state-updates-are-merged-in-react-e07fc669fec2)
- [How to Update Nested State Properties in React](https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react)

<!--more-->

## How to update nested state by using setState() 

```js
this.state = {
    name: 'Bob',
    isLoggedIn: true,
    address: {
        street: '44 One Tree Ridge Road',
        city: null
    }
```

Following the logic of shallow merging, you might try to update the value of “address.city” for the state object illustrated above with the method setState( ) like this…

```js
this.setState({
    address: {
        city: 'Auckland'
    }
})
```

However, this will change the state object’s structure to look something like:

```js
this.state = {
    name: 'Bob',
    isLoggedIn: true,
    address: {
        city: 'Auckland'
    }
}
```

We lost “address.street” within the state object because the nested object (value of the key “address”) got overwritten by a new object with a single key of “city”. The logic of shallow merging does not apply for nested objects.

How do we update the value for “address.city” without totally overwriting the nested object (and thus saving the “address.street” information)? In other words, is there a way to deep merge? There are multiple ways to tackle this but the spread operator provides us a feasible solution.

```js
this.setState({
    address: {
        ...this.state.address,
        city: 'Auckland'
    }
})
```

The code above is a redo of the setState( ) implementation. We pass in a new version of state holding the key of “address”. The value of this new object being passed into setState( ) includes a spread operator, which returns all of the keys and values from within the initial “this.state.address” object. 

1. Since this initial “this.state.address” object already had a key of “city”, supplying a new value for the key of “city” will overwrite the original value.
2. If a key of “city” hadn’t been in the original “this.state.address” object, it will have been added via this setState( ) method.

With this implementation of setState( ) the updated state object will look like (with the “address.street” information still intact):

```js
{
    name: 'Bob',
    isLoggedIn: true,
    address: {
        street: '44 One Tree Ridge Road',
        city: 'Auckland'
    }
}
```

To recap, React.Component’s setState( ) uses shallow merging to update state, ultimately saving us from listing out all of the keys and values from the initial state object. We can’t, however, apply the same logic of shallow merging on nested state objects. For these kinds of object structures, we can make use of the handy spread operator.

## How to update nested state by using React Hook's setState

在解决这个具体问题的时候，我参考了上面这篇文章，并且终于搞明白了setState的真谛。

```js
const [reservation, setReservation] = useState({
    roomId: '',
    customer: {
      email: null,
      first_name: null,
      last_name: null,
      telephone: null,
    },
});
```

在这里，我有一个已经拥有值的变量，guest。我的任务是将guest的值赋给reservation.customer。

```js
const guest = {
    email: 'john@gmail.com',
    first_name: 'John',
    last_name: 'Don',
    telephone: '020-8694-5463',
}
```

在之前，因为一直搞不懂Hook中的`setState()`的运作原理，当出现类似nested object赋值的问题的时候，我会绕开`useState()`，直接使用`=`赋值。属实铁憨憨。

```js
reservation.customer = guest;
```

然后在搞明白原理了以后，我开始了实验。

实验一号: 

```js
setReservation({
    reservation: {
    ...reservation.customer,
    email: guest.email,
    first_name: guest.first_name,
    last_name: guest.last_name,
    telephone: guest.telephone,
    },
});

```

当使用setReservation的时候，`()`指向的，就是reservation本身。这和`this.setState()`不同，`this.setState()`的括号指向state。错误在于，上面的代码实际上是在reservation中，又加了一个reservation属性，并且把guest的值传了进去。所以以上代码的结果是：

```js
console.log('The reservation is: ', reservation)
The reservation is: 
{
    reservation: {
        email: 'john@gmail.com',
        first_name: 'John',
        last_name: 'Don',
        telephone: '020-8694-5463',
    }
}

```

实验二号与三号

很明显。这次，我搞明白了，到底谁是reservation，并且知道了怎么用 Spread Operator 更新它。但是我没有用到`pre`。

```js
setReservation(pre => {
    return {
        ...reservation,
        customer: {
            ...reservation.customer,
            first_name: guest.first_name,
            last_name: guest.last_name,
            email: guest.email,
            telephone: guest.telephone,
        },
    };
});

```

最终，用到了`preState`。

```js
setReservation(preReservation => {
    return {
        ...preReservation,
        customer: {
            ...preReservation.customer,
            first_name: guest.first_name,
            last_name: guest.last_name,
            email: guest.email,
            telephone: guest.telephone,
        },
    };
});

```