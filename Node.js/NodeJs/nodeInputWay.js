// console.log(process.argv);

const arg1 = process.argv[2];
const arg2 = process.argv[3];

console.log("Hello Node.js");
console.log(arg1+arg2);

process.argv.forEach(val => {
    console.log(val);
})