// Explicitly require this early, otherwise Angular DI doens't work properly
import 'reflect-metadata';

export * from './platform';
export * from './renderer';
export * from './directives';

export { TitaniumModule } from './TitaniumModule';