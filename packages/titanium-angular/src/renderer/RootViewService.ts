import {
    Injectable,
    InjectionToken
} from '@angular/core';

export const ROOT_VIEW_SERVICE = new InjectionToken<RootViewService>("Root view service");

@Injectable()
export class RootViewService {
    private rootView: any;

    constructor() {
        console.log('new RootViewService');
    }

    getRootView(): any {
        if (!this.rootView) {
            this.rootView = this.createDefaultRootView();
        }
        
        return this.rootView;
    }

    setRootView(rootView: any): void {
        this.rootView = rootView;
    }

    createDefaultRootView(): any {
        return Ti.UI.createWindow();
    }
}