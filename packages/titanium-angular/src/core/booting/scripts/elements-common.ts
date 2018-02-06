import { TitaniumElementRegistry } from '../../../vdom';
import { TitaniumPlatformRef } from '../../TitaniumPlatformRef';

export function initializeCommonTitaniumElements(platform: TitaniumPlatformRef) {
    const titaniumElementRegistry = platform.injector.get(TitaniumElementRegistry);
    titaniumElementRegistry.registerElement('ActivityIndicator', () => Ti.UI.createActivityIndicator, { typeName: 'Ti.UI.ActivityIndicator' });
    titaniumElementRegistry.registerElement('AlertDialog', () => Ti.UI.createAlertDialog, { typeName: 'Ti.UI.AlertDialog' });
    titaniumElementRegistry.registerElement('Button', () => Ti.UI.createButton, { typeName: 'Ti.UI.Button' });
    titaniumElementRegistry.registerElement('DashboardView', () => Ti.UI.createDashboardView, { typeName: 'Ti.UI.DashboardView' });
    titaniumElementRegistry.registerElement('DashboardItem', () => Ti.UI.createDashboardItem, { typeName: 'Ti.UI.DashboardItem' });
    titaniumElementRegistry.registerElement('DetachedView', () => Ti.UI.createView, { skipAddToDom: true, typeName: 'Ti.UI.View' });
    titaniumElementRegistry.registerElement('ImageView', () => Ti.UI.createImageView, { typeName: 'Ti.UI.ImageView' });
    titaniumElementRegistry.registerElement('Label', () => Ti.UI.createLabel, { typeName: 'Ti.UI.Label' });
    titaniumElementRegistry.registerElement('ListView', () => Ti.UI.createListView, { skipAddToDom: true, typeName: 'Ti.UI.ListView' });
    titaniumElementRegistry.registerElement('ListSection', () => Ti.UI.createListSection, { skipAddToDom: true, typeName: 'Ti.UI.ListSection' });
    titaniumElementRegistry.registerElement('OptionDialog', () => Ti.UI.createOptionDialog, { typeName: 'Ti.UI.OptionDialog' });
    titaniumElementRegistry.registerElement('Picker', () => Ti.UI.createPicker, { typeName: 'Ti.UI.Picker' });
    titaniumElementRegistry.registerElement('PickerColumn', () => Ti.UI.createPickerColumn, { skipAddToDom: true, typeName: 'Ti.UI.PickerColumn' });
    titaniumElementRegistry.registerElement('PickerRow', () => Ti.UI.createPickerRow, { skipAddToDom: true, typeName: 'Ti.UI.PickerRow' });
    titaniumElementRegistry.registerElement('ProgressBar', () => Ti.UI.createProgressBar, { typeName: 'Ti.UI.ProgressBar' });
    titaniumElementRegistry.registerElement('RefreshControl', () => Ti.UI.createRefreshControl, { skipAddToDom: true, typeName: 'Ti.UI.RefreshControl' });
    titaniumElementRegistry.registerElement('ScrollableView', () => Ti.UI.createScrollableView, { typeName: 'Ti.UI.ScrollableView' });
    titaniumElementRegistry.registerElement('ScrollView', () => Ti.UI.createScrollView, { typeName: 'Ti.UI.ScrollView' });
    titaniumElementRegistry.registerElement('SearchBar', () => Ti.UI.createSearchBar, { typeName: 'Ti.UI.SearchBar' });
    titaniumElementRegistry.registerElement('Slider', () => Ti.UI.createSlider, { typeName: 'Ti.UI.Slider' });
    titaniumElementRegistry.registerElement('Switch', () => Ti.UI.createSwitch, { typeName: 'Ti.UI.Switch' });
    titaniumElementRegistry.registerElement('Tab', () => Ti.UI.createTab, { skipAddToDom: true, typeName: 'Ti.UI.Tab' });
    titaniumElementRegistry.registerElement('TabGroup', () => Ti.UI.createTabGroup, { skipAddToDom: true, typeName: 'Ti.UI.TabGroup' });
    titaniumElementRegistry.registerElement('TextArea', () => Ti.UI.createTextArea, { typeName: 'Ti.UI.TextArea' });
    titaniumElementRegistry.registerElement('TextField', () => Ti.UI.createTextField, { typeName: 'Ti.UI.TextField' });
    titaniumElementRegistry.registerElement('Toolbar', () => Ti.UI.createToolbar, { typeName: 'Ti.UI.Toolbar' });
    titaniumElementRegistry.registerElement('TextField', () => Ti.UI.createTextField, { typeName: 'Ti.UI.TextField' });
    titaniumElementRegistry.registerElement('View', () => Ti.UI.createView, { typeName: 'Ti.UI.View' });
    titaniumElementRegistry.registerElement('WebView', () => Ti.UI.createWebView, { typeName: 'Ti.UI.WebView' });
    titaniumElementRegistry.registerElement('Window', () => Ti.UI.createWindow, { skipAddToDom: true, typeName: 'Ti.UI.Window' });
}