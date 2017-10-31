import { platformCore, PlatformRef, createPlatformFactory, StaticProvider } from "@angular/core";

export const platformTitanium: (extraProviders?: StaticProvider[]) => PlatformRef = 
    createPlatformFactory(platformCore, "titanium", []);