const obj={
    one:1,
    two:2,
    three:3
}
const object1 = {
    a: 'somestring',
    b: 42
  };



  
let f=Object.entries(obj)
let k=Object.keys(obj)
let v=Object.values(obj)

console.log(f)
console.log(k)
console.log(v)

var bar = null;
console.log(typeof bar === "object"); // logs true!

console.log((bar !== null) && (typeof bar === "object"));
// logs false


