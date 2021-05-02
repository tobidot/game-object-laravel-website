import { ClassOf } from "./typescript";

interface HasQuerySelector {
    querySelector(selector: string): HTMLElement
}

export function get_element_by_selector_or_fail(root: HasQuerySelector, selector: string): HTMLElement;
export function get_element_by_selector_or_fail<T extends HasQuerySelector>(root: HTMLElement, selector: string, element_class: ClassOf<T>): T;
export function get_element_by_selector_or_fail(root: HasQuerySelector, selector: string, element_class: ClassOf<HTMLElement> = HTMLElement): HTMLElement {
    const element = root.querySelector(selector);
    if (!(element instanceof element_class)) throw new Error("Unable to get element by selector. '" + selector + "'");
    return element;
}