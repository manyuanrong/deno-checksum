import { Sha1Hash } from "./sha1.ts";
import { Md5Hash } from "./md5.ts";

export interface HashAlgorithm {
  digest(bytes: Uint8Array): Uint8Array;
}

type AlgorithmName = "sha1" | "md5";

export function hex(bytes: Uint8Array): string {
  return Array.prototype.map
    .call(bytes, (x: number) => x.toString(16).padStart(2, "0"))
    .join("");
}

const encoder = new TextEncoder();
export function encode(str: string) {
  return encoder.encode(str);
}

export class Hash {
  readonly instance: HashAlgorithm;

  constructor(readonly algorithm: AlgorithmName) {
    const algorithms = {
      sha1: Sha1Hash,
      md5: Md5Hash,
    };
    this.instance = new algorithms[algorithm]();
  }

  digest(
    bytes: Uint8Array,
  ): {
    data: Uint8Array;
    hex(): string;
  } {
    bytes = this.instance.digest(bytes);
    return {
      data: bytes,
      hex: () => hex(bytes),
    };
  }

  digestString(string:string) {
    return this.digest(encode(string));
  }
}
