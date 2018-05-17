import { TitaniumElementRegistry } from '../../../vdom/index';
import { TitaniumPlatformRef } from '../../TitaniumPlatformRef';
import { initializeCommonTitaniumElements } from './elements-common';

export function initializeTitaniumElements(platform: TitaniumPlatformRef) {
    initializeCommonTitaniumElements(platform);

    const elementRegistry = platform.injector.get(TitaniumElementRegistry);
    elementRegistry.registerElement('CardView', () => Ti.UI.Android.createCardView, { typeName: 'Ti.UI.Android.CardView' });
}