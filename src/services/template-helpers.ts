
export enum ActivityIndicatorStyle {
    Big = Ti.UI.ActivityIndicatorStyle.BIG,
    BigDark = Ti.UI.ActivityIndicatorStyle.BIG_DARK,
    Dark = Ti.UI.ActivityIndicatorStyle.DARK,
    Plain = Ti.UI.ActivityIndicatorStyle.PLAIN,
}

export enum ListAccessoryType {
   None = Titanium.UI.LIST_ACCESSORY_TYPE_NONE,
   Checkmark = Titanium.UI.LIST_ACCESSORY_TYPE_CHECKMARK,
   Detail = Titanium.UI.LIST_ACCESSORY_TYPE_DETAIL,
   Disclosure = Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE
};

export enum ListItemTemplate {
    Default = Titanium.UI.LIST_ITEM_TEMPLATE_DEFAULT,
    Contacts = Titanium.UI.LIST_ITEM_TEMPLATE_CONTACTS,
    Settings = Titanium.UI.LIST_ITEM_TEMPLATE_SETTINGS,
    Subtitle = Titanium.UI.LIST_ITEM_TEMPLATE_SUBTITLE
}

export class LayoutBehaviorType {
    static readonly Fill: string = Titanium.UI.FILL;
    static readonly Size: string = Titanium.UI.SIZE;
}

export enum PickerType {
    CountDownTimer = Titanium.UI.PICKER_TYPE_COUNT_DOWN_TIMER,
    Date = Titanium.UI.PICKER_TYPE_DATE,
    DateAndTime = Titanium.UI.PICKER_TYPE_DATE_AND_TIME,
    Plain = Titanium.UI.PICKER_TYPE_PLAIN,
    Time = Titanium.UI.PICKER_TYPE_TIME
}