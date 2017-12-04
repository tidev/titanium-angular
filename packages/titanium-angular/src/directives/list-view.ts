import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    Host,
    Inject,
    Input,
    OnInit,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {
    Observable
} from 'rxjs';

import {
    AbstractTextualNode,
    ElementNode,
    NodeInterface,
    TitaniumElementNode,
    TitaniumElementRegistry
} from '../vdom';

interface ListItemTemplate {
    childTemplates: Array<ListItemViewTemplate>,
    events?: any
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
    selector: 'ListView',
    template: `
        <ListWrapper>
            <TemplateLoadingContainer #loader></TemplateLoadingContainer>
        </ListWrapper>
    `
})
export class ListViewComponent implements AfterContentInit {

    public element: TitaniumElementNode;

    public listView: any;

    @ViewChild("loader", { read: ViewContainerRef }) loader: ViewContainerRef;

    private _elementRegistry: TitaniumElementRegistry;

    private _sections: any[];

    private _templateFactories: Map<string, Function>;

    private _initialized: boolean;

    constructor(el: ElementRef, @Inject(TitaniumElementRegistry) elementRegistry: TitaniumElementRegistry) {
        this.element = el.nativeElement;
        this.listView = this.element.titaniumView;
        this._elementRegistry = elementRegistry;
        this._sections = [];
        this._templateFactories = new Map<string, any>();
        this._initialized = false;
    }

    appendSection(section: any) {
        this._sections.push(section);
        if (this._initialized) {
            this.listView.appendSection(section);
        }
    }

    registerTemplate(name: string, template: TemplateRef<any>) {
        console.log(`Register ListView template ${name}`);
        const createTemplate = () => {
            const viewRef = this.loader.createEmbeddedView(template, new ListItemContext(), 0);
            const templates: Array<ListItemViewTemplate> = [];
            this.convertNodesToTemplatesRecursive(viewRef.rootNodes.filter(node => node instanceof ElementNode), templates);
            const itemTemplate: ListItemTemplate = {
                childTemplates: templates
            };
            return itemTemplate;
        }
        this._templateFactories.set(name, createTemplate);
    }

    private convertNodesToTemplatesRecursive(nodes: Iterable<NodeInterface>, templates: Array<ListItemViewTemplate>): void {
        for (let node of nodes) {
            if (node instanceof TitaniumElementNode) {
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
                        properties[attributeName] = attributeValue;
                    }
                });
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

    ngAfterContentInit() {
        let templates = {};
        this._templateFactories.forEach((createTemplate, templateName) => {
            templates[templateName] = createTemplate();
        });
        this.listView.setTemplates(templates);
        for (const section of this._sections) {
            this.listView.appendSection(section);
        }
        this._initialized = true;
    }
}

@Directive({
    selector: 'ListItem'
})
export class ListItemDirective {
    public element: ElementNode;

    contructor(el: ElementRef, owner: ListSectionDirective) {
        this.element = el.nativeElement;
    }
}

@Directive({
    selector: 'ListSection'
})
export class ListSectionDirective implements OnInit, AfterContentInit {

    public element: TitaniumElementNode;

    @ContentChildren(ListItemDirective) contentItems: QueryList<ListItemDirective>

    private owner: ListViewComponent;

    private _items: Array<any>;

    constructor(el: ElementRef, owner: ListViewComponent) {
        this.element = el.nativeElement;
        this.owner = owner;
    }

    @Input()
    get items() {
        return this._items;
    }

    set items(value: any) {
        this._items = value;

        // todo: Add support for observable arrays

        this.element.titaniumView.setItems(this._items);
    }

    ngOnInit() {
        this.element.titaniumView.setItems(this.items);
        this.owner.appendSection(this.element.titaniumView);
    }

    ngAfterContentInit() {
        if (this.contentItems.length > 0) {
            this.element.titaniumView.setItems(this.contentItems.map(listItem => {
                let itemProperties = {};
                listItem.element.attributes.forEach((attributeValue, attributeName) => {
                    itemProperties[attributeName] = attributeValue;
                });
                return itemProperties;
            }));
        }
    }
}

@Directive({
    selector: '[tiTemplateName]'
})
export class ListItemTemplateDirective {

    private templateRef: TemplateRef<any>;

    private listView: ListViewComponent;

    constructor(templateRef: TemplateRef<any>, @Host() listView: ListViewComponent) {
        this.templateRef = templateRef;
        this.listView = listView;
    }

    @Input()
    set tiTemplateName(name: string) {
        if (this.listView && this.templateRef) {
            this.listView.registerTemplate(name, this.templateRef);
        }
    }
}

@Directive({
    selector: 'ListView > RefreshControl'
})
export class ListRefreshControlDirective implements AfterViewInit {

    private refreshControl: TitaniumElementNode;

    private listView: ListViewComponent;

    constructor(el: ElementRef, @Host() listView: ListViewComponent) {
        this.refreshControl = el.nativeElement;
        this.listView = listView;
    }

    ngAfterViewInit() {
        this.listView.listView.setRefreshControl(this.refreshControl.titaniumView);
    }
}