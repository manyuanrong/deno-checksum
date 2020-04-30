import { assertEquals } from "./deps.ts";
import { Hash, hex, encode } from "./hash.ts";

const { test } = Deno;
const hash = new Hash("sha1");

test("sha1Num", () => {
  const expected = "40bd001563085fc35165329ea1ff5c5ecbdbbeef";

  let actual = hash.digest(encode("123"));
  assertEquals(expected, actual.hex());

  actual = hash.digestString("123");
  assertEquals(expected, actual.hex());
});

test("sha1Chars", () => {
  const expected = "a9993e364706816aba3e25717850c26c9cd0d89d";

  let actual = hash.digest(encode("abc"));
  assertEquals(expected, actual.hex());

  actual = hash.digestString("abc");
  assertEquals(expected, actual.hex());
});

test("sha1Unicode", () => {
  const expected = "5890a73fed38bf09622c34ad9391f1d09c0ec100";

  let actual = hash.digest(encode("我爱你"));
  assertEquals(expected, actual.hex());

  actual = hash.digestString("我爱你");
  assertEquals(expected, actual.hex());
});

test("sha1ToHex", () => {
  const expected = "7994ebae30a63934992a16deca856d50596bc1a9";

  let actual = hex(hash.digest(encode("hex")).data);
  assertEquals(expected, actual);

  actual = hex(hash.digestString("hex").data);
  assertEquals(expected, actual);
});
