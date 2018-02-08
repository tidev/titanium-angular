export interface PresetDialogOptions {
    title: string;
    message: string;
}

export interface PresetDialogInterface {
    show(): Promise<any>;

    
}