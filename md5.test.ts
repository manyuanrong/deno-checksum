import { encode } from "https://deno.land/std/strings/encode.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { test } from "https://deno.land/std/testing/mod.ts";
import { Hash, hex } from "./hash.ts";

const hash = new Hash("md5");

test(function testMd5Num() {
  const result = hash.digest(encode("123"));
  assertEquals("202cb962ac59075b964b07152d234b70", result.hex());
  console.log(result.hex());
});

test(function testMd5Chars() {
  const result = hash.digest(encode("abc"));
  assertEquals("900150983cd24fb0d6963f7d28e17f72", result.hex());
  console.log(result.hex());
});

test(function testMd5Unicode() {
  const result = hash.digest(encode("我爱你"));
  assertEquals("4f2016c6b934d55bd7120e5d0e62cce3", result.hex());
  console.log(result.hex());
});

test(function testMd5ToHex() {
  const result = hex(hash.digest(encode("hex")).data);
  assertEquals("b8d1b43eae73587ba56baef574709ecb", result);
  console.log(result);
});
