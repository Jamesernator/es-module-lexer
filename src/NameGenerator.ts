
export default class NameGenerator {
    readonly #string: string;
    readonly #names = new Map<string, number>();

    constructor(string: string) {
        this.#string = string;
    }

    createName(prefix: string): string {
        let currentN = this.#names.get(prefix) ?? 0;
        let name = `${ prefix }$$${ currentN }`;
        while (this.#string.includes(name)) {
            currentN += 1;
            name = `${ prefix }$${ currentN }`;
        }
        this.#names.set(prefix, currentN + 1);
        return name;
    }
}
