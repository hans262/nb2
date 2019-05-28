interface StringArray<T> {
    setTime(d: Date): void;
    [id: number]: string;
}
declare let myArray: StringArray<string>;
