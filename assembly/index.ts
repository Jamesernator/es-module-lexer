
declare function addImport(string: string): void;

export function parseCode(code: string): void {
    const tokens = new Uint32Array(code.length * 2);
    addImport(code.slice(0, 5));
}
