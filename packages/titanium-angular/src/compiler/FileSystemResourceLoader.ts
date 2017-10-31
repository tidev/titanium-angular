import { Injectable } from "@angular/core";
import { ResourceLoader } from "@angular/compiler";

@Injectable()
export class FileSystemResourceLoader extends ResourceLoader {

    get(url: string): Promise<string> {
        var file = Ti.Filesystem.getFile(url);
        if (!file.exists()) {
            throw new Error(`Could not find file ${url}`);
        }
        var blob = file.read();
        return Promise.resolve(blob.text);
    }
    
}
