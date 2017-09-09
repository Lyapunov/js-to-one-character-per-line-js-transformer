# js-to-one-character-per-line-js-transformer
Transforming normal javascript code into fully-functional and executable one-character-per-line javascript code.

##Introduction

It is a short prototype to prove all program can be written in javascript using at most one character per line. Not all programming languages has this flexibility. Maybe it is an argument for the superiority of Javascript. Maybe not.

This version is far from perfection and safetiness. You'll notice it pollutes **global** with many pre-defined variables, which may distrub the target code. It also should not throw errors for certain white spaces and carriage returns, it could transform them into spaces and colons. It would not be very hard to extend the eval portion with some cleanup code and putting an input purifier to the start of the program, which would lead to new problems in turn and so on.

##Examples

Examples for the command line and how the result looks like.

```
transfuscate.js 'console.log("Hello world!");'
```

![hello_world.js](https://github.com/Lyapunov/js-to-one-character-per-line-js-transformer/blob/master/examples/hello_world.js)

```
transfuscate.js 'console.log(global);'
```
![printing_out_global.js](https://github.com/Lyapunov/js-to-one-character-per-line-js-transformer/blob/master/examples/printing_out_global.js)

```
transfuscate.js 'x = 5; y = 3;console.log("The result is", x + y);'
```

![adding_two_numbers.js](https://github.com/Lyapunov/js-to-one-character-per-line-js-transformer/blob/master/examples/adding_two_numbers.js)

```
transfuscate.js 'x=1;y=1;while(y < 10000){z=y;y=x+y;x=z;console.log(x)};'
```

![fibonacci.js](https://github.com/Lyapunov/js-to-one-character-per-line-js-transformer/blob/master/examples/fibonacci.js)

Node should be able to run the output, e.g. try

```
node fibonacci.js
```
