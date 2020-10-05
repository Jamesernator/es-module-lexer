
export default class NameGenerator {
    #string: string;
    #names = new Map<string, number>();

    constructor(string: string) {
        this.#string = string;
    }

    createName(prefix: string): string {
        const currentN = this.#names.get(prefix) ?? 0;
        const name = `${ prefix }$$${ currentN }`;
        this.#names.set(prefix, currentN + 1);
        return name;
    }
}
