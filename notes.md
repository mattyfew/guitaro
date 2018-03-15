## Webpack

[Webpack](https://webpack.js.org/) is used to compile JS modules.  We will use it to **bundle** up all of our JS files into one big file, which we will name **bundle.js**.

- config file: **webpack.config.js**
  - We must specify an **entry** and an **output**

## **Babel**

[Babel](https://babeljs.io/) is what we will use to compile our code from ES6 to ES5 so that it has full browser support. One of the main component of Babel is its **loaders**, which are modules that will compile our code in different way, dependent on what loader you use.

- config file: **.babelrc**
- babel-polyfill allows us to use the newest features of ES6







1. Why do you use babel-polyfill?
2. Why are the preset: `[['es2015'], ['react']]` in multiple arrays?
3. Why not use the webpack dev server?
4. What is `if (require.main == module) `?
5. How does it know to listen on port 8081?