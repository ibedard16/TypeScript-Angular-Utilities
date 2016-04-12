'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';
import * as Rx from 'rx';

import {
	moduleName as objectModuleName,
	serviceName as objectServiceName,
	IObjectUtility,
} from '../object/object.service';

import {
	moduleName as stringModuleName,
	serviceName as stringServiceName,
	IStringUtilityService,
} from '../string/string.service';

import { ISerializableFilter, SerializableFilter, IValueChangeCallback } from '../../filters/filter';

export var moduleName: string = 'rl.utilities.services.genericSearchFilter';
export var factoryName: string = 'genericSearchFilterFactory';
export var filterName: string = 'search';

export interface IGenericSearchFilter extends ISerializableFilter<string> {
	type: string;
	searchText: string;
	minSearchLength: number;
	caseSensitive: boolean;
	filter<TItemType>(item: TItemType): boolean;
}

export class GenericSearchFilter extends SerializableFilter<string> implements IGenericSearchFilter {
	type: string = filterName;
	minSearchLength: number = 1;
	caseSensitive: boolean = false;
	private _searchText: string;

	constructor(protected object: IObjectUtility
			, private string: IStringUtilityService
			, private tokenized: boolean) {
		super();
	}

	get searchText(): string {
		return this._searchText;
	}

	set searchText(value: string) {
		this._searchText = value;
		this.onChange(false);
	}

	serialize(): string {
		return this.searchText != null && this.searchText.length >= this.minSearchLength
			? this.searchText
			: null;
	}

	filter<TItemType>(item: TItemType): boolean {
		if (this.object.isNullOrEmpty(this.searchText) || this.searchText.length < this.minSearchLength) {
			return true;
		}

		return this.searchObject(item, this.searchText, this.caseSensitive);
	}

	private searchObject<TItemType>(item: TItemType, search: string, caseSensitive: boolean): boolean {
		if (_.isObject(item)) {
			var values: any = _.values(item);
			return _.some(values, (value: any): boolean => { return this.searchObject(value, search, caseSensitive); });
		} else {
			var dataString: string = this.object.toString(item);

			if (!caseSensitive) {
				search = search.toLowerCase();
				dataString = dataString.toLowerCase();
			}

			return this.string.contains(dataString, search);
		}
	}
}

export interface IGenericSearchFilterFactory {
	getInstance(tokenized?: boolean): IGenericSearchFilter;
}

genericSearchFilterFactory.$inject = [objectServiceName, stringServiceName];
function genericSearchFilterFactory(object: IObjectUtility,
	stringUtility: IStringUtilityService): IGenericSearchFilterFactory {

	'use strict';

	return {
		getInstance(tokenized?: boolean): IGenericSearchFilter {
			return new GenericSearchFilter(object, stringUtility, tokenized);
		}
	};
}

angular.module(moduleName, [objectModuleName, stringModuleName])
	.factory(factoryName, genericSearchFilterFactory);
