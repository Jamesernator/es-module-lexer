export default function assertIsString(
    value: unknown,
): asserts value is string {
    if (typeof value !== "string") {
        throw new Error(`expected value to be a string`);
    }
}
