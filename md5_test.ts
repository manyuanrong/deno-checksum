import { assertEquals } from "./deps.ts";
import { Hash, hex, encode } from "./hash.ts";

const { test } = Deno;
const hash = new Hash("md5");

test("md5Num", () => {
  const expected = "202cb962ac59075b964b07152d234b70";
  let actual = hash.digest(encode("123"));
  assertEquals(expected, actual.hex());

  actual = hash.digestString("123");
  assertEquals(expected, actual.hex());
});

test("md5Chars", () => {
  const expected = "900150983cd24fb0d6963f7d28e17f72";
  let actual = hash.digest(encode("abc"));
  assertEquals(expected, actual.hex());

  actual = hash.digestString("abc");
  assertEquals(expected, actual.hex());
});

test("md5Unicode", () => {
  const expected = "4f2016c6b934d55bd7120e5d0e62cce3";
  let actual = hash.digest(encode("我爱你"));
  assertEquals(expected, actual.hex());

  actual = hash.digestString("我爱你");
  assertEquals(expected, actual.hex());
});

test("md5ToHex", () => {
  const expected = "b8d1b43eae73587ba56baef574709ecb";
  let actual = hex(hash.digest(encode("hex")).data);
  assertEquals(expected, actual);

  actual = hex(hash.digestString("hex").data);
  assertEquals(expected, actual);
});
