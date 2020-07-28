import { ComponentRef } from "@angular/core";
import { ComponentAdapterInterface } from 'titanium-navigator';
import { ElementNode, findSingleVisualElement, TitaniumElement } from 'titanium-vdom';

export class ComponentAdapter implements ComponentAdapterInterface {
  getComponentName(component: ComponentRef<any>) {
    return component.componentType.name;
  }

  detachComponent(component: any) {

  }

  getTopmostTitaniumElement<T extends Titanium.UI.View>(component: any): TitaniumElement<T> {
    const componentElement: ElementNode = component.location.nativeElement;
    let candidateElement = null;
    try {
      candidateElement = findSingleVisualElement(componentElement);
    } catch (e) {
      console.warn(e);
    }

    return candidateElement;
  }
}