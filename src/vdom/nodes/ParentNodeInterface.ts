import {
    ElementCollection
} from '..';

import {
    ElementNode
} from '.';

export interface ParentNodeInterface {
    children: ElementCollection;

    firstElementChild: ElementNode;

    lastElementChild: ElementNode;

    childElementCount: number;
}