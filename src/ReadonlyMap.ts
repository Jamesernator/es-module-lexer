
export default class ReadonlyMap<Key, Value> {
    readonly #map: Map<Key, Value>;

    constructor(map: Map<Key, Value>) {
        this.#map = map;
    }

    get(key: Key): Value | undefined {
        return this.#map.get(key);
    }

    has(key: Key): boolean {
        return this.#map.has(key);
    }

    * entries(): IterableIterator<[Key, Value]> {
        yield* this.#map.entries();
    }

    * values(): IterableIterator<Value> {
        yield* this.#map.values();
    }

    * keys(): IterableIterator<Key> {
        yield* this.#map.keys();
    }
}

Object.freeze(ReadonlyMap);
Object.freeze(ReadonlyMap.prototype);
