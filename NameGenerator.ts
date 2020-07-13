
export default class NameGenerator {
    #string: string;
    #names = new Map<string, number>();

    constructor(string: string) {
        this.#string = string;
    }

    createName(prefix: string): string {
        let currentN = this.#names.get(prefix) ?? 0;
        while (this.#string.includes(`${ prefix }$${ currentN }`)) {
            currentN += 1;
        }
        this.#names.set(prefix, currentN);
        return `${ prefix }$${ currentN }`;
    }
}
