'use strict';

import * as angular from 'angular';

import { IArrayUtility, serviceName as arrayServiceName, moduleName as arrayModuleName } from '../../array/array.service';

import { IBaseDataService, BaseDataService, IBaseDomainObject, ITransformFunction } from '../baseDataService/baseData.service';
import { IBaseParentDataService, BaseParentDataService } from '../baseParentDataService/baseParentData.service';
import { IBaseSingletonDataService, BaseSingletonDataService } from '../baseSingletonDataService/baseSingletonData.service';
import { IBaseParentSingletonDataService, BaseParentSingletonDataService } from '../baseParentSingletonDataService/baseParentSingletonData.service';

export var moduleName: string = 'rl.utilities.services.baseResourceBuilder';
export var serviceName: string = 'baseResourceBuilder';

export interface IBaseResourceParams<TDataType extends IBaseDomainObject> {
	/**
	* Url to hit with getList and create
	* - extended with /id for getDetail, update, and delete
	*/
	endpoint?: string;

	/**
	* Example data set to be used for testing and prototyping instead of hitting the endpoint
	*/
	mockData?: TDataType[];

	/**
	* Flag for specifying if the data service should use the mock data or hit the actual endpoint
	* defaults to true if endpoint is not defined
	*/
	useMock?: boolean;

	/**
	* Processes data coming back from the server
	*/
	transform?: ITransformFunction<TDataType>;
}

export interface IParentResourceParams<TDataType extends IBaseDomainObject, TResourceDictionaryType> extends IBaseResourceParams<TDataType> {
	/**
	* Function that builds a dictionary of child resources available through childContracts(id)
	*/
	resourceDictionaryBuilder?: { (baseEndpoint: string): TResourceDictionaryType };
}

export interface ISingletonResourceParams<TDataType> {
	/**
	* Url to hit with get and update
	*/
	endpoint?: string;

	/**
	* Example object to be used for testing and prototyping instead of hitting the endpoint
	*/
	mockData?: TDataType;

	/**
	* Flag for specifying if the data service should use the mock data or hit the actual endpoint
	* defaults to true if endpoint is not defined
	*/
	useMock?: boolean;

	/**
	* Processes data coming back from the server
	*/
	transform?: ITransformFunction<TDataType>;
}

export interface IParentSingletonResourceParams<TDataType, TResourceDictionaryType> extends ISingletonResourceParams<TDataType> {
	/**
	* Function that builds a dictionary of child resources available through childContracts(id)
	*/
	resourceDictionaryBuilder?: { (baseEndpoint: string): TResourceDictionaryType };
}

export interface IBaseResourceBuilder {
	/**
	* Create a standard resource with getList, getDetail, create, update, delete
	*/
	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, TSearchParams>;
	/**
	* Create a standard resource with getList, getDetail, create, update, delete
	*/
	createResource<TDataType extends IBaseDomainObject>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, void>;

	/**
	* Create a parent resource that extends the standard with child resources available through childContracts(id)
	*/
	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType>;
	/**
	* Create a parent resource that extends the standard with child resources available through childContracts(id)
	*/
	createParentResource<TDataType extends IBaseDomainObject, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, void, TResourceDictionaryType>;

	/**
	* Create a singleton resource with get and update
	*/
	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): IBaseSingletonDataService<TDataType>;

	/**
	* Create a parent singleton resource that extends the singleton with child resources available through childContracts(id)
	*/
	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType>;
}

export class BaseResourceBuilder implements IBaseResourceBuilder {
	static $inject: string[] = ['$http', '$q', arrayServiceName];
	constructor(private $http: angular.IHttpService
			, private $q: angular.IQService
			, private array: IArrayUtility) { }

	createResource<TDataType extends IBaseDomainObject, TSearchParams>(options: IBaseResourceParams<TDataType>): IBaseDataService<TDataType, TSearchParams> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.transform, options.useMock);
	}

	createParentResource<TDataType extends IBaseDomainObject, TSearchParams, TResourceDictionaryType>
		(options: IParentResourceParams<TDataType, TResourceDictionaryType>): IBaseParentDataService<TDataType, TSearchParams, TResourceDictionaryType> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseParentDataService(this.$http, this.$q, this.array, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock);
	}

	createSingletonResource<TDataType>(options: ISingletonResourceParams<TDataType>): IBaseSingletonDataService<TDataType> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.transform, options.useMock);
	}

	createParentSingletonResource<TDataType, TResourceDictionaryType>
		(options: IParentSingletonResourceParams<TDataType, TResourceDictionaryType>): IBaseParentSingletonDataService<TDataType, TResourceDictionaryType> {
		options.useMock = options.endpoint == null ? true : options.useMock;
		return new BaseParentSingletonDataService(this.$http, this.$q, options.endpoint, options.mockData, options.resourceDictionaryBuilder, options.transform, options.useMock);
	}
}

angular.module(moduleName, [arrayModuleName])
	.service(serviceName, BaseResourceBuilder);