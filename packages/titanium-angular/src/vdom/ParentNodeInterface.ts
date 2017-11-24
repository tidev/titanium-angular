import {
    ElementCollection,
    ElementNode
} from '.';

export interface ParentNodeInterface {
    children: ElementCollection;

    firstElementChild: ElementNode;

    lastElementChild: ElementNode;

    childElementCount: number;
}