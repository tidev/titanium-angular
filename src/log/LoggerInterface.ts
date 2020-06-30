export interface LoggerInterface {
    info(...message: any): void;
    debug(...message: any): void;
    trace(...message: any): void;
    warn(...message: any): void;
    error(...message: any): void;
}