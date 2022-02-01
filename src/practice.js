// let a = 6;
// a === 6;

// console.log(7 === 5) //false
//All above are scalers like numbers,booleans,strings which we are comparing to values

//Here because its an object we are dealing with the references not values. Thats why even though both a values are same it is false bc references are different wand in next example we're comparing references to references now its treu
({a : 1}) === {a : 1} //false
const obj = { a: 1 }
obj === obj //true
obj === { a: 1 } //false

[1] === [1] //false

  //Its how react works
const depCompare = (oldDeps, newDeps) => 
  oldDeps.length === newDeps.length && oldDeps.every((dep, i) => dep === newDeps[i])
  
console.log(depCompare([], [])) //true
depCompare([], [1]) //false
console.log(depCompare([obj], [obj])) //true 
const objRefCopy = obj;
console.log(depCompare([obj], [objRefCopy])) //its also true bc its the same reference
console.log(depCompare([obj], [{a : 1}])) //its false bc its not same reference
