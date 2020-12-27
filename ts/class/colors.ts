// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
/** A module to print ANSI terminal colors. Inspired by chalk, kleur, and colors
 * on npm.
 *
 * ```
 * import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";
 * console.log(bgBlue(red(bold("Hello world!"))));
 * ```
 *
 * This module supports `NO_COLOR` environmental variable disabling any coloring
 * if `NO_COLOR` is set.
 *
 * This module is browser compatible. */

const noColor = globalThis.Deno?.noColor ?? true;

interface Code {
    open: string;
    close: string;
    regexp: RegExp;
}

/** RGB 8-bits per channel. Each in range `0->255` or `0x00->0xff` */
interface Rgb {
    r: number;
    g: number;
    b: number;
}

let enabled = !noColor;
export class Colors {
    /**
     * Set changing text color to enabled or disabled
     * @param value
     */
    public setColorEnabled(value: boolean): void {
        if (noColor) {
            return;
        }
        enabled = value;
    }

    /** Get whether text color change is enabled or disabled. */
    public getColorEnabled(): boolean {
        return enabled;
    }

    /**
     * Builds color code
     * @param open
     * @param close
     */
    public code(open: number[], close: number): Code {
        return {
            open: `\x1b[${open.join(";")}m`,
            close: `\x1b[${close}m`,
            regexp: new RegExp(`\\x1b\\[${close}m`, "g"),
        };
    }

    /**
     * Applies color and background based on color code and its associated text
     * @param str text to apply color settings to
     * @param code color code to apply
     */
    public run(str: string, code: Code): string {
        return enabled
            ? `${code.open}${str.replace(code.regexp, code.open)}${code.close}`
            : str;
    }

    /**
     * Reset the text modified
     * @param str text to reset
     */
    public reset(str: string): string {
        return this.run(str, this.code([0], 0));
    }

    /**
     * Make the text bold.
     * @param str text to make bold
     */
    public bold(str: string): string {
        return this.run(str, this.code([1], 22));
    }

    /**
     * The text emits only a small amount of light.
     * @param str text to dim
     */
    public dim(str: string): string {
        return this.run(str, this.code([2], 22));
    }

    /**
     * Make the text italic.
     * @param str text to make italic
     */
    public italic(str: string): string {
        return this.run(str, this.code([3], 23));
    }

    /**
     * Make the text underline.
     * @param str text to underline
     */
    public underline(str: string): string {
        return this.run(str, this.code([4], 24));
    }

    /**
     * Invert background color and text color.
     * @param str text to invert its color
     */
    public inverse(str: string): string {
        return this.run(str, this.code([7], 27));
    }

    /**
     * Make the text hidden.
     * @param str text to hide
     */
    public hidden(str: string): string {
        return this.run(str, this.code([8], 28));
    }

    /**
     * Put horizontal line through the center of the text.
     * @param str text to strike through
     */
    public strikethrough(str: string): string {
        return this.run(str, this.code([9], 29));
    }

    /**
     * Set text color to black.
     * @param str text to make black
     */
    public black(str: string): string {
        return this.run(str, this.code([30], 39));
    }

    /**
     * Set text color to red.
     * @param str text to make red
     */
    public red(str: string): string {
        return this.run(str, this.code([31], 39));
    }

    /**
     * Set text color to green.
     * @param str text to make green
     */
    public green(str: string): string {
        return this.run(str, this.code([32], 39));
    }

    /**
     * Set text color to yellow.
     * @param str text to make yellow
     */
    public yellow(str: string): string {
        return this.run(str, this.code([33], 39));
    }

    /**
     * Set text color to blue.
     * @param str text to make blue
     */
    public blue(str: string): string {
        return this.run(str, this.code([34], 39));
    }

    /**
     * Set text color to magenta.
     * @param str text to make magenta
     */
    public magenta(str: string): string {
        return this.run(str, this.code([35], 39));
    }

    /**
     * Set text color to cyan.
     * @param str text to make cyan
     */
    public cyan(str: string): string {
        return this.run(str, this.code([36], 39));
    }

    /**
     * Set text color to white.
     * @param str text to make white
     */
    public white(str: string): string {
        return this.run(str, this.code([37], 39));
    }

    /**
     * Set text color to gray.
     * @param str text to make gray
     */
    public gray(str: string): string {
        return this.brightBlack(str);
    }

    /**
     * Set text color to bright black.
     * @param str text to make bright-black
     */
    public brightBlack(str: string): string {
        return this.run(str, this.code([90], 39));
    }

    /**
     * Set text color to bright red.
     * @param str text to make bright-red
     */
    public brightRed(str: string): string {
        return this.run(str, this.code([91], 39));
    }

    /**
     * Set text color to bright green.
     * @param str text to make bright-green
     */
    public brightGreen(str: string): string {
        return this.run(str, this.code([92], 39));
    }

    /**
     * Set text color to bright yellow.
     * @param str text to make bright-yellow
     */
    public brightYellow(str: string): string {
        return this.run(str, this.code([93], 39));
    }

    /**
     * Set text color to bright blue.
     * @param str text to make bright-blue
     */
    public brightBlue(str: string): string {
        return this.run(str, this.code([94], 39));
    }

    /**
     * Set text color to bright magenta.
     * @param str text to make bright-magenta
     */
    public brightMagenta(str: string): string {
        return this.run(str, this.code([95], 39));
    }

    /**
     * Set text color to bright cyan.
     * @param str text to make bright-cyan
     */
    public brightCyan(str: string): string {
        return this.run(str, this.code([96], 39));
    }

    /**
     * Set text color to bright white.
     * @param str text to make bright-white
     */
    public brightWhite(str: string): string {
        return this.run(str, this.code([97], 39));
    }

    /**
     * Set background color to black.
     * @param str text to make its background black
     */
    public bgBlack(str: string): string {
        return this.run(str, this.code([40], 49));
    }

    /**
     * Set background color to red.
     * @param str text to make its background red
     */
    public bgRed(str: string): string {
        return this.run(str, this.code([41], 49));
    }

    /**
     * Set background color to green.
     * @param str text to make its background green
     */
    public bgGreen(str: string): string {
        return this.run(str, this.code([42], 49));
    }

    /**
     * Set background color to yellow.
     * @param str text to make its background yellow
     */
    public bgYellow(str: string): string {
        return this.run(str, this.code([43], 49));
    }

    /**
     * Set background color to blue.
     * @param str text to make its background blue
     */
    public bgBlue(str: string): string {
        return this.run(str, this.code([44], 49));
    }

    /**
     *  Set background color to magenta.
     * @param str text to make its background magenta
     */
    public bgMagenta(str: string): string {
        return this.run(str, this.code([45], 49));
    }

    /**
     * Set background color to cyan.
     * @param str text to make its background cyan
     */
    public bgCyan(str: string): string {
        return this.run(str, this.code([46], 49));
    }

    /**
     * Set background color to white.
     * @param str text to make its background white
     */
    public bgWhite(str: string): string {
        return this.run(str, this.code([47], 49));
    }

    /**
     * Set background color to bright black.
     * @param str text to make its background bright-black
     */
    public bgBrightBlack(str: string): string {
        return this.run(str, this.code([100], 49));
    }

    /**
     * Set background color to bright red.
     * @param str text to make its background bright-red
     */
    public bgBrightRed(str: string): string {
        return this.run(str, this.code([101], 49));
    }

    /**
     * Set background color to bright green.
     * @param str text to make its background bright-green
     */
    public bgBrightGreen(str: string): string {
        return this.run(str, this.code([102], 49));
    }

    /**
     * Set background color to bright yellow.
     * @param str text to make its background bright-yellow
     */
    public bgBrightYellow(str: string): string {
        return this.run(str, this.code([103], 49));
    }

    /**
     * Set background color to bright blue.
     * @param str text to make its background bright-blue
     */
    public bgBrightBlue(str: string): string {
        return this.run(str, this.code([104], 49));
    }

    /**
     * Set background color to bright magenta.
     * @param str text to make its background bright-magenta
     */
    public bgBrightMagenta(str: string): string {
        return this.run(str, this.code([105], 49));
    }

    /**
     * Set background color to bright cyan.
     * @param str text to make its background bright-cyan
     */
    public bgBrightCyan(str: string): string {
        return this.run(str, this.code([106], 49));
    }

    /**
     * Set background color to bright white.
     * @param str text to make its background bright-white
     */
    public bgBrightWhite(str: string): string {
        return this.run(str, this.code([107], 49));
    }

    /* Special Color Sequences */

    /**
     * Clam and truncate color codes
     * @param n
     * @param max number to truncate to
     * @param min number to truncate from
     */
    public clampAndTruncate(n: number, max = 255, min = 0): number {
        return Math.trunc(Math.max(Math.min(n, max), min));
    }

    /**
     * Set text color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
     * @param str text color to apply paletted 8bit colors to
     * @param color code
     */
    public rgb8(str: string, color: number): string {
        return this.run(str, this.code([38, 5, this.clampAndTruncate(color)], 39));
    }

    /**
     * Set background color using paletted 8bit colors.
     * https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit
     * @param str text color to apply paletted 8bit background colors to
     * @param color code
     */
    public bgRgb8(str: string, color: number): string {
        return this.run(str, this.code([48, 5, this.clampAndTruncate(color)], 49));
    }

    /**
     * Set text color using 24bit rgb.
     * `color` can be a number in range `0x000000` to `0xffffff` or
     * an `Rgb`.
     *
     * To produce the color magenta:
     *
     *      rgba24("foo", 0xff00ff);
     *      rgba24("foo", {r: 255, g: 0, b: 255});
     * @param str text color to apply 24bit rgb to
     * @param color code
     */
    public rgb24(str: string, color: number | Rgb): string {
        if (typeof color === "number") {
            return this.run(
                str,
                this.code(
                    [38, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff],
                    39,
                ),
            );
        }
        return this.run(
            str,
            this.code(
                [
                    38,
                    2,
                    this.clampAndTruncate(color.r),
                    this.clampAndTruncate(color.g),
                    this.clampAndTruncate(color.b),
                ],
                39,
            ),
        );
    }

    /**
     * Set background color using 24bit rgb.
     * `color` can be a number in range `0x000000` to `0xffffff` or
     * an `Rgb`.
     *
     * To produce the color magenta:
     *
     *      bgRgba24("foo", 0xff00ff);
     *      bgRgba24("foo", {r: 255, g: 0, b: 255});
     * @param str text color to apply 24bit rgb to
     * @param color code
     */
    public bgRgb24(str: string, color: number | Rgb): string {
        if (typeof color === "number") {
            return this.run(
                str,
                this.code(
                    [48, 2, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff],
                    49,
                ),
            );
        }
        return this.run(
            str,
            this.code(
                [
                    48,
                    2,
                    this.clampAndTruncate(color.r),
                    this.clampAndTruncate(color.g),
                    this.clampAndTruncate(color.b),
                ],
                49,
            ),
        );
    }
    /**
     * Remove ANSI escape codes from the string.
     * @param string to remove ANSI escape codes from
     */
    public stripColor(string: string): string {
        return string.replace(ANSI_PATTERN, "");
    }
}
// https://github.com/chalk/ansi-regex/blob/2b56fb0c7a07108e5b54241e8faec160d393aedb/index.js
const ANSI_PATTERN = new RegExp(
    [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))",
    ].join("|"),
    "g",
);
