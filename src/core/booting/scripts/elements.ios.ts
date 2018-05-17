import { TitaniumElementRegistry } from '../../../vdom/index';
import { TitaniumPlatformRef } from '../../TitaniumPlatformRef';
import { initializeCommonTitaniumElements } from './elements-common';

export function initializeTitaniumElements(platform: TitaniumPlatformRef) {
    initializeCommonTitaniumElements(platform);

    const elementRegistry = platform.injector.get(TitaniumElementRegistry);
    elementRegistry.registerElement('BlurView', () => Ti.UI.iOS.createBlurView, { typeName: 'Ti.UI.iOS.BlurView' });
    elementRegistry.registerElement('NavigationWindow', () => Ti.UI.iOS.createNavigationWindow, { typeName: 'Ti.UI.iOS.NavigationWindow', skipAddToDom: true });
    elementRegistry.registerElement('TabbedBar', () => Ti.UI.iOS.createTabbedBar, { typeName: 'Ti.UI.iOS.TabbedBar' });
}