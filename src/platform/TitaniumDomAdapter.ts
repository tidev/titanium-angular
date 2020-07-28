import {
  ɵDomAdapter as DomAdapter,
  ɵsetRootDomAdapter as setRootDomAdapter
} from '@angular/common';

function throwNotSupportedError(): never {
  throw new Error('Not supported');
}

/**
* DOM adapter for the Titanium platform.
*
* Since we don't really have a DOM this class does nothing except for
* implementing a few helper methods.
*/
export class TitaniumDomAdapter extends DomAdapter {
  static makeCurrent() {
      setRootDomAdapter(new TitaniumDomAdapter());
  }

  hasProperty(element: any, name: string): boolean { throw new Error('DOM operations are not supported by the Titanium platform.') }
  setProperty(el: Element, name: string, value: any): any { return throwNotSupportedError(); }
  getProperty(el: Element, name: string): any { return throwNotSupportedError(); }
  invoke(el: Element, methodName: string, args: any[]): any { return throwNotSupportedError(); }

  logError(error: any): any {
    console.log('TitaniumDomAdapter.logError');
    if (console.error) {
      console.error(error);
    } else {
      console.log(error);
    }
  }
  log(error: any): any { console.log(error); }
  logGroup(error: any): any { console.group(error); }
  logGroupEnd(): any { console.groupEnd(); }

  contains(nodeA: any, nodeB: any): boolean { return throwNotSupportedError(); }
  parse(templateHtml: string): any { return throwNotSupportedError(); }
  querySelector(el: any, selector: string): any { return throwNotSupportedError(); }
  querySelectorAll(el: any, selector: string): any[] { return throwNotSupportedError(); }
  on(el: any, evt: any, listener: any): any { return throwNotSupportedError(); }
  onAndCancel(el: any, evt: any, listener: any): Function { return throwNotSupportedError(); }
  dispatchEvent(el: any, evt: any): any { return throwNotSupportedError(); }
  createMouseEvent(eventType: any): any { return throwNotSupportedError(); }
  createEvent(eventType: string): any { return throwNotSupportedError(); }
  preventDefault(evt: any): any { return throwNotSupportedError(); }
  isPrevented(evt: any): boolean { return throwNotSupportedError(); }
  getInnerHTML(el: any): string { return throwNotSupportedError(); }
  getTemplateContent(el: any): any { return throwNotSupportedError(); }
  getOuterHTML(el: any): string { return throwNotSupportedError(); }
  nodeName(node: any): string { return throwNotSupportedError(); }
  nodeValue(node: any): string | null { return throwNotSupportedError(); }
  type(node: any): string { return throwNotSupportedError(); }
  content(node: any): any { return throwNotSupportedError(); }
  firstChild(el: any): Node | null { return throwNotSupportedError(); }
  nextSibling(el: any): Node | null { return throwNotSupportedError(); }
  parentElement(el: any): Node | null { return throwNotSupportedError(); }
  childNodes(el: any): Node[] { return throwNotSupportedError(); }
  childNodesAsList(el: any): Node[] { return throwNotSupportedError(); }
  clearNodes(el: any): any { return throwNotSupportedError(); }
  appendChild(el: any, node: any): any { return throwNotSupportedError(); }
  removeChild(el: any, node: any): any { return throwNotSupportedError(); }
  replaceChild(el: any, newNode: any, oldNode: any): any { return throwNotSupportedError(); }
  remove(el: any): Node { return throwNotSupportedError(); }
  insertBefore(parent: any, ref: any, node: any): any { return throwNotSupportedError(); }
  insertAllBefore(parent: any, ref: any, nodes: any): any { return throwNotSupportedError(); }
  insertAfter(parent: any, el: any, node: any): any { return throwNotSupportedError(); }
  setInnerHTML(el: any, value: any): any { return throwNotSupportedError(); }
  getText(el: any): string | null { return throwNotSupportedError(); }
  setText(el: any, value: string): any { return throwNotSupportedError(); }
  getValue(el: any): string { return throwNotSupportedError(); }
  setValue(el: any, value: string): any { return throwNotSupportedError(); }
  getChecked(el: any): boolean { return throwNotSupportedError(); }
  setChecked(el: any, value: boolean): any { return throwNotSupportedError(); }
  createComment(text: string): any { return throwNotSupportedError(); }
  createTemplate(html: any): HTMLElement { return throwNotSupportedError(); }
  createElement(tagName: any, doc?: any): HTMLElement { return throwNotSupportedError(); }
  createElementNS(ns: string, tagName: string, doc?: any): Element { return throwNotSupportedError(); }
  createTextNode(text: string, doc?: any): Text { return throwNotSupportedError(); }
  createScriptTag(attrName: string, attrValue: string, doc?: any): HTMLElement { return throwNotSupportedError(); }
  createStyleElement(css: string, doc?: any): HTMLStyleElement { return throwNotSupportedError(); }
  createShadowRoot(el: any): any { return throwNotSupportedError(); }
  getShadowRoot(el: any): any { return throwNotSupportedError(); }
  getHost(el: any): any { return throwNotSupportedError(); }
  getDistributedNodes(el: any): Node[] { return throwNotSupportedError(); }
  clone (node: Node): Node { return throwNotSupportedError(); }
  getElementsByClassName(element: any, name: string): HTMLElement[] { return throwNotSupportedError(); }
  getElementsByTagName(element: any, name: string): HTMLElement[] { return throwNotSupportedError(); }
  classList(element: any): any[] { return throwNotSupportedError(); }
  addClass(element: any, className: string): any { return throwNotSupportedError(); }
  removeClass(element: any, className: string): any { return throwNotSupportedError(); }
  hasClass(element: any, className: string): boolean { return throwNotSupportedError(); }
  setStyle(element: any, styleName: string, styleValue: string): any { return throwNotSupportedError(); }
  removeStyle(element: any, styleName: string): any { return throwNotSupportedError(); }
  getStyle(element: any, styleName: string): string { return throwNotSupportedError(); }
  hasStyle(element: any, styleName: string, styleValue?: string): boolean { return throwNotSupportedError(); }
  tagName(element: any): string { return throwNotSupportedError(); }
  attributeMap(element: any): Map<string, string> { return throwNotSupportedError(); }
  hasAttribute(element: any, attribute: string): boolean { return throwNotSupportedError(); }
  hasAttributeNS(element: any, ns: string, attribute: string): boolean { return throwNotSupportedError(); }
  getAttribute(element: any, attribute: string): string | null { return throwNotSupportedError(); }
  getAttributeNS(element: any, ns: string, attribute: string): string { return throwNotSupportedError(); }
  setAttribute(element: any, name: string, value: string): any { return throwNotSupportedError(); }
  setAttributeNS(element: any, ns: string, name: string, value: string): any { return throwNotSupportedError(); }
  removeAttribute(element: any, attribute: string): any { return throwNotSupportedError(); }
  removeAttributeNS(element: any, ns: string, attribute: string): any { return throwNotSupportedError(); }
  templateAwareRoot(el: any): any { return throwNotSupportedError(); }
  createHtmlDocument(): HTMLDocument { return throwNotSupportedError(); }
  getDefaultDocument(): Document { return throwNotSupportedError(); }
  getBoundingClientRect(el: any): any { return throwNotSupportedError(); }
  getTitle(doc: Document): string { return throwNotSupportedError(); }
  setTitle(doc: Document, newTitle: string): any { return throwNotSupportedError(); }
  elementMatches(n: any, selector: string): boolean { return throwNotSupportedError(); }
  isTemplateElement(el: any): boolean { return throwNotSupportedError(); }
  isTextNode(node: any): boolean { return throwNotSupportedError(); }
  isCommentNode(node: any): boolean { return throwNotSupportedError(); }
  isElementNode(node: any): boolean { return throwNotSupportedError(); }
  hasShadowRoot(node: any): boolean { return throwNotSupportedError(); }
  isShadowRoot(node: any): boolean { return throwNotSupportedError(); }
  importIntoDoc(node: Node): Node { return throwNotSupportedError(); }
  adoptNode(node: Node): Node { return throwNotSupportedError(); }
  getHref(element: any): string { return throwNotSupportedError(); }
  getEventKey(event: any): string { return throwNotSupportedError(); }
  resolveAndSetHref(element: any, baseUrl: string, href: string): any { return throwNotSupportedError(); }
  supportsDOMEvents(): boolean { return throwNotSupportedError(); }
  supportsNativeShadowDOM(): boolean { return throwNotSupportedError(); }
  getGlobalEventTarget(doc: Document, target: string): any { return throwNotSupportedError(); }
  getHistory(): History { return throwNotSupportedError(); }
  getLocation(): Location { return throwNotSupportedError(); }
  getBaseHref(doc: Document): string | null { return throwNotSupportedError(); }
  resetBaseElement(): void { return throwNotSupportedError(); }
  getUserAgent(): string { return throwNotSupportedError(); }
  setData(element: any, name: string, value: string): any { return throwNotSupportedError(); }
  getComputedStyle(element: any): any { return throwNotSupportedError(); }
  getData(element: any, name: string): string | null { return throwNotSupportedError(); }
  supportsWebAnimation(): boolean { return throwNotSupportedError(); }
  performanceNow(): number { return throwNotSupportedError(); }
  getAnimationPrefix(): string { return throwNotSupportedError(); }
  getTransitionEnd(): string { return throwNotSupportedError(); }
  supportsAnimation(): boolean { return throwNotSupportedError(); }

  supportsCookies(): boolean { return throwNotSupportedError(); }
  getCookie(name: string): string | null { return throwNotSupportedError(); }
  setCookie(name: string, value: string): any { return throwNotSupportedError(); }
}