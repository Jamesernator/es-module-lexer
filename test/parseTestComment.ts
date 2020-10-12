import yaml from "js-yaml";

function linesBetween(
    string: string,
    startLine: string,
    endLine: string,
): string {
    const lines = string.split(/\n/gu);
    return lines.slice(
        lines.findIndex((line) => line.trim() === startLine) + 1,
        lines.findIndex((line) => line.trim() === endLine),
    ).join("\n");
}

type TestConfig = {
    flags?: Array<string>,
    negative?: {
        phase: "parse" | "early" | "resolution" | "runtime",
        type: string,
    },
    includes?: Array<string>,
};

export default function parseTestComment(sourceCode: string): TestConfig {
    return yaml.load(linesBetween(
        sourceCode,
        "/*---",
        "---*/",
    ));
}
