import {
    AbstractTextualNode,
    NodeType
} from '.';

export class TextNode extends AbstractTextualNode {
    constructor(text: string) {
        super(text);

        this.nodeName = '#text';
        this.nodeType = NodeType.Text;
    }
}