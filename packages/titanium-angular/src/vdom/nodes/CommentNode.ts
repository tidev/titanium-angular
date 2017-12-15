import {
    AbstractTextualNode,
    NodeType
} from '.'

export class CommentNode extends AbstractTextualNode {
    constructor(text: string) {
        super(text);

        this.nodeName = '#comment';
        this.nodeType = NodeType.Comment;
    }
}