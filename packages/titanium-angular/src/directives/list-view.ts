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
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs';

import {
    AbstractAngularElement,
    AbstractTextualNode,
    InvisibleElement,
    NodeInterface,
    TitaniumElement,
    TitaniumElementRegistry
} from '../vdom';

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
        <DetachedView>
            <Placeholder #loader></Placeholder>
        </DetachedView>
    `
})
export class ListViewComponent implements AfterContentInit {

    public listView: Titanium.UI.ListView;

    public refreshControl: Titanium.UI.RefreshControl = null;

    @ViewChild("loader", { read: ViewContainerRef }) loader: ViewContainerRef;

    private _element: TitaniumElement;

    private _elementRegistry: TitaniumElementRegistry;

    private _sections: any[];

    private _templateFactories: Map<string, Function>;

    private _initialized: boolean;

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
            const templates: Array<ListItemViewTemplate> = [];
            this.convertNodesToTemplatesRecursive(viewRef.rootNodes.filter(node => node instanceof AbstractAngularElement), templates);
            const itemTemplate = {
                childTemplates: templates
            };
            return itemTemplate;
        }
        this._templateFactories.set(name, createTemplate);
    }

    private convertNodesToTemplatesRecursive(nodes: Iterable<NodeInterface>, templates: Array<ListItemViewTemplate>): void {
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
                        properties[attributeName] = attributeValue;
                    }
                });
                templateDefinition.properties = properties;
                if (node.children.length > 0) {
                    this.convertNodesToTemplatesRecursive(node.children, templateDefinition.childTemplates);
                }
                templates.push(templateDefinition);
            } else if (node instanceof AbstractAngularElement) {
                this.convertNodesToTemplatesRecursive(node.children, templates);
            }
        }
    }

    ngAfterContentInit() {
        let templates = {};
        this._templateFactories.forEach((createTemplate, templateName) => {
            templates[templateName] = createTemplate();
        });
        this._element.setAttribute('templates', templates);
        this.listView = <Titanium.UI.ListView>this._element.titaniumView;
        const ownerElement = <TitaniumElement>this._element.parentElement;
        const owner = <Titanium.UI.View>ownerElement.titaniumView;
        owner.add(this.listView);

        if (this.refreshControl !== null) {
            this.listView.setRefreshControl(this.refreshControl);
        }

        for (const section of this._sections) {
            this.listView.appendSection(section);
        }
        this._initialized = true;
    }
}

/**
 * A list item within a list section
 * 
 * Since this does not map to a Titanium proxy that would update itself
 * on attribute changes, we use input properties and listen for changes
 * on the ListItem elements in the list section directive.
 */
@Directive({
    selector: 'ListItem'
})
export class ListItemDirective implements OnChanges {
    public element: InvisibleElement;

    @Input() accessoryType: number;

    @Input() canEdit: boolean;

    @Input() canInsert: boolean;

    @Input() canMove: boolean;

    @Input() color: string;

    @Input() editActions: Titanium.UI.RowActionType[];

    @Input() font: Titanium.Font;

    @Input() height: number | string;

    @Input() image: string;

    @Input() itemId: boolean;

    @Input() searchableText: string;

    @Input() selectedBackgroundColor: string;

    @Input() selectedBackgroundGradient: Titanium.UI.Gradient;

    @Input() selectedBackgroundImage: string;

    @Input() selectedColor: string;

    @Input() selectedSubtitleColor: string;

    @Input() selectionStyle: string;

    @Input() subtitle: string;

    @Input() subtitleColor: string;

    @Input() template: number;

    @Input() title: string;

    private owner: ListSectionDirective;

    private itemProperties: object = {};

    private customProperties: object = {};

    constructor(el: ElementRef, owner: ListSectionDirective) {
        this.element = el.nativeElement;
        this.owner = owner;
    }

    get dataItem(): Titanium.UI.ListDataItem {
        const dataItem: Titanium.UI.ListDataItem = {
            properties: this.itemProperties
        }
        if (this.template !== undefined) {
            dataItem.template = this.template;
        }
        return dataItem;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.owner.updateListItem(this);
        for (let changedPropertyName in changes) {
            if (changedPropertyName === 'template') {
                continue;
            }
            const change = changes[changedPropertyName];
            this.itemProperties[changedPropertyName] = change.currentValue;
        }
    }
}

@Directive({
    selector: 'ListSection'
})
export class ListSectionDirective implements AfterContentInit {

    public listSection: Titanium.UI.ListSection;

    @ContentChildren(ListItemDirective) contentItems: QueryList<ListItemDirective>;

    private owner: ListViewComponent;

    private _items: Array<any>;

    constructor(el: ElementRef, owner: ListViewComponent) {
        this.listSection = el.nativeElement.titaniumView;
        this.owner = owner;
    }

    @Input()
    get items() {
        return this._items;
    }

    set items(value: any) {
        this._items = value;

        // todo: Add support for observable arrays

        this.listSection.setItems(this._items);
    }

    ngAfterContentInit() {
        this.updateContentListItems();

        this.owner.appendSection(this.listSection);

        this.contentItems.changes.subscribe(changes => {
            for (let changedPropertyName in changes) {
                // @todo check for changed items?
            }
        });
    }

    updateListItem(item: ListItemDirective) {
        if (this.contentItems === undefined) {
            return;
        }

        let itemIndex = null;
        this.contentItems.find((element, index, array) => {
            if (element === item) {
                itemIndex = index;
                return true;
            }

            return false;
        });

        this.listSection.updateItemAt(itemIndex, item.dataItem);
    }

    private updateContentListItems() {
        if (this.contentItems.length > 0) {
            this.items = this.contentItems.map(listItem => listItem.dataItem);
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

    private refreshControl: Titanium.UI.RefreshControl;

    private listViewComponent: ListViewComponent;

    constructor(el: ElementRef, @Host() listView: ListViewComponent) {
        this.refreshControl = el.nativeElement.titaniumView;
        this.listViewComponent = listView;
    }

    ngAfterViewInit() {
        this.listViewComponent.refreshControl = this.refreshControl;
    }
}