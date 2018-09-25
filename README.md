
[![Greenkeeper badge](https://badges.greenkeeper.io/theKashey/with-known-usage.svg)](https://greenkeeper.io/)

<div align="center">
  <h1>with known usage</h1>
  <br/>
  Just be aware
  <br/>
    
  <a href="https://www.npmjs.com/package/with-known-usage">
   <img src="https://img.shields.io/npm/v/with-known-usage.svg?style=flat-square" />
  </a>
    
  <a href="https://travis-ci.org/theKashey/with-known-usage">
   <img src="https://travis-ci.org/theKashey/with-known-usage.svg?branch=master" />
  </a>

  <br/>  
</div>  

Tracking object usage in a performant way. Created specially for tracking [redux store usage](https://github.com/reduxjs/react-redux/pull/1021).

```js
import {withKnowUsage} from 'with-known-usage';

const obj = { a:1, b:2 };

const {
  proxy: obj,
  usage: Set<string>,
  usedKeys: Array<string>,
  resetUsage()
} = withKnowUsage(obj);

usage.has('a') === false;
usedKeys === [];

// now use it
proxy.a === 1 // (==obj.a)

usage.has('a') === true;
usedKeys === ['a'];

```