import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    Host,
    Inject,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import {
    AbstractTextualNode,
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

/*
@Directive({
    selector: 'ListView'
})
*/
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

    private _templates: Map<string, ListItemTemplate>;

    private _initialized: Boolean;

    constructor(el: ElementRef, @Inject(TitaniumElementRegistry) elementRegistry: TitaniumElementRegistry) {
        this.element = el.nativeElement;
        this.listView = this.element.titaniumView;
        this._elementRegistry = elementRegistry;
        this._sections = [];
        this._templates = new Map<string, any>();
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
        const viewRef = this.loader.createEmbeddedView(template, new ListItemContext(), 0);
        const itemTemplate: ListItemTemplate = {
			childTemplates: this.convertNodesToTemplates(viewRef.rootNodes)
        };
        this._templates.set(name, itemTemplate);
    }

    convertNodesToTemplates(nodes) {
        let templates = [];
        for (let node of nodes) {
            if (node instanceof AbstractTextualNode) {
                continue;
            }

            if (!(node instanceof TitaniumElementNode)) {
                throw new Error('A list view item template may only contain other Titanium views.');
            }

            let meta = this._elementRegistry.getViewMetadata(node.nodeName);
            let templateDefinition: ListItemViewTemplate = {
                type: meta.typeName,
                bindId: node.getElementAttribute('bindId')
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
                templateDefinition.childTemplates = this.convertNodesToTemplates(node.children);
            }
            templates.push(templateDefinition);
        }
        return templates;
    }

    ngAfterContentInit() {
        let templates = {};
        this._templates.forEach((templateDefinition, templateName) => {
            templates[templateName] = templateDefinition;
        });
        this.listView.setTemplates(templates);
        for (const section of this._sections) {
            this.listView.appendSection(section);
        }
    }
}

@Directive({
    selector: 'ListSection'
})
export class ListSectionDirective implements OnInit {

    public element: TitaniumElementNode;

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
    }

    ngOnInit() {
        this.element.titaniumView.items = this.items;
        this.owner.appendSection(this.element.titaniumView);
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