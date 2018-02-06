import {
    AbstractAngularElement,
    TitaniumElement
} from '.';

import {
    AbstractNode
} from '..';

/**
 * Representation of all elements that are not associated with a Titanium
 * view and thus not directly part of the visual tree.
 * 
 * Used for all elements that are not known to the Titanium element registry.
 * 
 * As this element is not part of the Titanium visual tree but still can
 * contain Titanium views as its children a special child element handling will
 * be applied. Invisible elements will recursively pass through all of their
 * children to its parent elements. If a Titanium element is reached the child
 * view will be inserted into the Titanium visual tree.
 * 
 * Example template:
 * 
 *  <View>
 *      <Label>1</Label>
 *      <SomeComponent>  <-- This is an invisible element
 *          <Label>2</Label>
 *      </SomeComponent>
 *      <Label>3</Label>
 *  </View>
 * 
 * Resulting visual tree:
 *  
 *  View
 *      Label 1
 *      Label 2
 *      Label 3
 */
export class InvisibleElement extends AbstractAngularElement {

    get nextVisualSibling(): TitaniumElement {
        for (let next = this.nextSibling; next !== null; next = next.nextSibling) {
            if (next instanceof TitaniumElement) {
                return next;
            }
        }

        return null;
    }

    insertBefore(newChild: AbstractNode, referenceChild: AbstractNode) {
        super.insertBefore(newChild, referenceChild);

        if (newChild instanceof AbstractAngularElement) {
            this.insertIntoVisualTree(newChild);

            for (const child of newChild.children) {
                if (child instanceof AbstractAngularElement) {
                    newChild.insertIntoVisualTree(child);
                }
            }

            if (this.firstElementChild === newChild && newChild instanceof TitaniumElement) {
                this.projectAttributesToVisualElement(newChild);
            }
        }
    }

    insertIntoVisualTree(child: AbstractAngularElement, atIndex?: number) {
        const parent = this.parentTemplateElement;
        if (parent === null) {
            console.log(`No parent element, cannot insert child ${child} into visual tree.`);
            return;
        }

        if (child instanceof TitaniumElement) {
            if (child.meta.skipAddToDom) {
                console.log(`Skip trying to insert detached view ${child} into visual tree.`);
                return;
            }
        }

        const nextVisual = this.nextVisualSibling;
        const baseIndex = nextVisual ? this.parentElement.children.indexOf(nextVisual) : 0;
        const insideIndex = atIndex === null || atIndex === undefined ? this.children.indexOf(child) : atIndex;

        console.log(`InvisibleElement.insertIntoVisualTree ${child} -> ${parent}`);
        parent.insertIntoVisualTree(child, baseIndex + insideIndex);
    }

    private projectAttributesToVisualElement(visualElement: TitaniumElement) {
        console.log(`InvisibleElement.projectAttributesToVisualElement - ${this} -> ${visualElement})`);
        for (let [attributeName, attributeValue] of this.attributes) {
            let name = attributeName;
            let namespace = null;
            const nameParts = attributeName.split(':');
            if (nameParts.length === 2) {
                name = nameParts[1];
                namespace = nameParts[0];
            }
            visualElement.setAttribute(attributeName, attributeValue);
        }
    }

}