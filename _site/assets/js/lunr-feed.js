var hostname = "http://localhost:4000";
var index = lunr(function () {
    this.field('title')
    this.field('content', {boost: 10})
    this.field('category')
    this.field('tags')
    this.ref('id')
});



    index.add({
      title: "How to update nested state properties in React",
      category: null,
      content: "🧩Reference links:\n\n\n  How State Updates Are Merged in React\n  How to Update Nested State Properties in React\n\n\n\n\nHow to update nested state by using setState()\n\nthis.state = {\n    name: 'Bob',\n    isLoggedIn: true,\n    address: {\n        street: '44 One Tree Ridge Road',\n        city: null\n    }\n\n\nFollowing the logic of shallow merging, you might try to update the value of “address.city” for the state object illustrated above with the method setState( ) like this…\n\nthis.setState({\n    address: {\n        city: 'Auckland'\n    }\n})\n\n\nHowever, this will change the state object’s structure to look something like:\n\nthis.state = {\n    name: 'Bob',\n    isLoggedIn: true,\n    address: {\n        city: 'Auckland'\n    }\n}\n\n\nWe lost “address.street” within the state object because the nested object (value of the key “address”) got overwritten by a new object with a single key of “city”. The logic of shallow merging does not apply for nested objects.\n\nHow do we update the value for “address.city” without totally overwriting the nested object (and thus saving the “address.street” information)? In other words, is there a way to deep merge? There are multiple ways to tackle this but the spread operator provides us a feasible solution.\n\nthis.setState({\n    address: {\n        ...this.state.address,\n        city: 'Auckland'\n    }\n})\n\n\nThe code above is a redo of the setState( ) implementation. We pass in a new version of state holding the key of “address”. The value of this new object being passed into setState( ) includes a spread operator, which returns all of the keys and values from within the initial “this.state.address” object.\n\n\n  Since this initial “this.state.address” object already had a key of “city”, supplying a new value for the key of “city” will overwrite the original value.\n  If a key of “city” hadn’t been in the original “this.state.address” object, it will have been added via this setState( ) method.\n\n\nWith this implementation of setState( ) the updated state object will look like (with the “address.street” information still intact):\n\n{\n    name: 'Bob',\n    isLoggedIn: true,\n    address: {\n        street: '44 One Tree Ridge Road',\n        city: 'Auckland'\n    }\n}\n\n\nTo recap, React.Component’s setState( ) uses shallow merging to update state, ultimately saving us from listing out all of the keys and values from the initial state object. We can’t, however, apply the same logic of shallow merging on nested state objects. For these kinds of object structures, we can make use of the handy spread operator.\n\nHow to update nested state by using React Hook’s setState\n\n在解决这个具体问题的时候，我参考了上面这篇文章，并且终于搞明白了setState的真谛。\n\nconst [reservation, setReservation] = useState({\n    roomId: '',\n    customer: {\n      email: null,\n      first_name: null,\n      last_name: null,\n      telephone: null,\n    },\n});\n\n\n在这里，我有一个已经拥有值的变量，guest。我的任务是将guest的值赋给reservation.customer。\n\nconst guest = {\n    email: 'john@gmail.com',\n    first_name: 'John',\n    last_name: 'Don',\n    telephone: '020-8694-5463',\n}\n\n\n在之前，因为一直搞不懂Hook中的setState()的运作原理，当出现类似nested object赋值的问题的时候，我会绕开useState()，直接使用=赋值。属实铁憨憨。\n\nreservation.customer = guest;\n\n\n然后在搞明白原理了以后，我开始了实验。\n\n实验一号:\n\nsetReservation({\n    reservation: {\n    ...reservation.customer,\n    email: guest.email,\n    first_name: guest.first_name,\n    last_name: guest.last_name,\n    telephone: guest.telephone,\n    },\n});\n\n\n\n当使用setReservation的时候，()指向的，就是reservation本身。这和this.setState()不同，this.setState()的括号指向state。错误在于，上面的代码实际上是在reservation中，又加了一个reservation属性，并且把guest的值传了进去。所以以上代码的结果是：\n\nconsole.log('The reservation is: ', reservation)\nThe reservation is: \n{\n    reservation: {\n        email: 'john@gmail.com',\n        first_name: 'John',\n        last_name: 'Don',\n        telephone: '020-8694-5463',\n    }\n}\n\n\n\n实验二号与三号\n\n很明显。这次，我搞明白了，到底谁是reservation，并且知道了怎么用 Spread Operator 更新它。但是我没有用到pre。\n\nsetReservation(pre =&gt; {\n    return {\n        ...reservation,\n        customer: {\n            ...reservation.customer,\n            first_name: guest.first_name,\n            last_name: guest.last_name,\n            email: guest.email,\n            telephone: guest.telephone,\n        },\n    };\n});\n\n\n\n最终，用到了preState。\n\nsetReservation(preReservation =&gt; {\n    return {\n        ...preReservation,\n        customer: {\n            ...preReservation.customer,\n            first_name: guest.first_name,\n            last_name: guest.last_name,\n            email: guest.email,\n            telephone: guest.telephone,\n        },\n    };\n});\n\n\n",
      tags: ["JavaScript"],
      id: 0
    });
    

    index.add({
      title: "React setState() with prevState and Object Spread Operator",
      category: null,
      content: "🧩Reference Links:\n\n\n  React setState() with prevState and Object Spread Operator\n  Using a function in setState instead of an object\n\n\nThere are some gotchas with React’s setState(). For example, state updates may be asynchronous: React sometimes batches multiple setState() calls for performance reasons.\n\n\n\nMake sure to set state correctly and to use the latest state. Here are some examples from the official documentation:\n\n// Wrong\nthis.setState({\n  counter: this.state.counter + this.props.increment\n});\n\n\nInstead you should use a function which takes the previous state as a first argument.\n\n// Correct\nthis.setState((state, props) =&gt; ({\n  counter: state.counter + props.increment\n}));\n\n\nLet’s say you have an object in your state and want to use the object spread syntax:\n\n// This is the state of your React component\nthis.state = {\n  person: {\n    firstName: \"\",\n    secondName: \"\"\n  }\n};\n\n\nNow you want to change the state:\n\nthis.setState(prevState =&gt; ({\n  person: {\n    ...prevState.person,\n    firstName: \"Tom\",\n    secondName: \"Jerry\"\n  }\n}));\n\n\nThis also works:\n\nthis.setState(() =&gt; ({\n  person: {\n    ...this.state.person,\n    firstName: \"Tom\",\n    secondName: \"Jerry\"\n  }\n}));\n\n\nUsing functions is now the recommended way to set state in React.\n",
      tags: ["JavaScript"],
      id: 1
    });
    

    index.add({
      title: "How to filter an array with another array",
      category: null,
      content: "🧩Reference link:\n\n\n  How to filter an array with another array\n\n\n\n\nExample 1\n\nvar array1 = [\"a\", \"b\", \"c\", \"d\", \"e\"];\nvar array2 = [\"b\", \"d\", \"f\"];\n\narray1 = array1.filter(function(item) {\n  return !array2.includes(item);\n});\nconsole.log(array1); // [ 'a', 'c', 'e' ]\nconsole.log(array2); // [ 'b', 'd', 'f' ]\n\n\nExample 2\n\nvar array1 = [\"a\", \"b\", \"c\", \"d\", \"e\"];\nvar array2 = [\"b\", \"d\", \"f\"];\n\nvar tempArr = array2.filter(function(item) {\n  return !array1.includes(item);\n});\narray1 = array1.filter(function(item) {\n  return !array2.includes(item);\n});\narray2 = tempArr;\n\nconsole.log(array1); // [ 'a', 'c', 'e' ]\nconsole.log(array2); // [ 'f' ]\n\n\nAnother solution for the 2nd example\n\nvar array1 = [\"a\", \"b\", \"c\", \"d\", \"e\"];\nvar array2 = [\"b\", \"d\", \"f\"];\n\narray2 = array2.filter(function(item) {\n  return !array1.includes(item)\n    ? true\n    : array1.splice(array1.indexOf(item), 1) &amp;&amp; false;\n});\n\nconsole.log(array1); // [ 'a', 'c', 'e' ]\nconsole.log(array2); // [ 'f' ]\n\n",
      tags: ["JavaScript"],
      id: 2
    });
    


var store = [{
    "title": "How to update nested state properties in React",
    "link": "/how-to-update-nested-state-properties-in-react.html",
    "image": null,
    "date": "October 10, 2019",
    "category": null,
    "excerpt": "🧩Reference links: How State Updates Are Merged in React How to Update Nested State Properties in React How to update..."
},{
    "title": "React setState() with prevState and Object Spread Operator",
    "link": "/react-setstate-with-prevState-and-object-spread-operator.html",
    "image": null,
    "date": "March 15, 2019",
    "category": null,
    "excerpt": "🧩Reference Links: React setState() with prevState and Object Spread Operator Using a function in setState instead of an object There..."
},{
    "title": "How to filter an array with another array",
    "link": "/how-to-filter-an-array-with-another-array.html",
    "image": null,
    "date": "February 5, 2019",
    "category": null,
    "excerpt": "🧩Reference link: How to filter an array with another array Example 1 var array1 = [\"a\", \"b\", \"c\", \"d\", \"e\"];..."
}]

$(document).ready(function() {
    $('#search-input').on('keyup', function () {
        var resultdiv = $('#results-container');
        if (!resultdiv.is(':visible'))
            resultdiv.show();
        var query = $(this).val();
        var result = index.search(query);
        resultdiv.empty();
        $('.show-results-count').text(result.length + ' Results');
        for (var item in result) {
            var ref = result[item].ref;
            var searchitem = '<li><a href="'+ hostname + store[ref].link+'">'+store[ref].title+'</a></li>';
            resultdiv.append(searchitem);
        }
    });
});