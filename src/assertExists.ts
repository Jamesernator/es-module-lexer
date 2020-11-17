
export default function assertExists<T>(value: T): NonNullable<T> {
    if (value === null) {
        throw new Error("Value should not be null");
    }
    return value as NonNullable<T>;
}
