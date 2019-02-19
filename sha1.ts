const fromCharCode: Function = String.fromCharCode;

function rstr_sha1(s: string): string {
    return binb2rstr(binb_sha1(rstr2binb(s), s.length * 8));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input: string): string {
    let output = "";
    for (let i = 0; i < input.length; i++) {
        const x = input.charCodeAt(i);
        output += ((x >> 4) & 0x0F).toString(16) + (x & 0x0F).toString(16);
    }
    return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input: string): string {
    let output = "";
    let i = -1;
    let x: number, y: number;

    while (++i < input.length) {
        /* Decode utf-16 surrogate pairs */
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++;
        }

        /* Encode output as utf-8 */
        if (x <= 0x7F)
            output += fromCharCode(x);
        else if (x <= 0x7FF)
            output += fromCharCode(0xC0 | ((x >> 6) & 0x1F),
                0x80 | (x & 0x3F));
        else if (x <= 0xFFFF)
            output += fromCharCode(0xE0 | ((x >> 12) & 0x0F),
                0x80 | ((x >> 6) & 0x3F),
                0x80 | (x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += fromCharCode(0xF0 | ((x >> 18) & 0x07),
                0x80 | ((x >> 12) & 0x3F),
                0x80 | ((x >> 6) & 0x3F),
                0x80 | (x & 0x3F));
    }
    return output;
}

/*
 * Convert a raw string to an array of big-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binb(input: string): number[] {
    var output = [];
    for (var i = 0; i < input.length * 8; i += 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    }
    return output;
}

/*
 * Convert an array of big-endian words to a string
 */
function binb2rstr(input: number[]): string {
    let output = "";
    for (let i = 0; i < input.length * 32; i += 8) {
        output += fromCharCode((input[i >> 5] >> (24 - i % 32)) & 0xFF);
    }
    return output;
}

/*
 * Calculate the SHA-1 of an array of big-endian words, and a bit length
 */
function binb_sha1(x: number[], len: number): number[] {
    /* append padding */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    const w = [];
    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;
    let e = -1009589776;

    for (let i = 0; i < x.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;
        const olde = e;

        for (let j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)),
                safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = bit_rol(b, 30);
            b = a;
            a = t;
        }

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return [a, b, c, d, e];

}

/*
 * Perform the appropriate triplet combination function for the current
 * iteration
 */
function sha1_ft(t: number, b: number, c: number, d: number): number {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}

/*
 * Determine the appropriate additive constant for the current iteration
 */
function sha1_kt(t: number): number {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x: number, y: number): number {
    const lsw = (x & 0xFFFF) + (y & 0xFFFF);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num: number, cnt: number): number {
    return (num << cnt) | (num >>> (32 - cnt));
}

export function sha1(str: string): string {
    return rstr2hex(rstr_sha1(str2rstr_utf8(str)));
}
