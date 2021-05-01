export interface ClassOf<T> {
    new(...args: any): T;
    prototype: T;
}