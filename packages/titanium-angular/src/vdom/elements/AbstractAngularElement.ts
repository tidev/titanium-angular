import {
    ElementCollection,
    ElementNode,
    TitaniumElement
} from '..';

export abstract class AbstractAngularElement extends ElementNode {
    get parentTemplateElement(): AbstractAngularElement {
        return this.parentElement instanceof AbstractAngularElement ? this.parentElement : null;
    }

    findSingleVisualElement(node: AbstractAngularElement): TitaniumElement {
        let visualElement = null;
        try {
            visualElement = this.findSingleVisualElementRecursive(node.children);
        } catch (e) {
            throw new Error(`No suitable visual element found within ${node}. Reason: ${e.message}`);
        }

        return visualElement;
    }

    abstract insertIntoVisualTree(children: AbstractAngularElement, atIndex?: number);

    private findSingleVisualElementRecursive(elements: ElementCollection, nestingLevel: number = 0) {
        if (elements.length === 0) {
            throw new Error(`Reached buttom of tree without finding at least one visual element (nesting level: ${nestingLevel}).`);
        }

        if (elements.length > 1) {
            throw new Error(`Expected only one elemnt, but found ${elements.length} (nesting level: ${nestingLevel}).`);
        }

        const candidateElement = elements.item(0);
        if (candidateElement instanceof TitaniumElement) {
            console.log(`Found element ${candidateElement}`);
            return candidateElement;
        }

        return this.findSingleVisualElementRecursive(candidateElement.children, nestingLevel + 1);
    }
}