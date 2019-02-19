import { test, assert, runTests } from "https://deno.land/x/testing/mod.ts";
import { md5, sha1 } from "./mod.ts";

test(function testMd5() {
    assert.equal("5eb63bbbe01eeed093cb22bb8f5acdc3", md5("hello world"));
    assert.equal("e10adc3949ba59abbe56e057f20f883e", md5("123456"));
})

test(function testSha1() {
    assert.equal("7c4a8d09ca3762af61e59520943dc26494f8941b", sha1("123456"));
    assert.equal("2aae6c35c94fcfb415dbe95f408b9ce91ee846ed", sha1("hello world"));
});

runTests();
