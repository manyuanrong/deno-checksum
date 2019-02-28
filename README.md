# deno-checksum

```ts
import { Hash, encode } from "https://deno.land/x/checksum/mod.ts";
// 5eb63bbbe01eeed093cb22bb8f5acdc3
console.log(new Hash("md5").digest(encode("hello world")).hex());

// 2aae6c35c94fcfb415dbe95f408b9ce91ee846ed
console.log(new Hash("sha1").digest(encode("hello world")).hex());
```
