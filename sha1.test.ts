import { encode } from "https://deno.land/std/strings/encode.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { test } from "https://deno.land/std/testing/mod.ts";
import { Hash, hex } from "./hash.ts";

const hash = new Hash("sha1");

test(function testSha1Num() {
  const result = hash.digest(encode("123"));
  assertEquals("40bd001563085fc35165329ea1ff5c5ecbdbbeef", result.hex());
  console.log(result.hex());
});

test(function testSha1Chars() {
  const result = hash.digest(encode("abc"));
  assertEquals("a9993e364706816aba3e25717850c26c9cd0d89d", result.hex());
  console.log(result.hex());
});

test(function testSha1Unicode() {
  const result = hash.digest(encode("我爱你"));
  assertEquals("5890a73fed38bf09622c34ad9391f1d09c0ec100", result.hex());
  console.log(result.hex());
});

test(function testSha1ToHex() {
  const result = hex(hash.digest(encode("hex")).data);
  assertEquals("7994ebae30a63934992a16deca856d50596bc1a9", result);
  console.log(result);
});
