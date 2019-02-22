import { Sha1Hash } from "./sha1.ts";
import { Md5Hash } from "./md5.ts";

export interface HashAlgorithm {
  digest(bytes: Uint8Array): Uint8Array;
}

type AlgorithmName = "sha1" | "md5";

export class Hash {
  private _data: Uint8Array;
  readonly instance: HashAlgorithm;

  constructor(readonly algorithm: AlgorithmName) {
    const algorithms = {
      sha1: Sha1Hash,
      md5: Md5Hash
    };
    this.instance = new algorithms[algorithm]();
  }

  digest(
    bytes: Uint8Array
  ): {
    data: Uint8Array;
    hex(): string;
  } {
    this._data = this.instance.digest(bytes);
    return {
      data: this._data,
      hex: this.hex.bind(this)
    };
  }

  /*
   * Convert a raw string to a hex string
   */
  private hex(): string {
    return Array.prototype.map
      .call(this._data, (x: number) => x.toString(16).padStart(2, "0"))
      .join("");
  }
}
