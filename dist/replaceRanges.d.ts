export declare type RangeReplacement = {
    start: number;
    end: number;
    replacement: string;
};
export default function replaceRanges(string: string, replacements: Array<RangeReplacement>): string;
