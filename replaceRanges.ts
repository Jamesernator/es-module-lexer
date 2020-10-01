
export type RangeReplacement = {
    start: number,
    end: number,
    replacement: string,
};

export default function replaceRanges(
    string: string,
    replacements: Array<RangeReplacement>,
): string {
    const sortedReplacements = [...replacements]
        .sort((a, b) => b.start - a.start);
    const parts = [];
    let last: undefined | { start: number, end: number };
    for (const { start, end, replacement } of sortedReplacements) {
        if (last && (start > last.start || end > last.end)) {
            throw new Error("Cannot replace overlapping ranges");
        }
        const suffix = string.slice(end);
        string = string.slice(0, start);
        parts.push(suffix);
        parts.push(replacement);
        last = { start, end };
    }
    parts.push(string);
    parts.reverse();
    return parts.join("");
}
