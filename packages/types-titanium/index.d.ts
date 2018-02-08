declare module 'titanium' {
    global {
        const Ti: typeof Titanium;
    }
}

/**
 * The global Titanium namespace
 */
declare namespace Titanium {

    /**
     * A container for binary data.
     */
    class Blob {
        /**
         * File object represented by this blob, or null if this blob is not associated with a file.
         */
        readonly file: Titanium.Filesystem.File;

        /**
         * If this blob represents an image, this is the height of the image in pixels.
         */
        readonly height: number;

        /**
         * Length of this blob in bytes.
         */
        readonly length: number;

        /**
         * Mime type of the data in this blob.
         */
        readonly mimeType: string;

        /**
         * If this blob represents a File, this is the file URL that represents it.
         */
        readonly nativePath: string;

        /**
         * Size of the blob in pixels (for image blobs) or bytes (for all other blobs).
         */
        readonly size: number;

        /**
         * UTF-8 string representation of the data in this blob.
         *
         * If this blob represents pure binary data, the value will be null.
         */
        readonly text: string;

        /**
         * If this blob represents an image, this is the width of the image in pixels.
         */
        readonly width: number;
    }

    /**
     * The base type for all Titanium events.
     */
    abstract class Event {
        /**
         * True if the event will try to bubble up if possible.
         */
        bubbles: boolean;

        /**
         * Set to true to stop the event from bubbling.
         */
        cancelBubble: boolean;

        /**
         * Source object that fired the event.
         */
        source: object;

        /**
         * Name of the event fired.
         */
        type: string;
    }

    /**
     * An abstract datatype for specifying a text font.
     */
    interface Font {
        /**
         * Specifies the font family or specific font to use.
         */
        fontFamily?: string;

        /**
         * Font size, in platform-dependent units.
         */
        fontSize?: number | string;

        /**
         * Font style. Valid values are "italic" or "normal".
         */
        fontStyle?: string;

        /**
         * Font weight. Valid values are "bold", "semibold", "normal", "thin",
         * "light" and "ultralight".
         */
        fontWeight?: string;

        /**
         * The text style for the font.
         */
        textStyle?: string;
    }

    /**
     * The base for all Titanium objects.
     */
    abstract class Proxy {
        /**
         * The name of the API that this proxy corresponds to.
         */
        apiName: string;

        /**
         * Indicates if the proxy will bubble an event to its parent.
         */
        bubbleParent: boolean;

        /**
         * The Window or TabGroup whose Activity lifecycle should be triggered on the proxy.
         */
        lifecycleContainer: Titanium.UI.Window | Titanium.UI.TabGroup;

        /**
         * Adds the specified callback as an event listener for the named event.
         * 
         * @param name Name of the event
         * @param callback Callback function to invoke when the event is fired.
         */
        addEventListener(name: string, callback: Function): void;

        /**
         * Removes the specified callback as an event listener for the named event.
         * 
         * @param name Name of the event
         * @param callback Callback function to remove. Must be the same function passed to addEventListener.
         */
        removeEventListener(name: string, callback: Function): void;

        /**
         * Fires a synthesized event to any registered listeners.
         * 
         * @param name Name of the event
         * @param event A dictionary of keys and values to add to the Titanium.Event object sent to the listeners.
         */
        fireEvent(name: string, event: object): void;

        /**
         * Applies the properties to the proxy.
         * 
         * @param props 
         */
        applyProperties(props: object): void;
    }

    namespace Android {

        /**
         * Activity of the active context.
         */
        const currentActivity: Activity;

        /**
         * An action bar is a window feature that identifies the application
         * and user location, and provides user actions and navigation modes.
         */
        class ActionBar extends Proxy {
            hide(): void;
        }

        /**
         * The Titanium binding of an Android Activity.
         */
        class Activity extends Proxy {
            /**
             * The action bar for this activity.
             */
            readonly actionBar: ActionBar;

            /**
             * Callback function called when the Android activity is created.
             */
            onCreate: Function;

            /**
             * Callback function called when the Android activity is started.
             */
            onStart: Function;
        }

        namespace R {
            class anim {
                static readonly accelerate_decelerate_interpolator: number;
                static readonly accelerate_interpolator: number;
                static readonly anticipate_interpolator: number;
                static readonly anticipate_overshoot_interpolator: number;
                static readonly bounce_interpolator: number;
                static readonly cycle_interpolator: number;
                static readonly decelerate_interpolator: number;
                static readonly fade_in: number;
                static readonly fade_out: number;
                static readonly linear_interpolator: number;
                static readonly overshoot_interpolator: number;
                static readonly slide_in_left: number;
                static readonly slide_out_right: number;
            }
        }
    }

    namespace API {
        function info(message: string);
        function debug(message: string);
        function trace(message: string);
        function warn(message: string);
        function error(message: string);
    }

    namespace Filesystem {

        const resourcesDirectory: string;

        /**
         * Represents a path to a file or directory in the device's persistent storage.
         */
        class File extends Proxy {

            /**
             * true if the file is executable.
             */
            readonly executable: boolean;

            /**
             * Set to true if the file is hidden.
             */
            hidden: boolean;

            /**
             * Name of the file.
             */
            readonly name: string;

            /**
             * Native path associated with this file object, as a file URL.
             */
            readonly nativePath: string;

            /**
             * A File object representing the parent directory of the file identified by this object.
             */
            readonly parent: File;

            /**
             * true if the file identified by this object is read-only.
             */
            readonly readonly: string;

            /**
             * Value indicating whether or not to back up to a cloud service
             */
            readonly remoteBackup: boolean;

            /**
             * Size, in bytes, of the file identified by this object.
             */
            readonly size: number;

            /**
             * true if the file identified by this object is a symbolic link.
             */
            readonly symbolicLink: boolean;

            /**
             * true if the file identified by this object is writable.
             */
            readonly writable: boolean;

            /**
             * Appends data to the file identified by this file object.
             * 
             * Returns true if the operation succeeds.
             * 
             * @param data Data to append.
             */
            append(data: string | Blob | File): boolean;

            /**
             * Copies the file identified by this file object to a new path.
             * 
             * Returns true if the copy succeeds.
             * 
             * @param destinationPath Destination path to copy to.
             */
            copy(destinationPath: string): boolean;

            /**
             * Creates a directory at the path identified by this file object.
             * 
             * Returns true if the directory was created successfully.
             */
            createDirectory(): boolean;

            createFile(): boolean;

            createTimestamp(): number;

            deleteDirectory(recursive?: boolean): boolean;

            /**
             * Returns true if the file or directory identified by this file
             * object exists on the device.
             */
            exists(): boolean;

            extension(): string;

            isFile(): boolean;

            isDirectory(): boolean;

            modificationTimestamp(): number;

            move(newpath: string): boolean;

            open(mode: number): FileStream;

            /**
             * Returns the contents of the file identified by this file object
             * as a Blob.
             */
            read(): Titanium.Blob;

            rename(newname: string): boolean;

            resolve(): string;

            spaceAvailable(): number;

            write(data: string | Blob | File, append?: boolean): boolean;
        }

        class FileStream {

        }

        /**
         * Returns a File object representing the file identified by the path
         * arguments.
         * 
         * This method takes a variable number of arguments, where each argument
         * is treated as a path component. All of the arguments are joined
         * together using the platform-specific path separator to make the final
         * path.
         * 
         * @param paths 
         */
        function getFile(...paths: string[]): File;
    }

    namespace Platform {
        const osname: string;
        const displayCaps: DisplayCaps;

        /**
         * Holds information about the display capabilites of the current device
         */
        interface DisplayCaps extends Proxy {
            /**
             * Logical density of the display.
             */
            readonly density: string;

            /**
             * Display density expressed as dots-per-inch.
             */
            readonly dpi: number;

            /**
             * Logical density of the display, as a scaling factor for the
             * Density Independent Pixel (dip) unit.
             */
            readonly logicalDensityFactor: number;

            /**
             * Absolute height of the display in relation to UI orientation.
             * Measured in platform-specific units; pixels on Android and
             * density-independent pixels (dip) on iOS.
             */
            readonly platformHeight: number;

            /**
             * Absolute width of the display in relation to UI orientation.
             * Measured in platform-specific units; pixels on Android and
             * density-independent pixels (dip) on iOS.
             */
            readonly platformWidth: number;

            /**
             * Physical pixels per inch of the display in the X dimension.
             */
            readonly xdpi: number;

            /**
             * Physical pixels per inch of the display in the Y dimension.
             */
            readonly ydpi: number;

        }
    }
   
    namespace UI {

        // Constants
        const LIST_ACCESSORY_TYPE_NONE: number;
        const LIST_ACCESSORY_TYPE_CHECKMARK: number;
        const LIST_ACCESSORY_TYPE_DETAIL: number;
        const LIST_ACCESSORY_TYPE_DISCLOSURE: number;

        const LIST_ITEM_TEMPLATE_DEFAULT: number;
        const LIST_ITEM_TEMPLATE_CONTACTS: number;
        const LIST_ITEM_TEMPLATE_SETTINGS: number;
        const LIST_ITEM_TEMPLATE_SUBTITLE: number;

        const PICKER_TYPE_COUNT_DOWN_TIMER: number;
        const PICKER_TYPE_DATE: number;
        const PICKER_TYPE_DATE_AND_TIME: number;
        const PICKER_TYPE_PLAIN: number;
        const PICKER_TYPE_TIME: number;

        /**
         * FILL behavior for UI layout.
         * 
         * The FILL behavior means the view will grow its size to fill its parent.
         */
        const FILL: string;

        /**
         * SIZE behavior for UI layout.
         * 
         * The SIZE behavior means the view will constrain its size fit its contents.
         */
        const SIZE: string;

        // UI utility interfaces & classes

        /**
         * Ooptions that can be passed to the Titanium.UI.Window.open method.
         */
        interface OpenWindowOptions {

            /**
             * Determines if the window is fullscreen.
             * 
             * Defaults to false.
             */
            fullscreen?: boolean;

            /**
             * Window's top position, in platform-specific units.
             * 
             * Does not work on Android since we only support opening heavyweigth windows.
             */
            top?: number | string;

            /**
             * Window's right position, in platform-specific units.
             * 
             * Does not work on Android since we only support opening heavyweigth windows.
             */
            right?: number | string;

            /**
             * Window's bottom position, in platform-specific units.
             * 
             * Does not work on Android since we only support opening heavyweigth windows.
             */
            bottom?: number | string;

            /**
             * Window's left position, in platform-specific units.
             * 
             * Does not work on Android since we only support opening heavyweigth windows.
             */
            left?: number | string;
            
            /**
             * Window's height, in platform-specific units.
             */
            height?: number | string;

            /**
             * Window's width, in platform-specific units.
             */
            width?: number | string;

            /**
             * Animation resource to run on the activity being opened.
             */
            activityEnterAnimation?: number;

            /**
             * Animation resource to run on the activity being closed.
             */
            activityExitAnimation?: number;

            /**
             * Determines whether to use an animated effect when the window is shown.
             */
            animated?: boolean;
            
            /**
             * Determines whether to open the window modal in front of other windows.
             * 
             * Should not be used on Android, instead use Titanium.UI.AlertDialog or
             * Titanium.UI.OptionDialog and use the androidView property.
             */
            modal?: boolean;

            /**
             * Presentation style of this modal window.
             * 
             * Can be assigned one of the Titanium.UI.iOS.MODAL_PRESENTATION_* constants.
             */
            modalStyle?: number;

            /**
             * Transition style of this modal window.
             * 
             * Can be assigned one of the Titanium.UI.iOS.MODAL_TRANSITION_STYLE_* constants
             */
            modalTransitionStyle?: number;

            /**
             * Transition style of this non-modal window.
             * 
             * Can be assigned on of the Titanium.UI.iOS.AnimationStyle.* constants.
             */
            transition?: number;

            /**
             * For modal windows, hides the nav bar (true) or shows the nav bar (false).
             */
            navBarHidden?: boolean;
        }

        interface CloseWindowOptions {
            
        }

        interface Point {
            x: string | number;
            y: string | number;
        }

        interface Gradient {
            type?: string;
            startPoint?: Point;
            endPoint?: Point;
            colors: Array<string | { color: string, offset: number }>;
            startRadious?: number;
            endRadious?: number;
            backgillStart?: boolean;
            backfillEnd?: boolean;
        }

        interface Matrix2D {
            a: number;
            b: number;
            c: number;
            tx: number;
            ty: number;

            /**
             * Returns a matrix constructed by rotating this matrix.
             */
            rotate(angle: number, toAngle?: number): void;

            /**
             * Returns a 2DMatrix object that specifies a scaling animation from one scale to another.
             */
            scale(sx: number, sy?: number, toSx?: number, toSy?: number): void;

            /**
             * Returns a matrix constructed by applying a translation transform to this matrix.
             */
            translate(tx: number, ty: number);
        }

        interface Matrix3D {
            m11: number;
            m12: number;
            m13: number;
            m14: number;

            m21: number;
            m22: number;
            m23: number;
            m24: number;

            m31: number;
            m32: number;
            m33: number;
            m34: number;

            m41: number;
            m42: number;
            m43: number;
            m44: number;
        }

        /**
         * A set of constants for the styles available for Titanium.UI.ActivityIndicator objects.
         */
        class ActivityIndicatorStyle extends Proxy {
            /**
             * Large white spinning indicator.
             */
            static readonly BIG: number;

            /**
             * Large gray spinning indicator.
             */
            static readonly BIG_DARK: number;

            /**
             * Small gray spinning indicator
             */
            static readonly DARK: number;

            /**
             * Small white spinning indicator (default).
             */
            static readonly PLAIN: number;
        }

        class Animation {

        }

        /**
         * Represents the custom edit action for a ListItem.
         */
        interface RowActionType {
            /**
             * The background color of the row action.
             */
            color?: string;

            /**
             * The identifier of the row action. Only included in the event if
             * previously defined.
             * 
             * @since 6.0.0
             */
            identifier?: string;

            /**
             * The style of the row action.
             */
            style: number;

            /**
             * The title of the row action.
             */
            title: string;
        }

        interface ListDataItem {
            properties: any;
            template?: string | number;
        }

        interface ListItemTemplate {
            childTemplates: ListViewTemplate[];
            events?: object;
            properties?: object;
        }

        interface ListViewTemplate {
            bindId: string;
            childTemplates: ListViewTemplate[];
            events?: object;
            properties?: object;
            type: string
        }

        // UI Views

        /**
         * An activity indicator that lets the user know an action is taking place.
         */
        class ActivityIndicator extends View {
            /**
             * Shows the activity indicator and starts the animation.
             * 
             * @param options
             */
            show(options?: any): void;

            /**
             * Hides the activity indicator and stops the animation.
             * 
             * @param options 
             */
            hide(options?: any): void;
        }

        /**
         * An alert dialog is a modal view that includes an optional title, a
         * message and buttons, positioned in the middle of the display.
         */
        class AlertDialog extends Proxy {}
        class Button extends View {}
        class DashboardView extends View {}
        class DashboardItem extends Proxy {}
        class ImageView extends View {
            image: string | Titanium.Filesystem.File | Titanium.Blob;
        }
        class Label extends View {
            color: string;
            text: string;
            textAlign: number | string
        }

        /**
         * A list view is used to present information, organized in to sections
         * and items, in a vertically-scrolling view.
         */
        class ListView extends View {
            sections: ListSection[];
            templates: { [name: string]: ListItemTemplate };
            appendSection(section: ListSection): void;
            deselectItem(sectionIndex: number, itemIndex: number): void;
            setRefreshControl(refreshControl: RefreshControl): void;
            setTemplates(templates: any): void;
        }

        /**
         * A list section is a container within a list view used to organize list
         * items.
         */
        class ListSection extends Proxy {
            /**
             * Title of this section footer.
             */
            footerTitle: string;

            /**
             * View to use for this section footer.
             */
            footerView: Titanium.UI.View;

            /**
             * Title of this section header.
             */
            headerTitle: string;

            /**
             * View to use for this section header.
             */
            headerView: Titanium.UI.View;

            /**
             * Items of this list section.
             */
            items: ListDataItem[];

            /**
             * Returns the item entry from the list view at the specified index.
             * 
             * @param index Index of where to retrieve an item.
             */
            getItemAt(index: number): ListDataItem;

            /**
             * Sets the value of the items property.
             * 
             * @param items New value for the property.
             */
            setItems(items: ListDataItem[]): void;

            /**
             * Updates an item at the specified index.
             * 
             * @param index Index of where to update the item.
             * @param item List item to update.
             * @param animation Animation properties. (iOS only.)
             */
            updateItemAt(index: number, item: ListDataItem, animation?: any): void;
        }

        class ListItem extends Proxy {
            title: string;
            subttitle: string;
            acessoryType: number;
        }

        class OptionDialog extends Proxy { }

        /**
         * A control used to select one or more fixed values.
         */
        class Picker extends View {
            /**
             * Adds rows or columns to the picker.
             * 
             * Once you use this method to add rows and columns to a picker, you
             * cannot remove or manipulate them. When this method is used to add
             * a row or set of rows, a single-column picker is created.
             * 
             * @param data A row, set of rows, a column of rows or a set of columns of rows.
             */
            add(data: Titanium.UI.PickerRow | Array<Titanium.UI.PickerRow> | Titanium.UI.PickerColumn | Array<Titanium.UI.Picker>): void
            
            /**
             * Shows data picker as a modal dialog.
             * 
             * @param options Date picker modal dialog options.
             */
            showDatePickerDialog(options: { callback: Function, okButtonTitle?: string, title?: string, value?: Date });

            /**
             * Shows time picker as a modal dialog.
             * 
             * @param options Time picker modal dialog options.
             */
            showTimePickerDialog(options: { callback: Function, format24?: boolean, okButtonTitle?: string, title?: string, value?: Date });
        }

        class PickerColumn extends View {
            addRow(row: Titanium.UI.PickerRow): void;
        }
        class PickerRow extends View { }
        class ProgressBar extends View { }
        class RefreshControl extends View { }
        class ScrollableView extends View {
            currentPage: number;
            setViews(views: any[]): void;
        }
        class ScrollView extends View { }
        class SearchBar extends View { }
        class Slider extends View { }
        class Switch extends View { }

        class Tab extends View {
            setWindow(window: Window): void;

            /**
             * Opens a new window.
             *
             * On iOS, the new window is opened as the top window in the tab's
             * window stack. On Android, the new window is opened as a new
             * heavyweight window, obscuring the tab group.
             */
            open(window: Window, options?: OpenWindowOptions): void;

            /**
             * Closes the top-level window for this tab.
             * 
             * On iOS, this method should be used when closing a window opened
             * from a tab, to correctly maintain the iOS tab group's navigation
             * state. Note that the window to be closed must be passed in as a
             * parameter.
             * 
             * On Android, this method does not take a window parameter.
             */
            close(window?: Window, options?: CloseWindowOptions): void;
        }

        class TabGroup extends View {
            activeTab: Tab;
            addTab(tab: Tab): void;
            /**
             * Opens the tab group and makes it visible.
             */
            open(): void;
        }

        class TextArea extends View { }
        class TextField extends View { }

        /**
         * A toolbar, which can contain buttons and certain other controls.
         */
        class Toolbar extends View {
            /**
             * An array of buttons (or other widgets) contained in the toolbar.
             */
            items: Titanium.UI.View[];
        }
        
        class WebView extends View { }

        /**
         * The Window is an empty drawing surface or container and acts as a root view.
         */
        class Window extends View {
            activity: Titanium.Android.Activity;
            open(options?: OpenWindowOptions): void;
            close(): void;
        }

        /**
         * An empty drawing surface or container and the base type for all UI
         * widgets.
         */
        class View extends Proxy {

            backgroundGradient: Gradient;

            /**
             * Array of this view's child views.
             */
            readonly children: Array<Titanium.UI.View>;

            transform: Titanium.UI.Matrix2D | Titanium.UI.Matrix3D;

            /**
             * Animates this view.
             * 
             * @param animation Either a dictionary of animation properties or an Animation object.
             * @param callback Function to be invoked upon completion of the animation.
             */
            animate(animation: Animation, callback?: Function): void;

            /**
             * Adds a child to this view's hierarchy.
             * 
             * @param view 
             */
            add(view: Titanium.UI.View | Array<Titanium.UI.View>): void;

            /**
             * Hides this view.
             * 
             * @param options Animation options for Android
             */
            hide(options?: any): void;

            /**
             * Inserts a view at the specified position in the children array.
             * 
             * @param params
             */
            insertAt(params: { view: Titanium.UI.View, position: number }): void;

            /**
             * Makes this view visible.
             * 
             * @param options nimation options for Android
             */
            show(options?: any): void;
        }
        
        // Factory functions

        function create2DMatrix(options?: any): Titanium.UI.Matrix2D;
        function create3DMatrix(options?: any): Titanium.UI.Matrix3D;
        function createAnimation(options?: any): Titanium.UI.Animation;
        function createActivityIndicator(options?: any): ActivityIndicator;
        function createAlertDialog(options?: any): AlertDialog;
        function createButton(options?: any): Button;
        function createDashboardView(options?: any): DashboardView;
        function createDashboardItem(options?: any): DashboardItem;
        function createImageView(options?: any): ImageView;
        function createLabel(options?: any): Label;
        function createListView(options?: any): ListView;
        function createListSection(options?: any): ListSection;
        function createOptionDialog(options?: any): OptionDialog;
        function createPicker(options?: any): Picker;
        function createPickerColumn(options?: any): PickerColumn;
        function createPickerRow(options?: any): PickerRow;
        function createProgressBar(options?: any): ProgressBar;
        function createRefreshControl(options?: any): RefreshControl;
        function createScrollableView(options?: any): ScrollableView;
        function createScrollView(options?: any): ScrollView;
        function createSearchBar(options?: any): SearchBar;
        function createSlider(options?: any): Slider;
        function createSwitch(options?: any): Switch;
        function createTab(options?: any): Tab;
        function createTabGroup(options?: any): TabGroup;
        function createTextArea(options?: any): TextArea;
        function createTextField(options?: any): TextField;
        function createToolbar(options?: any): Toolbar;
        function createWebView(options?: any): WebView;
        function createWindow(options?: any): Window;
        function createView(options?: any): View;

        namespace Android {

            // Android UI views
            
            /**
             * An elevated view with rounded corners.
             * 
             * CardView provides a layout container with rounded corners and a
             * shadow indicating the view is elevated.
             */
            class CardView extends View {

            }

            // Android factory functions
            function createCardView(options: any): CardView;
        }

        namespace iOS {

            // iOS constants
            const BLUR_EFFECT_STYLE_EXTRA_LIGHT: number;
            const BLUR_EFFECT_STYLE_LIGHT: number;
            const BLUR_EFFECT_STYLE_DARK: number;

            // iOS UI utility interfaces & classes

            namespace AnimationStyle {
                const NONE: number
                const FLIP_FROM_LEFT: number
                const FLIP_FROM_RIGHT: number
                const CURL_UP: number
                const CURL_DOWN: number
                const CROSS_DISSOLVE: number
                const FLIP_FROM_TOP: number
                const FLIP_FROM_BOTTOM: number;
            }

            interface BarItem {
                accessibilityLabel: string;
                enabled: boolean,
                image: string | Titanium.Blob | Titanium.Filesystem.File;
                title: string,
                width: number
            }

            // iOS UI views

            class BlurView extends View {
                setEffect(effect: number);
            }

            class TabbedBar extends View {
                labels: string[] | BarItem[]
            }

            // iOS factory functions

            function createBlurView(options: any): BlurView;
            function createTabbedBar(options: any): TabbedBar;
        }

    }

}