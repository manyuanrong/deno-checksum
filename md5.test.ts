import { Hash } from "./hash.ts";
import { encode } from "https://deno.land/x/std/strings/strings.ts";
import { test, runTests, assert } from "https://deno.land/x/testing/mod.ts";

const hash = new Hash("md5");

test(function test1() {
    const result = hash.digest(encode("123"));
    assert.equal("202cb962ac59075b964b07152d234b70", result.hex());
    console.log(result.hex());
});

test(function test2() {
    const result = hash.digest(encode("abc"));
    assert.equal("900150983cd24fb0d6963f7d28e17f72", result.hex());
    console.log(result.hex());
});

test(function test3() {
    const result = hash.digest(encode("我爱你"));
    assert.equal("4f2016c6b934d55bd7120e5d0e62cce3", result.hex());
    console.log(result.hex());
});

runTests();