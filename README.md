# deno-checksum

[![tag](https://img.shields.io/github/tag/manyuanrong/deno-checksum.svg)](https://github.com/manyuanrong/deno-checksum)
[![Build Status](https://github.com/manyuanrong/deno-checksum/workflows/ci/badge.svg?branch=master)](https://github.com/manyuanrong/deno-checksum/actions)
[![license](https://img.shields.io/github/license/manyuanrong/deno-checksum.svg)](https://github.com/manyuanrong/deno-checksum)
[![tag](https://img.shields.io/badge/deno-v0.42.0-green.svg)](https://github.com/denoland/deno)

```ts
import { Hash, encode } from "https://deno.land/x/checksum@1.2.0/mod.ts";

console.log(new Hash("md5").digest(encode("hello world")).hex());
// or
console.log(new Hash("md5").digestString("hello world").hex());
// 5eb63bbbe01eeed093cb22bb8f5acdc3

console.log(new Hash("sha1").digestString("hello world").hex());
// or
console.log(new Hash("sha1").digest(encode("hello world")).hex());
// 2aae6c35c94fcfb415dbe95f408b9ce91ee846ed
```
