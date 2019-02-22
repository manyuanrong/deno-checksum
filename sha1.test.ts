import { Hash } from "./hash.ts";
import { encode } from "https://deno.land/x/std/strings/strings.ts";
import { test, runTests, assert } from "https://deno.land/x/testing/mod.ts";

const hash = new Hash("sha1");

test(function test1() {
  const result = hash.digest(encode("123"));
  assert.equal("40bd001563085fc35165329ea1ff5c5ecbdbbeef", result.hex());
  console.log(result.hex());
});

test(function test2() {
  const result = hash.digest(encode("abc"));
  assert.equal("a9993e364706816aba3e25717850c26c9cd0d89d", result.hex());
  console.log(result.hex());
});

test(function test3() {
  const result = hash.digest(encode("我爱你"));
  assert.equal("5890a73fed38bf09622c34ad9391f1d09c0ec100", result.hex());
  console.log(result.hex());
});

runTests();
