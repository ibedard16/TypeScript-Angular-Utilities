export declare var moduleName: string;
export declare var factoryName: string;
export interface IWatcher<TReturnType> {
    action: IAction<TReturnType>;
    event?: string;
}
export interface IAction<TReturnType> {
    (...params: any[]): TReturnType;
}
export interface IUnregisterFunction {
    (): void;
}
export interface IObservableService {
    register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
    register(action: IAction<void>, event?: string): IUnregisterFunction;
    fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
    fire(event?: string, ...params: any[]): void;
}
export declare class ObservableService implements IObservableService {
    private watchers;
    private nextKey;
    register<TReturnType>(action: IAction<TReturnType>, event?: string): IUnregisterFunction;
    fire<TReturnType>(event?: string, ...params: any[]): TReturnType[];
    private unregister(key);
}
export interface IObservableServiceFactory {
    getInstance(): IObservableService;
}
export declare function observableServiceFactory(): IObservableServiceFactory;