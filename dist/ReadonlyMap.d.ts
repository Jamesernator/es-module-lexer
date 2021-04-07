export default class ReadonlyMap<Key, Value> {
    #private;
    constructor(map: Map<Key, Value>);
    get(key: Key): Value | undefined;
    has(key: Key): boolean;
    entries(): IterableIterator<[Key, Value]>;
    values(): IterableIterator<Value>;
    keys(): IterableIterator<Key>;
}
