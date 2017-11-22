import {
    AbstractNode
} from '.';

export abstract class AbstractTextualNode extends AbstractNode {
    text: string;

    constructor(text: string) {
        super();

        this.text = text;
    }

    toString(): string {
        return `${this.constructor.name}("${this.text}")`;
    }
}