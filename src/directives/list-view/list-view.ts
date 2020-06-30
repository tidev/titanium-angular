import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ElementNode,
  TitaniumElement,
  TitaniumElementRegistry
} from 'titanium-vdom';

import { RefreshControlDirective } from '../refresh-control';
import { isNumeric, toNumber } from '../../utility/number';
import { camelize } from '../../utility/string';

function setProperty(target: any, name: string, value: any) {
  if (typeof value === 'string' && isNumeric(value)) {
    target[name] = toNumber(value);
  } else {
    target[name] = value;
  }
}

interface ListItemViewTemplate {
  type: String,
  bindId: String,
  properties?: any,
  events?: any,
  childTemplates?: Array<ListItemViewTemplate>
}

export class ListItemContext {
  public item: any;
}

@Component({
  selector: 'list-view,ListView',
  template: `
    <Wrapper detached>
      <Loader #loader detached></Loader>
      <ng-content></ng-content>
    </Wrapper>
  `
})
export class ListViewComponent implements AfterViewInit {

  public listView: Titanium.UI.ListView;

  @ContentChild(RefreshControlDirective)
  set refreshControl(directive: RefreshControlDirective) {
    if (directive) {
      this._refreshControl = directive.refreshControl;
    } else {
      this._refreshControl = null;
    }
  }

  @ViewChild("loader", { read: ViewContainerRef, static: false }) loader: ViewContainerRef;

  private _element: TitaniumElement<Titanium.UI.ListView>;

  private _elementRegistry: TitaniumElementRegistry;

  private _sections: any[];

  private _templateFactories: Map<string, Function>;

  private _initialized: boolean;

  private _refreshControl: Titanium.UI.RefreshControl | null = null;

  constructor(el: ElementRef, elementRegistry: TitaniumElementRegistry) {
    this._element = el.nativeElement;
    this._elementRegistry = elementRegistry;
    this._sections = [];
    this._templateFactories = new Map<string, any>();
    this._initialized = false;
  }

  get isInitialize() {
    return this._initialized;
  }

  appendSection(section: any) {
    this._sections.push(section);
    if (this._initialized) {
      this.listView.appendSection(section);
    }
  }

  registerTemplate(name: string, template: TemplateRef<any>) {
    const createTemplate = () => {
      const viewRef = this.loader.createEmbeddedView(template, new ListItemContext(), 0);
      viewRef.detectChanges();
      const templates: Array<ListItemViewTemplate> = [];
      this.convertNodesToTemplatesRecursive(viewRef.rootNodes.filter(node => node instanceof ElementNode), templates);
      const itemTemplate = {
        childTemplates: templates
      };
      this.loader.clear();
      return itemTemplate;
    }
    this._templateFactories.set(name, createTemplate);
  }

  private convertNodesToTemplatesRecursive(nodes: Iterable<ElementNode>, templates: Array<ListItemViewTemplate>): void {
    for (let node of nodes) {
      if (node instanceof TitaniumElement) {
        let meta = this._elementRegistry.getViewMetadata(node.nodeName);
        let templateDefinition: ListItemViewTemplate = {
          type: meta.typeName,
          bindId: node.getElementAttribute('bindId'),
          childTemplates: []
        };
        let properties = {};
        node.attributes.forEach((attributeValue, attributeName) => {
          if (attributeName === 'bindId') {
            return;
          } else if (attributeName === 'events') {
            templateDefinition.events = attributeValue;
          } else {
            setProperty(properties, camelize(attributeName), attributeValue);
          }
        });
        // @todo: Map events
        templateDefinition.properties = properties;
        if (node.children.length > 0) {
          this.convertNodesToTemplatesRecursive(node.children, templateDefinition.childTemplates);
        }
        templates.push(templateDefinition);
      } else if (node instanceof ElementNode) {
        this.convertNodesToTemplatesRecursive(node.children, templates);
      }
    }
  }

  ngAfterViewInit() {
        let templates: any = {};
        this._templateFactories.forEach((createTemplate, templateName) => {
            templates[templateName] = createTemplate();
        });
        this._element.setAttribute('templates', templates);
        console.log('ListView ngAfterViewInit');
        this.listView = <Titanium.UI.ListView>this._element.titaniumView;
        const ownerElement = <TitaniumElement<Titanium.UI.View>>this._element.parentElement;
        const owner = ownerElement.titaniumView;
        owner.add(this.listView);

        if (this._refreshControl !== null) {
            this.listView.refreshControl = this._refreshControl;
        }

        for (const section of this._sections) {
            this.listView.appendSection(section);
        }
        this._initialized = true;
  }
}