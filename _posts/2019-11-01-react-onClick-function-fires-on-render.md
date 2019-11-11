---
layout: post
date: 2019-11-01
title:  "React onClick function fires on render"
tags: 
- JavaScript
- React
---

🧩Reference Link:

- [React onClick function fires on render](https://stackoverflow.com/questions/33846682/react-onclick-function-fires-on-render)

I pass 2 values to a child component:

List of objects to display
delete function.
I use a .map() function to display my list of objects(like in the example given in react tutorial page), but the button in that component fires the onClick function, on render(it should not fire on render time). My code looks like this:

```js
module.exports = React.createClass({
    render: function(){
        var taskNodes = this.props.todoTasks.map(function(todo){
            return (
                <div>
                    {todo.task}
                    <button type="submit" onClick={this.props.removeTaskFunction(todo)}>Submit</button>
                </div>
            );
        }, this);
        return (
            <div className="todo-task-list">
                {taskNodes}
            </div>
        );
    }
});
```

My question is: Why does onClick function fire on render and how to make it not to.

<!--more-->

Because you are calling that function instead of passing the function to onClick, change that line to this:

```js
<button type="submit" onClick={() => { this.props.removeTaskFunction(todo) }}>Submit</button>
```
