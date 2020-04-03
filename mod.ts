const encoder = new TextEncoder();
export const encode = (str: string) => encoder.encode(str);
export { Hash, hex } from "./hash.ts";
