import * as ng from 'angular';
import { INotificationService } from '../notification/notification.service';
export declare var moduleName: string;
export declare var serviceName: string;
export declare enum HttpStatusCode {
    unauthorized = 401,
    forbidden = 403,
    invalidUrl = 404,
    timeout = 408,
    internalServerError = 500,
}
export interface IRejection {
    status: HttpStatusCode;
}
export interface IErrorHandlerService {
    httpResponseError(rejection: IRejection): void;
}
export interface IErrorMessages {
    forbiddenError: string;
    invalidUrlError: string;
    timeoutError: string;
    internalServerError: string;
    defaultError: string;
}
export declare class ErrorHandlerService implements IErrorHandlerService {
    private $window;
    private notification;
    private loginUrl;
    private errorMessages;
    constructor($window: ng.IWindowService, notification: INotificationService, loginUrl: string, errorMessages: IErrorMessages);
    httpResponseError(rejection: IRejection): void;
    private loggedOutError();
    private insufficientPermissionsError();
    private invalidUrlError();
    private timeoutError();
    private systemError();
}
export interface IErrorHandlerServiceProvider extends angular.IServiceProvider {
    loginUrl: string;
    errorMessages: IErrorMessages;
    $get($window: ng.IWindowService, notification: INotificationService): IErrorHandlerService;
}