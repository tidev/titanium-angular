declare module 'titanium' {
    global {
        const Ti: typeof Titanium;
    }
}

declare namespace Titanium {

    namespace API {
        function info(message: string);
        function debug(message: string);
        function trace(message: string);
        function warn(message: string);
        function error(message: string);
    }

    namespace Filesystem {
        class File {
            exists()
            read()
        }
        function getFile(url: string): File;
    }

    namespace Platform {
        const osname: string;
    }
   
    namespace UI {

        // Constants
        const LIST_ACCESSORY_TYPE_NONE = 0;
        const LIST_ACCESSORY_TYPE_CHECKMARK = 1;
        const LIST_ACCESSORY_TYPE_DETAIL = 2;
        const LIST_ACCESSORY_TYPE_DISCLOSURE = 3;

        // UI utility interfaces

        interface OpenWindowOptions {

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

        // UI Views

        class ActivityIndicator {}

        /**
         * An alert dialog is a modal view that includes an optional title, a
         * message and buttons, positioned in the middle of the display.
         */
        class AlertDialog {}
        class Button {}
        class DashboardView {}
        class DashboardItem {}
        class ImageView {}
        class Label { }

        /**
         * A list view is used to present information, organized in to sections
         * and items, in a vertically-scrolling view.
         */
        class ListView {
            sections: ListSection[];
            appendSection(section: ListSection): void;
            setTemplates(templates: any): void;
            setRefreshControl(refreshControl: RefreshControl): void;
        }

        /**
         * A list section is a container within a list view used to organize list
         * items.
         */
        class ListSection {
            items: ListItem[];
            getItemAt(index: number);
            updateItemAt(index: number, item: ListItem);
        }

        class ListItem {
            title: string;
            subttitle: string;
            acessoryType: number;
        }
        class OptionDialog { }
        class Picker { }
        class PickerColumn { }
        class PickerRow { }
        class ProgressBar { }
        class RefreshControl { }
        class ScrollableView { }
        class ScrollView { }
        class SearchBar { }
        class Slider { }
        class Switch { }

        class Tab {
            setWindow(window: Window): void;

            /**
             * Opens a new window.
             *
             * On iOS, the new window is opened as the top window in the tab's
             * window stack. On Android, the new window is opened as a new
             * heavyweight window, obscuring the tab group.
             */
            open(window: Window, options?: OpenWindowOptions);
        }

        class TabGroup {
            addTab(tab: Tab): void;
            open(): void;
        }

        class TextArea { }
        class TextField { }
        class Toolbar { }
        class WebView { }

        class Window extends View {
            open(options: OpenWindowOptions)
        }

        class View {
            backgroundGradient: Gradient;
            transform: Titanium.UI.Matrix2D | Titanium.UI.Matrix3D;
        }
        
        // Factory functions

        function create2DMatrix(options: any): Titanium.UI.Matrix2D;
        function createActivityIndicator(options: any): ActivityIndicator;
        function createAlertDialog(options: any): AlertDialog;
        function createButton(options: any): Button;
        function createDashboardView(options: any): DashboardView;
        function createDashboardItem(options: any): DashboardItem;
        function createImageView(options: any): ImageView;
        function createLabel(options: any): Label;
        function createListView(options: any): ListView;
        function createListSection(options: any): ListSection;
        function createOptionDialog(options: any): OptionDialog;
        function createPicker(options: any): Picker;
        function createPickerColumn(options: any): PickerColumn;
        function createPickerRow(options: any): PickerRow;
        function createProgressBar(options: any): ProgressBar;
        function createRefreshControl(options: any): RefreshControl;
        function createScrollableView(options: any): ScrollableView;
        function createScrollView(options: any): ScrollView;
        function createSearchBar(options: any): SearchBar;
        function createSlider(options: any): Slider;
        function createSwitch(options: any): Switch;
        function createTab(options: any): Tab;
        function createTabGroup(options: any): TabGroup;
        function createTextArea(options: any): TextArea;
        function createTextField(options: any): TextField;
        function createToolbar(options: any): Toolbar;
        function createWebView(options: any): WebView;
        function createWindow(options: any): Window;
        function createView(options: any): View;

    }

}