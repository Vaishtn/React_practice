
### Learning
```sh


class A {
  constructor(name='ABC', age=25) {
    this.name = name;
    this.age = age;
  }

  print() {
    console.log(`The name is ${this.name} and the age is ${this.age}`);
  }
}

class B extends A {
  constructor(company=null) {
    super();
    this.company = company;
  }

  print() {
    console.log(`The name is ${this.name} and the age is ${this.age} and the company is ${this.company}`);
  }

}

const b = new B("Genpact HeadStrong");

b.print();
```

### Second note
```sh

var state = {
  email: null,
  password: null,
  name: null,
};

console.log("before update", state);

function setState(obj) {
  Object.keys(obj).forEach(item => {
    if(obj[item] !== undefined) {
      state[item] = obj[item];
    } else {
      state[item] = obj[item];
    }
  })
}


function getData(value, type) {
  setState({
    [type] : value
  })
}


// setState({
//   email: "abc@gmail.com",
//   name: "Subham",
// });

getData(30, "age");

console.log("after update", state);
```