"bundle";
System.registerDynamic("utilities/behaviors/stopEventPropagation/stopEventPropagation", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var StopEventPropagation = (function() {
    function StopEventPropagation(element) {
      this.element = element;
    }
    StopEventPropagation.prototype.ngAfterContentInit = function() {
      this.element.nativeElement.on(this.event, function(event) {
        event.preventDefault();
        event.stopPropagation();
      });
    };
    __decorate([core_1.Input('rl-stop-event-propagation'), __metadata('design:type', String)], StopEventPropagation.prototype, "event", void 0);
    StopEventPropagation = __decorate([core_1.Directive({selector: '[rl-stop-event-propagation]'}), __metadata('design:paramtypes', [core_1.ElementRef])], StopEventPropagation);
    return StopEventPropagation;
  }());
  exports.StopEventPropagation = StopEventPropagation;
  return module.exports;
});

System.registerDynamic("utilities/behaviors/behaviors.module", ["./stopEventPropagation/stopEventPropagation"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var stopEventPropagation = $__require('./stopEventPropagation/stopEventPropagation');
  exports.stopEventPropagation = stopEventPropagation;
  return module.exports;
});

System.registerDynamic("utilities/filters/filters.module", ["./isEmpty/isEmpty", "./truncate/truncate", "./filter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var isEmpty = $__require('./isEmpty/isEmpty');
  exports.isEmpty = isEmpty;
  var truncate = $__require('./truncate/truncate');
  exports.truncate = truncate;
  __export($__require('./filter'));
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/contractLibrary/dataServiceMocks", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    "use strict";
  })();
  return _retrieveGlobal();
});

System.registerDynamic("utilities/services/dataContracts/contractLibrary/contractLibrary", ["lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var ContractLibrary = (function() {
    function ContractLibrary(builder, baseEndpoint) {
      this.builder = builder;
      this.baseEndpoint = baseEndpoint;
    }
    ContractLibrary.prototype.createResource = function(options) {
      var resource = this.builder.createResource(options);
      resource.url = this.baseEndpoint + resource.endpoint;
      return resource;
    };
    ContractLibrary.prototype.createResourceView = function(options) {
      var resource = this.builder.createResourceView(options);
      resource.url = this.baseEndpoint + resource.endpoint;
      return resource;
    };
    ContractLibrary.prototype.createParentResource = function(options) {
      var resource = this.builder.createParentResource(options);
      resource.url = this.baseEndpoint + resource.endpoint;
      return resource;
    };
    ContractLibrary.prototype.createParentResourceView = function(options) {
      var resource = this.builder.createParentResourceView(options);
      resource.url = this.baseEndpoint + resource.endpoint;
      return resource;
    };
    ContractLibrary.prototype.createSingletonResource = function(options) {
      var resource = this.builder.createSingletonResource(options);
      resource.url = this.baseEndpoint + resource.endpoint;
      return resource;
    };
    ContractLibrary.prototype.createParentSingletonResource = function(options) {
      var resource = this.builder.createParentSingletonResource(options);
      resource.url = this.baseEndpoint + resource.endpoint;
      return resource;
    };
    ContractLibrary.prototype.flush = function() {};
    ContractLibrary.prototype.mockGet = function(resource, data) {
      return this.baseMockGet(resource, 'get', data);
    };
    ContractLibrary.prototype.mockGetList = function(resource, data) {
      return this.baseMockGet(resource, 'getList', data);
    };
    ContractLibrary.prototype.mockGetDetail = function(resource, data) {
      return this.baseMockGet(resource, 'getDetail', data);
    };
    ContractLibrary.prototype.mockChild = function(parent, mockCallback) {
      var getChildren = parent.childContracts.bind(parent);
      parent.childContracts = function(id) {
        var children = getChildren(id);
        mockCallback(children);
        return children;
      };
    };
    ContractLibrary.prototype.createMock = function(resource) {
      var _this = this;
      var dataService = this.builder.createResource({});
      dataService.mockGetList = function(data) {
        return _this.baseMockGet(dataService, 'getList', data);
      };
      dataService.mockGetDetail = function(data) {
        return _this.baseMockGet(dataService, 'get', data);
      };
      dataService.mockUpdate = function(dataTransform) {
        return _this.baseMockSave(dataService, 'update', dataTransform);
      };
      dataService.mockCreate = function(dataTransform) {
        return _this.baseMockSave(dataService, 'create', dataTransform);
      };
      dataService = this.updateResource(dataService, resource);
      return dataService;
    };
    ContractLibrary.prototype.createMockParent = function(resource) {
      var _this = this;
      var getChildren = resource != null ? resource.resourceDictionaryBuilder : function() {
        return {};
      };
      var dataService = this.builder.createParentResource({resourceDictionaryBuilder: getChildren});
      dataService.mockGetList = function(data) {
        return _this.baseMockGet(dataService, 'getList', data);
      };
      dataService.mockGetDetail = function(data) {
        return _this.baseMockGet(dataService, 'get', data);
      };
      dataService.mockChild = function(mockCallback) {
        return _this.mockChild(dataService, mockCallback);
      };
      dataService.mockUpdate = function(dataTransform) {
        return _this.baseMockSave(dataService, 'update', dataTransform);
      };
      dataService.mockCreate = function(dataTransform) {
        return _this.baseMockSave(dataService, 'create', dataTransform);
      };
      dataService = this.updateResource(dataService, resource);
      return dataService;
    };
    ContractLibrary.prototype.createMockSingleton = function(resource) {
      var _this = this;
      var dataService = this.builder.createSingletonResource({});
      dataService.mockGet = function(data) {
        return _this.baseMockGet(dataService, 'get', data);
      };
      dataService.mockUpdate = function(dataTransform) {
        return _this.baseMockSave(dataService, 'update', dataTransform);
      };
      dataService = this.updateResource(dataService, resource);
      return dataService;
    };
    ContractLibrary.prototype.updateResource = function(dataService, resource) {
      if (resource != null) {
        dataService = _.extend(resource, dataService);
      }
      return dataService;
    };
    ContractLibrary.prototype.baseMockGet = function(resource, actionName, data) {
      var func = this.sinon.spy(function() {
        return Promise.resolve(data);
      });
      resource[actionName] = func;
      return func;
    };
    ContractLibrary.prototype.baseMockSave = function(resource, actionName, dataTransform) {
      var func = this.sinon.spy(function(data) {
        if (dataTransform) {
          data = dataTransform(data);
        }
        return Promise.resolve(data);
      });
      resource[actionName] = func;
      return func;
    };
    Object.defineProperty(ContractLibrary.prototype, "sinon", {
      get: function() {
        return sinon || {spy: function(func) {
            return func;
          }};
      },
      enumerable: true,
      configurable: true
    });
    return ContractLibrary;
  }());
  exports.ContractLibrary = ContractLibrary;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/dataContracts.module", ["./resourceBuilder/resourceBuilder.service", "./dataService/data.service", "./singletonDataService/singletonData.service", "./converters/converters", "./contractLibrary/dataServiceMocks", "./contractLibrary/contractLibrary", "./dataService/view/dataServiceView", "./dataService/parent/parentData.service", "./singletonDataService/parent/parentSingletonData.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var resourceBuilder_service_1 = $__require('./resourceBuilder/resourceBuilder.service');
  var data_service_1 = $__require('./dataService/data.service');
  var singletonData_service_1 = $__require('./singletonDataService/singletonData.service');
  var converters = $__require('./converters/converters');
  exports.converters = converters;
  var mocks = $__require('./contractLibrary/dataServiceMocks');
  exports.mocks = mocks;
  __export($__require('./contractLibrary/contractLibrary'));
  __export($__require('./dataService/data.service'));
  __export($__require('./dataService/view/dataServiceView'));
  __export($__require('./dataService/parent/parentData.service'));
  __export($__require('./singletonDataService/singletonData.service'));
  __export($__require('./singletonDataService/parent/parentSingletonData.service'));
  __export($__require('./resourceBuilder/resourceBuilder.service'));
  exports.DATA_CONTRACT_PROVIDERS = [resourceBuilder_service_1.RESOURCE_BUILDER_PROVIDER, data_service_1.DATA_SERVICE_PROVIDER, singletonData_service_1.SINGLETON_DATA_SERVICE_PROVIDER];
  return module.exports;
});

System.registerDynamic("utilities/services/fileSize/fileSize.service", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var FileSize = (function() {
    function FileSize(numberUtility, bytes) {
      this.BYTES_PER_GB = 1073741824;
      this.BYTES_PER_MB = 1048576;
      this.BYTES_PER_KB = 1024;
      this.bytes = bytes;
      if (bytes >= this.BYTES_PER_GB) {
        this.isGB = true;
        this.GB = bytes / this.BYTES_PER_GB;
        this.GB = numberUtility.preciseRound(this.GB, 1);
      } else {
        this.isGB = false;
        if (bytes >= this.BYTES_PER_MB) {
          this.isMB = true;
          this.MB = bytes / this.BYTES_PER_MB;
          this.MB = numberUtility.preciseRound(this.MB, 1);
        } else {
          this.isMB = false;
          if (bytes >= this.BYTES_PER_KB) {
            this.isKB = true;
            this.KB = bytes / this.BYTES_PER_KB;
            this.KB = numberUtility.preciseRound(this.KB, 1);
          } else {
            this.isKB = false;
          }
        }
      }
      this.bytes = Math.round(this.bytes);
    }
    FileSize.prototype.display = function() {
      if (this.isGB) {
        return this.GB + ' GB';
      } else if (this.isMB) {
        return this.MB + ' MB';
      } else if (this.isKB) {
        return this.KB + ' KB';
      } else {
        return this.bytes + ' bytes';
      }
    };
    return FileSize;
  }());
  exports.FileSize = FileSize;
  return module.exports;
});

System.registerDynamic("utilities/services/fileSize/fileSize.module", ["./fileSize.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./fileSize.service'));
  return module.exports;
});

System.registerDynamic("utilities/services/test/chaiMoment", ["moment", "../date/dateTimeFormatStrings"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var moment = $__require('moment');
  var dateTimeFormatStrings_1 = $__require('../date/dateTimeFormatStrings');
  var chai = window.chai;
  if (chai) {
    chai.Assertion.addMethod('sameMoment', equalMoment);
    chai.Assertion.addMethod('equalMoment', equalMoment);
    chai.Assertion.addMethod('beforeMoment', function(expected, granularity) {
      var obj = this._obj;
      var objMoment = moment(obj);
      var expectedMoment = moment(expected);
      this.assert(objMoment.isBefore(expectedMoment, granularity), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' to be before ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' not to be before ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), expected, obj, true);
    });
    chai.Assertion.addMethod('afterMoment', function(expected, granularity) {
      var obj = this._obj;
      var objMoment = moment(obj);
      var expectedMoment = moment(expected);
      this.assert(objMoment.isAfter(expectedMoment, granularity), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' to be after ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' not to be after ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), expected, obj, true);
    });
  }
  function equalMoment(expected, granularity) {
    'use strict';
    var obj = this._obj;
    var objMoment = moment(obj);
    var expectedMoment = moment(expected);
    this.assert(objMoment.isSame(expectedMoment, granularity), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' not to be the same as ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), 'expected ' + objMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + ' to be the same as ' + expectedMoment.format(dateTimeFormatStrings_1.defaultFormats.dateTimeFormat + ' z') + (granularity ? ' (granularity: ' + granularity + ')' : ''), expected, obj, true);
  }
  return module.exports;
});

System.registerDynamic("utilities/services/test/mockPromise", ["lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var MockPromiseService = (function() {
    function MockPromiseService() {}
    MockPromiseService.prototype.promise = function(result, share) {
      if (_.isUndefined(share)) {
        share = false;
      }
      if (_.isFunction(result)) {
        return this.makeDynamicMockPromise(result, share);
      } else {
        return this.makeMockPromise(result, share);
      }
    };
    MockPromiseService.prototype.rejectedPromise = function() {
      var params = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i - 0] = arguments[_i];
      }
      var mocked = this.makeMockPromise(null, false);
      mocked.rejected = true;
      mocked.rejectParams = params;
      return mocked;
    };
    MockPromiseService.prototype.flushAll = function(service) {
      _.each(service, function(promise) {
        if (promise && _.isFunction(promise.flush)) {
          promise.flush();
        }
      });
    };
    MockPromiseService.prototype.makeMockPromise = function(result, share) {
      return this.makeDynamicMockPromise(function() {
        return result;
      }, share);
    };
    MockPromiseService.prototype.makeDynamicMockPromise = function(result, shareParam) {
      var share = shareParam;
      ;
      var requests = [];
      var mocked;
      var promiseBuilder = (function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        if (share && _.some(requests)) {
          return _.first(requests).promise;
        }
        var newRequest = {
          resolve: null,
          reject: null,
          params: args,
          promise: null,
          rejected: mocked.rejected,
          rejectParams: mocked.rejectParams
        };
        newRequest.promise = new Promise(function(resolve, reject) {
          newRequest.resolve = resolve;
          newRequest.reject = reject;
        });
        requests.push(newRequest);
        return newRequest.promise;
      });
      var spiedBuilder = sinon.spy(promiseBuilder);
      mocked = spiedBuilder;
      mocked.reject = function() {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          params[_i - 0] = arguments[_i];
        }
        mocked.rejected = true;
        mocked.rejectParams = params;
      };
      mocked.share = function(shareParam) {
        if (_.isUndefined(shareParam)) {
          share = true;
        }
        share = shareParam;
      };
      mocked.flush = function() {
        _.each(requests, function(request) {
          if (request.rejected) {
            request.reject.apply(request, request.rejectParams);
          } else {
            request.resolve(result.apply(void 0, request.params));
          }
        });
        requests = [];
      };
      return mocked;
    };
    return MockPromiseService;
  }());
  exports.mock = new MockPromiseService();
  return module.exports;
});

System.registerDynamic("utilities/services/test/angularFixture", ["angular", "angular-mocks", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var angular = $__require('angular');
  $__require('angular-mocks');
  var _ = $__require('lodash');
  var AngularFixture = (function() {
    function AngularFixture() {}
    AngularFixture.prototype.inject = function() {
      var serviceNames = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        serviceNames[_i - 0] = arguments[_i];
      }
      var services = {};
      var injectParameters = _.clone(serviceNames);
      injectParameters.push(function() {
        var injectedServices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          injectedServices[_i - 0] = arguments[_i];
        }
        _.each(serviceNames, function(service, index) {
          services[service] = injectedServices[index];
        });
      });
      angular.mock.inject(injectParameters);
      return services;
    };
    AngularFixture.prototype.mock = function(mocks) {
      angular.mock.module(function($provide) {
        _.each(mocks, function(value, key) {
          $provide.value(key.toString(), value);
        });
      });
    };
    AngularFixture.prototype.controllerWithBindings = function(controllerName, bindings, locals, scope) {
      var services = this.inject('$rootScope', '$controller');
      var $rootScope = services.$rootScope;
      var $controller = services.$controller;
      scope = _.extend($rootScope.$new(), scope);
      if (locals == null) {
        locals = {};
      }
      locals.$scope = scope;
      return {
        scope: scope,
        controller: $controller(controllerName, locals, bindings)
      };
    };
    AngularFixture.prototype.directive = function(directiveName, dom, scope) {
      var services = this.inject('$rootScope', '$compile');
      scope = _.extend(services.$rootScope.$new(), scope);
      var $compile = services.$compile;
      var component = $compile(dom)(scope);
      scope.$digest();
      return {
        directive: component,
        scope: component.isolateScope(),
        controller: component.controller(directiveName)
      };
    };
    return AngularFixture;
  }());
  exports.angularFixture = new AngularFixture();
  return module.exports;
});

System.registerDynamic("utilities/services/test/test.module", ["./chaiMoment", "./mockPromise", "./angularFixture"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  $__require('./chaiMoment');
  __export($__require('./mockPromise'));
  __export($__require('./angularFixture'));
  return module.exports;
});

System.registerDynamic("utilities/services/transform/transform.service", ["@angular/core", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var TransformService = (function() {
    function TransformService() {}
    TransformService.prototype.getValue = function(item, transform) {
      if (item == null) {
        return null;
      }
      if (transform == null) {
        return item;
      }
      return _.isFunction(transform) ? transform(item) : item[transform];
    };
    return TransformService;
  }());
  exports.TransformService = TransformService;
  exports.transform = new TransformService();
  exports.transformServiceToken = new core_1.OpaqueToken('transform service token');
  exports.TRANSFORM_SERVICE_PROVIDER = new core_1.Provider(exports.transformServiceToken, {useClass: TransformService});
  return module.exports;
});

System.registerDynamic("utilities/services/services.module", ["@angular/http", "./array/array.service", "./boolean/boolean.service", "./dataContracts/dataContracts.module", "./date/date.module", "./errorHandler/errorHandler.service", "./fileSize/fileSize.module", "./genericSearchFilter/genericSearchFilter.service", "./guid/guid.service", "./http/http.service", "./logger/logger.service", "./notification/notification.service", "./number/number.service", "./object/object.service", "./observable/observable.service", "./redirect/redirect.service", "./search/search.service", "./string/string.service", "./synchronizedRequests/synchronizedRequests.service", "./test/test.module", "./time/time.service", "./timezone/timezone.service", "./transform/transform.service", "./validation/validation.service", "./window/window.provider"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var http_1 = $__require('@angular/http');
  var array = $__require('./array/array.service');
  exports.array = array;
  var boolean = $__require('./boolean/boolean.service');
  exports.boolean = boolean;
  var dataContracts = $__require('./dataContracts/dataContracts.module');
  exports.dataContracts = dataContracts;
  var date = $__require('./date/date.module');
  exports.date = date;
  var errorHandler = $__require('./errorHandler/errorHandler.service');
  exports.errorHandler = errorHandler;
  var fileSize = $__require('./fileSize/fileSize.module');
  exports.fileSize = fileSize;
  var genericSearchFilter = $__require('./genericSearchFilter/genericSearchFilter.service');
  exports.genericSearchFilter = genericSearchFilter;
  var guid = $__require('./guid/guid.service');
  exports.guid = guid;
  var http = $__require('./http/http.service');
  exports.http = http;
  var logger = $__require('./logger/logger.service');
  exports.logger = logger;
  var notification = $__require('./notification/notification.service');
  exports.notification = notification;
  var numberService = $__require('./number/number.service');
  exports.number = numberService;
  var objectService = $__require('./object/object.service');
  exports.object = objectService;
  var observable = $__require('./observable/observable.service');
  exports.observable = observable;
  var redirect = $__require('./redirect/redirect.service');
  exports.redirect = redirect;
  var search = $__require('./search/search.service');
  exports.search = search;
  var stringService = $__require('./string/string.service');
  exports.string = stringService;
  var synchronizedRequests = $__require('./synchronizedRequests/synchronizedRequests.service');
  exports.synchronizedRequests = synchronizedRequests;
  var test = $__require('./test/test.module');
  exports.test = test;
  var time = $__require('./time/time.service');
  exports.time = time;
  var timezone = $__require('./timezone/timezone.service');
  exports.timezone = timezone;
  var transform = $__require('./transform/transform.service');
  exports.transform = transform;
  var validation = $__require('./validation/validation.service');
  exports.validation = validation;
  var window_provider_1 = $__require('./window/window.provider');
  exports.UTILITY_PROVIDERS = [http_1.HTTP_PROVIDERS, array.ARRAY_PROVIDER, boolean.BOOLEAN_PROVIDER, dataContracts.DATA_CONTRACT_PROVIDERS, date.DATE_PROVIDER, errorHandler.ERROR_HANDLER_PROVIDER, genericSearchFilter.GENERIC_SEARCH_FILTER_PROVIDER, guid.GUID_PROVIDER, http.HTTP_PROVIDER, numberService.NUMBER_PROVIDER, objectService.OBJECT_PROVIDER, search.SEARCH_PROVIDER, stringService.STRING_PROVIDER, synchronizedRequests.SYNCHRONIZED_REQUESTS_PROVIDER, time.TIME_PROVIDER, timezone.TIMEZONE_PROVIDER, transform.TRANSFORM_SERVICE_PROVIDER, validation.VALIDATION_PROVIDER, logger.LOGGER_PROVIDER, errorHandler.DEFAULT_ERROR_PROVIDERS, errorHandler.DEFAULT_LOGIN_URL_PROVIDERS, notification.NOTIFICATION_PROVIDER, redirect.REDIRECT_PROVIDER, window_provider_1.WINDOW_PROVIDER];
  return module.exports;
});

System.registerDynamic("utilities/types/itemList", ["lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var ItemList = (function() {
    function ItemList() {}
    ItemList.prototype.setItems = function(items) {
      this.items = items;
    };
    ItemList.prototype.get = function(value) {
      var predicate;
      if (typeof value === 'string') {
        predicate = function(item) {
          return (item.name === value);
        };
      } else {
        predicate = function(item) {
          return (item.value === value);
        };
      }
      return _.find(this.items, predicate);
    };
    ItemList.prototype.all = function() {
      return this.items;
    };
    return ItemList;
  }());
  exports.ItemList = ItemList;
  return module.exports;
});

System.registerDynamic("utilities/types/types.module", ["./compareResult", "./itemList"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./compareResult'));
  __export($__require('./itemList'));
  return module.exports;
});

System.registerDynamic("utilities/filters/isEmpty/isEmpty", ["@angular/core", "../../services/object/object.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var object_service_1 = $__require('../../services/object/object.service');
  var IsEmptyPipe = (function() {
    function IsEmptyPipe(objectUtility) {
      this.objectUtility = objectUtility;
    }
    IsEmptyPipe.prototype.transform = function(input, trueWhenEmpty) {
      var isEmpty = this.objectUtility.isNullOrEmpty(input);
      if (trueWhenEmpty === false) {
        return !isEmpty;
      }
      return isEmpty;
    };
    IsEmptyPipe = __decorate([core_1.Pipe({name: 'isEmpty'}), __param(0, core_1.Inject(object_service_1.objectToken)), __metadata('design:paramtypes', [Object])], IsEmptyPipe);
    return IsEmptyPipe;
  }());
  exports.IsEmptyPipe = IsEmptyPipe;
  return module.exports;
});

System.registerDynamic("utilities/filters/truncate/truncate", ["@angular/core", "../../services/object/object.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var object_service_1 = $__require('../../services/object/object.service');
  var TruncatePipe = (function() {
    function TruncatePipe(objectUtility) {
      this.objectUtility = objectUtility;
    }
    TruncatePipe.prototype.transform = function(input, truncateTo, includeEllipses) {
      includeEllipses = includeEllipses == null ? false : includeEllipses;
      var out = this.objectUtility.isNullOrWhitespace(input) ? '' : input.toString();
      if (out.length) {
        if (truncateTo != null && out.length > truncateTo) {
          out = out.substring(0, truncateTo);
          if (includeEllipses) {
            out += '...';
          }
        }
      }
      return out;
    };
    TruncatePipe = __decorate([core_1.Pipe({name: 'truncate'}), __param(0, core_1.Inject(object_service_1.objectToken)), __metadata('design:paramtypes', [Object])], TruncatePipe);
    return TruncatePipe;
  }());
  exports.TruncatePipe = TruncatePipe;
  return module.exports;
});

System.registerDynamic("utilities/services/boolean/boolean.service", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var BooleanUtility = (function() {
    function BooleanUtility() {}
    BooleanUtility.prototype.toBool = function(object) {
      return !!object;
    };
    return BooleanUtility;
  }());
  exports.BooleanUtility = BooleanUtility;
  exports.booleanToken = new core_1.OpaqueToken('A utility for working with booleans');
  exports.BOOLEAN_PROVIDER = new core_1.Provider(exports.booleanToken, {useClass: BooleanUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/dataService/view/dataServiceView", ["../data.service", "../parent/parentData.service", "../../singletonDataService/singletonData.service", "../../singletonDataService/parent/parentSingletonData.service", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var data_service_1 = $__require('../data.service');
  var parentData_service_1 = $__require('../parent/parentData.service');
  var singletonData_service_1 = $__require('../../singletonDataService/singletonData.service');
  var parentSingletonData_service_1 = $__require('../../singletonDataService/parent/parentSingletonData.service');
  var _ = $__require('lodash');
  var DataServiceView = (function(_super) {
    __extends(DataServiceView, _super);
    function DataServiceView(http, array, options) {
      _super.call(this, http, array, options);
      this.http = http;
      this.transform = options.transform;
    }
    DataServiceView.prototype.AsSingleton = function(parentId) {
      var mockData = _.find(this.mockData, function(item) {
        return item.id === parentId;
      });
      var singleton = new singletonData_service_1.SingletonDataService(this.http, {
        endpoint: this.endpoint,
        mockData: mockData,
        transform: this.transform,
        useMock: this.useMock,
        logRequests: this.logRequests
      });
      singleton.url = this.url;
      return singleton;
    };
    return DataServiceView;
  }(data_service_1.DataService));
  exports.DataServiceView = DataServiceView;
  var ParentDataServiceView = (function(_super) {
    __extends(ParentDataServiceView, _super);
    function ParentDataServiceView(http, array, options) {
      _super.call(this, http, array, options);
      this.http = http;
    }
    ParentDataServiceView.prototype.AsSingleton = function(parentId) {
      var mockData = _.find(this.mockData, function(item) {
        return item.id === parentId;
      });
      var singleton = new parentSingletonData_service_1.ParentSingletonDataService(this.http, {
        endpoint: this.endpoint,
        mockData: mockData,
        resourceDictionaryBuilder: this.resourceDictionaryBuilder,
        transform: this.transform,
        useMock: this.useMock,
        logRequests: this.logRequests,
        parentId: parentId
      });
      singleton.url = this.url;
      return singleton;
    };
    return ParentDataServiceView;
  }(parentData_service_1.ParentDataService));
  exports.ParentDataServiceView = ParentDataServiceView;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/dataService/data.service", ["@angular/core", "lodash", "../../array/array.service", "../../http/http.service", "../baseDataServiceBehavior", "../dataContractsHelper/dataContractsHelper.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var array_service_1 = $__require('../../array/array.service');
  var http_service_1 = $__require('../../http/http.service');
  var baseDataServiceBehavior_1 = $__require('../baseDataServiceBehavior');
  var dataContractsHelper_service_1 = $__require('../dataContractsHelper/dataContractsHelper.service');
  var DataService = (function() {
    function DataService(http, array, options) {
      this.array = array;
      this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior(http, options.transform);
      this.useDeepSearch = options.useDeepSearch;
      this.mockData = options.mockData;
      this.endpoint = options.endpoint;
      this.url = this.endpoint;
      this.useMock = options.useMock;
      this.logRequests = options.logRequests;
    }
    DataService.prototype.getItemEndpoint = function(id) {
      return this.url + '/' + id.toString();
    };
    DataService.prototype.getList = function(params) {
      var _this = this;
      var requestParams = {
        params: params,
        endpoint: this.url,
        getMockData: function() {
          return _this.mockData;
        },
        useMock: this.useMock,
        logRequests: this.logRequests
      };
      if (this.useDeepSearch) {
        return this.behavior.search(requestParams);
      } else {
        return this.behavior.getList(requestParams);
      }
    };
    DataService.prototype.getDetail = function(id) {
      var _this = this;
      return this.behavior.getItem({
        endpoint: this.getItemEndpoint(id),
        getMockData: function() {
          return _.find(_this.mockData, function(item) {
            return item.id === id;
          });
        },
        useMock: this.useMock,
        logRequests: this.logRequests
      });
    };
    DataService.prototype.create = function(domainObject) {
      var _this = this;
      return this.behavior.create({
        domainObject: domainObject,
        endpoint: this.url,
        addMockData: function(data) {
          var nextId = _.maxBy(_this.mockData, 'id').id + 1;
          domainObject.id = nextId;
          _this.mockData.push(domainObject);
        },
        useMock: this.useMock,
        logRequests: this.logRequests
      });
    };
    DataService.prototype.update = function(domainObject) {
      var _this = this;
      return this.behavior.update({
        domainObject: domainObject,
        endpoint: this.getItemEndpoint(domainObject.id),
        updateMockData: function(data) {
          var oldObject = _.find(_this.mockData, function(item) {
            return item.id === data.id;
          });
          oldObject = _.assign(oldObject, data);
        },
        useMock: this.useMock,
        logRequests: this.logRequests
      });
    };
    DataService.prototype.delete = function(domainObject) {
      var _this = this;
      return this.behavior.delete({
        domainObject: domainObject,
        endpoint: this.getItemEndpoint(domainObject.id),
        removeMockData: function(data) {
          _this.array.remove(_this.mockData, domainObject);
        },
        useMock: this.useMock,
        logRequests: this.logRequests
      });
    };
    DataService.prototype.version = function(versionNumber) {
      var dataService = _.clone(this);
      dataService.url = dataContractsHelper_service_1.helper.versionEndpoint(dataService.url, versionNumber);
      return dataService;
    };
    DataService = __decorate([core_1.Injectable(), __param(0, core_1.Inject(http_service_1.httpToken)), __param(1, core_1.Inject(array_service_1.arrayToken)), __metadata('design:paramtypes', [Object, Object, Object])], DataService);
    return DataService;
  }());
  exports.DataService = DataService;
  var DataServiceFactory = (function() {
    function DataServiceFactory(http, array) {
      this.http = http;
      this.array = array;
    }
    DataServiceFactory.prototype.getInstance = function(options) {
      return new DataService(this.http, this.array, options);
    };
    DataServiceFactory = __decorate([core_1.Injectable(), __param(0, core_1.Inject(http_service_1.httpToken)), __param(1, core_1.Inject(array_service_1.arrayToken)), __metadata('design:paramtypes', [Object, Object])], DataServiceFactory);
    return DataServiceFactory;
  }());
  exports.DataServiceFactory = DataServiceFactory;
  exports.dataServiceToken = new core_1.OpaqueToken('A service for making http requests against a REST endpoint');
  exports.DATA_SERVICE_PROVIDER = new core_1.Provider(exports.dataServiceToken, {useClass: DataServiceFactory});
  function DataServiceProvider(options) {
    return core_1.provide(exports.dataServiceToken, {
      deps: [http_service_1.httpToken, array_service_1.arrayToken],
      useFactory: function(http, array) {
        return new DataService(http, array, options);
      }
    });
  }
  exports.DataServiceProvider = DataServiceProvider;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/dataService/parent/parentData.service", ["lodash", "../data.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var _ = $__require('lodash');
  var data_service_1 = $__require('../data.service');
  var ParentDataService = (function(_super) {
    __extends(ParentDataService, _super);
    function ParentDataService(http, array, options) {
      _super.call(this, http, array, options);
      this.resourceDictionaryBuilder = options.resourceDictionaryBuilder;
    }
    ParentDataService.prototype.childContracts = function(id) {
      var _this = this;
      if (_.isUndefined(id)) {
        var dictionary = this.resourceDictionaryBuilder();
        _.each(dictionary, function(dataService) {
          dataService.url = _this.url + dataService.endpoint;
        });
        return dictionary;
      } else {
        var dictionary = this.resourceDictionaryBuilder();
        return _.mapValues(dictionary, function(dataService) {
          var contract;
          if (_.isFunction(dataService.AsSingleton)) {
            contract = dataService.AsSingleton(id);
          } else {
            contract = dataService;
          }
          contract.url = _this.url + '/' + id + contract.endpoint;
          return contract;
        });
      }
    };
    return ParentDataService;
  }(data_service_1.DataService));
  exports.ParentDataService = ParentDataService;
  return module.exports;
});

System.registerDynamic("utilities/services/http/http.service", ["lodash", "@angular/core", "@angular/http"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var _ = $__require('lodash');
  var core_1 = $__require('@angular/core');
  var http_1 = $__require('@angular/http');
  var HttpUtility = (function() {
    function HttpUtility(http) {
      this.http = http;
    }
    HttpUtility.prototype.buildQueryString = function(params) {
      var searchParams = new http_1.URLSearchParams();
      _.each(params, function(param, key) {
        searchParams.set(key, param);
      });
      return searchParams;
    };
    HttpUtility.prototype.get = function(endpoint, params) {
      return this.http.get(endpoint, {search: this.buildQueryString(params)}).map(function(response) {
        return response.json();
      });
    };
    HttpUtility.prototype.post = function(endpoint, data) {
      var headers = new http_1.Headers({'Content-Type': 'application/json'});
      var options = new http_1.RequestOptions({headers: headers});
      return this.http.post(endpoint, JSON.stringify(data), options).map(function(response) {
        return response.json();
      });
    };
    HttpUtility.prototype.put = function(endpoint, data) {
      var headers = new http_1.Headers({'Content-Type': 'application/json'});
      var options = new http_1.RequestOptions({headers: headers});
      return this.http.put(endpoint, JSON.stringify(data), options).map(function(response) {
        return response.json();
      });
    };
    HttpUtility.prototype.delete = function(endpoint, params) {
      return this.http.delete(endpoint, {search: this.buildQueryString(params)}).map(function() {
        return null;
      });
    };
    HttpUtility = __decorate([core_1.Injectable(), __param(0, core_1.Inject(http_1.Http)), __metadata('design:paramtypes', [http_1.Http])], HttpUtility);
    return HttpUtility;
  }());
  exports.HttpUtility = HttpUtility;
  exports.httpToken = new core_1.OpaqueToken('Wrapper for http client');
  exports.HTTP_PROVIDER = new core_1.Provider(exports.httpToken, {useClass: HttpUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/converters/aliasConverter/aliasConverter", ["lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var AliasConverter = (function() {
    function AliasConverter(alias, composedConverter) {
      var _this = this;
      this.alias = alias;
      this.composedConverter = composedConverter;
      this.fromServer = function(raw, parent) {
        if (!_.has(parent, _this.alias)) {
          return null;
        }
        raw = parent[_this.alias];
        delete parent[_this.alias];
        if (_this.composedConverter != null) {
          return _this.composedConverter.fromServer(raw, parent);
        }
        return raw;
      };
      this.toServer = function(data, parent) {
        if (_this.composedConverter != null) {
          data = _this.composedConverter.toServer(data, parent);
        }
        parent[_this.alias] = data;
        return null;
      };
    }
    return AliasConverter;
  }());
  exports.AliasConverter = AliasConverter;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/converters/dateConverter/dateConverter", ["moment", "../../../date/date.module"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var moment = $__require('moment');
  var date_module_1 = $__require('../../../date/date.module');
  exports.defaultFormats = date_module_1.defaultFormats;
  exports.dateConverter = {
    fromServer: function(raw) {
      return date_module_1.dateUtility.getDateFromISOString(raw);
    },
    toServer: function(data) {
      return data != null ? moment(data).format(date_module_1.defaultFormats.isoFormat) : null;
    }
  };
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/converters/enumConverter/enumConverter", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EnumConverter = (function() {
    function EnumConverter(enumType) {
      var _this = this;
      this.enumType = enumType;
      this.fromServer = function(raw) {
        return _this.enumType.get(raw);
      };
      this.toServer = function(data) {
        return data != null ? data.value : null;
      };
    }
    return EnumConverter;
  }());
  exports.EnumConverter = EnumConverter;
  ;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/converters/timeConverter/timeConverter", ["moment", "../../../date/date.module", "../../../timezone/timezone.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var moment = $__require('moment');
  var date_module_1 = $__require('../../../date/date.module');
  exports.defaultFormats = date_module_1.defaultFormats;
  var timezone_service_1 = $__require('../../../timezone/timezone.service');
  exports.timeConverter = {
    fromServer: function(raw) {
      return timezone_service_1.timezoneService.buildMomentWithTimezone(raw, timezone_service_1.timezoneService.currentTimezone, date_module_1.defaultFormats.timeFormat);
    },
    toServer: function(data) {
      return data != null ? moment(data).format(date_module_1.defaultFormats.timeFormat) : null;
    }
  };
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/converters/converters", ["./aliasConverter/aliasConverter", "./dateConverter/dateConverter", "./enumConverter/enumConverter", "./timeConverter/timeConverter", "lodash", "../../object/object.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./aliasConverter/aliasConverter'));
  __export($__require('./dateConverter/dateConverter'));
  __export($__require('./enumConverter/enumConverter'));
  __export($__require('./timeConverter/timeConverter'));
  var _ = $__require('lodash');
  var object_service_1 = $__require('../../object/object.service');
  var ConverterService = (function() {
    function ConverterService() {}
    ConverterService.prototype.applyTransform = function(data, transform, toServer, parent) {
      var _this = this;
      if (transform == null || (parent == null && object_service_1.objectUtility.isNullOrEmpty(data))) {
        return data;
      }
      if (_.isArray(data)) {
        return _.map(data, function(item) {
          return _this.applyTransform(item, transform, toServer);
        });
      }
      if (this.isConverter(transform)) {
        var transformFunc = toServer ? transform.toServer : transform.fromServer;
        return transformFunc(data, parent);
      } else {
        var mappedData_1 = _.clone(data);
        _.each(transform, function(childTransform, key) {
          mappedData_1[key] = _this.applyTransform(_.get(mappedData_1, key), childTransform, toServer, mappedData_1);
        });
        return mappedData_1;
      }
    };
    ConverterService.prototype.isConverter = function(object) {
      return _.isFunction(object.fromServer) || _.isFunction(object.toServer);
    };
    return ConverterService;
  }());
  exports.ConverterService = ConverterService;
  exports.converterService = new ConverterService();
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/baseDataServiceBehavior", ["./converters/converters"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var converters_1 = $__require('./converters/converters');
  var BaseDataServiceBehavior = (function() {
    function BaseDataServiceBehavior(http, transform) {
      this.http = http;
      this.transform = transform;
    }
    BaseDataServiceBehavior.prototype.getList = function(options) {
      var _this = this;
      var promise;
      if (options.useMock) {
        promise = Promise.resolve(options.getMockData());
      } else {
        promise = this.http.get(options.endpoint, options.params).toPromise();
      }
      return promise.then(function(data) {
        data = converters_1.converterService.applyTransform(data, _this.transform, false);
        if (options.logRequests) {
          _this.log('getList', options.params, data, options.endpoint, options.useMock);
        }
        return data;
      });
    };
    BaseDataServiceBehavior.prototype.search = function(options) {
      var _this = this;
      var promise;
      if (options.useMock) {
        promise = Promise.resolve({dataSet: options.getMockData()});
      } else {
        promise = this.http.post(options.endpoint, options.params).toPromise();
      }
      return promise.then(function(result) {
        result.dataSet = converters_1.converterService.applyTransform(result.dataSet, _this.transform, false);
        if (options.logRequests) {
          _this.log('search', options.params, result, options.endpoint, options.useMock);
        }
        return result;
      });
    };
    BaseDataServiceBehavior.prototype.getItem = function(options) {
      var _this = this;
      var promise;
      if (options.useMock) {
        promise = Promise.resolve(options.getMockData());
      } else {
        promise = this.http.get(options.endpoint).toPromise();
      }
      return promise.then(function(data) {
        data = converters_1.converterService.applyTransform(data, _this.transform, false);
        if (options.logRequests) {
          _this.log('get', null, data, options.endpoint, options.useMock);
        }
        return data;
      });
    };
    BaseDataServiceBehavior.prototype.create = function(options) {
      var _this = this;
      var promise;
      options.domainObject = converters_1.converterService.applyTransform(options.domainObject, this.transform, true);
      if (options.useMock) {
        options.addMockData(options.domainObject);
        promise = Promise.resolve(options.domainObject);
      } else {
        promise = this.http.post(options.endpoint, options.domainObject).toPromise();
      }
      return promise.then(function(data) {
        data = converters_1.converterService.applyTransform(data, _this.transform, false);
        if (options.logRequests) {
          _this.log('create', options.domainObject, data, options.endpoint, options.useMock);
        }
        return data;
      });
    };
    BaseDataServiceBehavior.prototype.update = function(options) {
      var _this = this;
      var promise;
      options.domainObject = converters_1.converterService.applyTransform(options.domainObject, this.transform, true);
      if (options.useMock) {
        options.updateMockData(options.domainObject);
        promise = Promise.resolve(options.domainObject);
      } else {
        promise = this.http.put(options.endpoint, options.domainObject).toPromise();
      }
      return promise.then(function(data) {
        data = converters_1.converterService.applyTransform(data, _this.transform, false);
        if (options.logRequests) {
          _this.log('update', options.domainObject, data, options.endpoint, options.useMock);
        }
        return data;
      });
    };
    BaseDataServiceBehavior.prototype.delete = function(options) {
      var _this = this;
      var promise;
      if (options.useMock) {
        options.removeMockData(options.domainObject);
        promise = Promise.resolve();
      } else {
        promise = this.http.delete(options.endpoint).toPromise();
      }
      return promise.then(function() {
        if (options.logRequests) {
          _this.log('delete', options.domainObject, null, options.endpoint, options.useMock);
        }
      });
    };
    BaseDataServiceBehavior.prototype.log = function(requestName, params, data, endpoint, useMock) {
      var mockString = useMock ? 'Mocked ' : '';
      var endpointString = endpoint == null ? 'unspecified' : endpoint;
      console.log(mockString + requestName + ' for endpoint ' + endpointString + ':');
      if (params != null) {
        console.log('params:');
        console.log(params);
      }
      if (data != null) {
        console.log('data:');
        console.log(data);
      }
    };
    return BaseDataServiceBehavior;
  }());
  exports.BaseDataServiceBehavior = BaseDataServiceBehavior;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/dataContractsHelper/dataContractsHelper.service", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DataContractsHelper = (function() {
    function DataContractsHelper() {}
    DataContractsHelper.prototype.versionEndpoint = function(endpoint, versionNumber) {
      var versionExpression = /\/v\d+\//;
      var apiExpression = /\/api\//;
      var versionString = 'v' + versionNumber;
      var searchResult = endpoint.search(versionExpression);
      if (searchResult !== -1) {
        return endpoint.replace(versionExpression, '/' + versionString + '/');
      } else {
        return endpoint.replace(apiExpression, '/api/' + versionString + '/');
      }
    };
    return DataContractsHelper;
  }());
  exports.helper = new DataContractsHelper();
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/singletonDataService/singletonData.service", ["@angular/core", "lodash", "../../http/http.service", "../baseDataServiceBehavior", "../dataContractsHelper/dataContractsHelper.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var http_service_1 = $__require('../../http/http.service');
  var baseDataServiceBehavior_1 = $__require('../baseDataServiceBehavior');
  var dataContractsHelper_service_1 = $__require('../dataContractsHelper/dataContractsHelper.service');
  var SingletonDataService = (function() {
    function SingletonDataService(http, options) {
      this.behavior = new baseDataServiceBehavior_1.BaseDataServiceBehavior(http, options.transform);
      this.mockData = options.mockData;
      this.endpoint = options.endpoint;
      this.url = this.endpoint;
      this.useMock = options.useMock;
      this.logRequests = options.logRequests;
    }
    SingletonDataService.prototype.get = function() {
      var _this = this;
      return this.behavior.getItem({
        endpoint: this.url,
        getMockData: function() {
          return _this.mockData;
        },
        useMock: this.useMock,
        logRequests: this.logRequests
      });
    };
    SingletonDataService.prototype.update = function(domainObject) {
      var _this = this;
      return this.behavior.update({
        domainObject: domainObject,
        endpoint: this.url,
        updateMockData: function(data) {
          _this.mockData = _.assign(_this.mockData, domainObject);
        },
        useMock: this.useMock,
        logRequests: this.logRequests
      });
    };
    SingletonDataService.prototype.version = function(versionNumber) {
      var dataService = _.clone(this);
      dataService.url = dataContractsHelper_service_1.helper.versionEndpoint(dataService.url, versionNumber);
      return dataService;
    };
    return SingletonDataService;
  }());
  exports.SingletonDataService = SingletonDataService;
  var SingletonDataServiceFactory = (function() {
    function SingletonDataServiceFactory(http) {
      this.http = http;
    }
    SingletonDataServiceFactory.prototype.getInstance = function(options) {
      return new SingletonDataService(this.http, options);
    };
    SingletonDataServiceFactory = __decorate([core_1.Injectable(), __param(0, core_1.Inject(http_service_1.httpToken)), __metadata('design:paramtypes', [Object])], SingletonDataServiceFactory);
    return SingletonDataServiceFactory;
  }());
  exports.SingletonDataServiceFactory = SingletonDataServiceFactory;
  exports.singletonDataServiceToken = new core_1.OpaqueToken('A service for making http requests against a singleton REST endpoint');
  exports.SINGLETON_DATA_SERVICE_PROVIDER = new core_1.Provider(exports.singletonDataServiceToken, {useClass: SingletonDataServiceFactory});
  function SingletonDataServiceProvider(options) {
    return core_1.provide(exports.singletonDataServiceToken, {
      deps: [http_service_1.httpToken],
      useFactory: function(http) {
        return new SingletonDataService(http, options);
      }
    });
  }
  exports.SingletonDataServiceProvider = SingletonDataServiceProvider;
  ;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/singletonDataService/parent/parentSingletonData.service", ["lodash", "../../singletonDataService/singletonData.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var _ = $__require('lodash');
  var singletonData_service_1 = $__require('../../singletonDataService/singletonData.service');
  var ParentSingletonDataService = (function(_super) {
    __extends(ParentSingletonDataService, _super);
    function ParentSingletonDataService(http, options) {
      _super.call(this, http, options);
      this.resourceDictionaryBuilder = options.resourceDictionaryBuilder;
      this.parentId = options.parentId;
    }
    ParentSingletonDataService.prototype.childContracts = function() {
      var _this = this;
      var dictionary = this.resourceDictionaryBuilder();
      return _.mapValues(dictionary, function(dataService) {
        var contract;
        if (_.isFunction(dataService.AsSingleton)) {
          contract = dataService.AsSingleton(_this.parentId);
        } else {
          contract = dataService;
        }
        contract.url = _this.url + contract.endpoint;
        return contract;
      });
    };
    return ParentSingletonDataService;
  }(singletonData_service_1.SingletonDataService));
  exports.ParentSingletonDataService = ParentSingletonDataService;
  return module.exports;
});

System.registerDynamic("utilities/services/dataContracts/resourceBuilder/resourceBuilder.service", ["@angular/core", "../../array/array.service", "../../http/http.service", "../dataService/data.service", "../dataService/view/dataServiceView", "../dataService/parent/parentData.service", "../singletonDataService/singletonData.service", "../singletonDataService/parent/parentSingletonData.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var array_service_1 = $__require('../../array/array.service');
  var http_service_1 = $__require('../../http/http.service');
  var data_service_1 = $__require('../dataService/data.service');
  var dataServiceView_1 = $__require('../dataService/view/dataServiceView');
  var parentData_service_1 = $__require('../dataService/parent/parentData.service');
  var singletonData_service_1 = $__require('../singletonDataService/singletonData.service');
  var parentSingletonData_service_1 = $__require('../singletonDataService/parent/parentSingletonData.service');
  var ResourceBuilder = (function() {
    function ResourceBuilder(http, array) {}
    ResourceBuilder.prototype.createResource = function(options) {
      options = this.useMockIfNoEndpoint(options);
      return new data_service_1.DataService(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createResourceView = function(options) {
      options = this.useMockIfNoEndpoint(options);
      return new dataServiceView_1.DataServiceView(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createParentResource = function(options) {
      options = this.useMockIfNoEndpoint(options);
      return new parentData_service_1.ParentDataService(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createParentResourceView = function(options) {
      options = this.useMockIfNoEndpoint(options);
      return new dataServiceView_1.ParentDataServiceView(this.http, this.array, options);
    };
    ResourceBuilder.prototype.createSingletonResource = function(options) {
      options = this.useMockIfNoEndpoint(options);
      return new singletonData_service_1.SingletonDataService(this.http, options);
    };
    ResourceBuilder.prototype.createParentSingletonResource = function(options) {
      options = this.useMockIfNoEndpoint(options);
      return new parentSingletonData_service_1.ParentSingletonDataService(this.http, options);
    };
    ResourceBuilder.prototype.useMockIfNoEndpoint = function(options) {
      options.useMock = options.endpoint == null ? true : options.useMock;
      return options;
    };
    ResourceBuilder = __decorate([core_1.Injectable(), __param(0, core_1.Inject(http_service_1.httpToken)), __param(1, core_1.Inject(array_service_1.arrayToken)), __metadata('design:paramtypes', [Object, Object])], ResourceBuilder);
    return ResourceBuilder;
  }());
  exports.ResourceBuilder = ResourceBuilder;
  exports.resourceBuilderToken = new core_1.OpaqueToken('A helper for building resources for hitting REST endpoints');
  exports.RESOURCE_BUILDER_PROVIDER = new core_1.Provider(exports.resourceBuilderToken, {useClass: ResourceBuilder});
  return module.exports;
});

System.registerDynamic("utilities/services/errorHandler/errorHandler.service", ["@angular/core", "../notification/notification.service", "../redirect/redirect.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var notification_service_1 = $__require('../notification/notification.service');
  var redirect_service_1 = $__require('../redirect/redirect.service');
  (function(HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["cancelledRequest"] = -1] = "cancelledRequest";
    HttpStatusCode[HttpStatusCode["badRequest"] = 400] = "badRequest";
    HttpStatusCode[HttpStatusCode["unauthorized"] = 401] = "unauthorized";
    HttpStatusCode[HttpStatusCode["forbidden"] = 403] = "forbidden";
    HttpStatusCode[HttpStatusCode["invalidUrl"] = 404] = "invalidUrl";
    HttpStatusCode[HttpStatusCode["timeout"] = 408] = "timeout";
    HttpStatusCode[HttpStatusCode["internalServerError"] = 500] = "internalServerError";
    HttpStatusCode[HttpStatusCode["gone"] = 410] = "gone";
  })(exports.HttpStatusCode || (exports.HttpStatusCode = {}));
  var HttpStatusCode = exports.HttpStatusCode;
  exports.defaultErrorsToken = new core_1.OpaqueToken('List of default errors for the error handler');
  exports.DEFAULT_ERROR_PROVIDERS = new core_1.Provider(exports.defaultErrorsToken, {useValue: {
      badRequestError: 'Your request failed one or more validation checks.',
      forbiddenError: 'You have insufficient permissions to perform this action',
      invalidUrlError: 'Resource not found. This issue has been logged',
      timeoutError: 'Request timed out. Check your network connection or contact your administrator for issues',
      internalServerError: 'The system has encountered an error. This issue has been logged.' + ' Please contact support if you are unable to complete critical tasks',
      defaultError: 'Http status code not handled',
      goneError: 'The requested resource is no longer available.'
    }});
  exports.defaultLoginUrlSettingsToken = new core_1.OpaqueToken('Default login url information');
  exports.DEFAULT_LOGIN_URL_PROVIDERS = new core_1.Provider(exports.defaultLoginUrlSettingsToken, {useValue: {
      loginUrl: '/login',
      returnUrlParam: 'returnUrl'
    }});
  var ErrorHandlerService = (function() {
    function ErrorHandlerService(redirect, exceptionHandler, notification, errorMessages, loginSettings) {
      this.redirect = redirect;
      this.exceptionHandler = exceptionHandler;
      this.notification = notification;
      this.errorMessages = errorMessages;
      this.loginSettings = loginSettings;
    }
    ErrorHandlerService.prototype.httpResponseError = function(rejection) {
      switch (rejection.status) {
        case HttpStatusCode.badRequest:
          this.badRequestError(rejection);
          break;
        case HttpStatusCode.unauthorized:
          this.loggedOutError();
          break;
        case HttpStatusCode.forbidden:
          this.insufficientPermissionsError();
          break;
        case HttpStatusCode.invalidUrl:
          this.invalidUrlError();
          break;
        case HttpStatusCode.timeout:
          this.timeoutError();
          break;
        case HttpStatusCode.internalServerError:
          this.systemError();
          break;
        case HttpStatusCode.gone:
          this.goneError();
          break;
        case HttpStatusCode.cancelledRequest:
          break;
        default:
          this.exceptionHandler.call(new Error(this.errorMessages.defaultError));
          this.exceptionHandler.call(new Error('Status: ' + rejection.status));
          this.exceptionHandler.call(new Error('Response: ' + rejection));
          break;
      }
    };
    ErrorHandlerService.prototype.badRequestError = function(rejection) {
      if (rejection.data) {
        this.notification.error(rejection.data);
      } else {
        this.notification.error(this.errorMessages.badRequestError);
      }
    };
    ErrorHandlerService.prototype.loggedOutError = function() {
      var returnUrl = this.redirect.getCurrentLocationAsParam();
      var target = this.loginSettings.loginUrl + '?' + this.loginSettings.returnUrlParam + '=' + returnUrl;
      this.redirect.to(target);
    };
    ErrorHandlerService.prototype.insufficientPermissionsError = function() {
      this.notification.error(this.errorMessages.forbiddenError);
    };
    ErrorHandlerService.prototype.invalidUrlError = function() {
      this.notification.error(this.errorMessages.invalidUrlError);
    };
    ErrorHandlerService.prototype.timeoutError = function() {
      this.notification.error(this.errorMessages.timeoutError);
    };
    ErrorHandlerService.prototype.systemError = function() {
      this.notification.error(this.errorMessages.internalServerError);
    };
    ErrorHandlerService.prototype.goneError = function() {
      this.notification.error(this.errorMessages.goneError);
    };
    ErrorHandlerService = __decorate([core_1.Injectable(), __param(0, core_1.Inject(redirect_service_1.redirectToken)), __param(1, core_1.Inject(core_1.ExceptionHandler)), __param(2, core_1.Inject(notification_service_1.notificationServiceToken)), __param(3, core_1.Inject(exports.defaultErrorsToken)), __param(4, core_1.Inject(exports.defaultLoginUrlSettingsToken)), __metadata('design:paramtypes', [Object, core_1.ExceptionHandler, Object, Object, Object])], ErrorHandlerService);
    return ErrorHandlerService;
  }());
  exports.ErrorHandlerService = ErrorHandlerService;
  exports.errorHandlerToken = new core_1.OpaqueToken('A service for handling http errors');
  exports.ERROR_HANDLER_PROVIDER = new core_1.Provider(exports.errorHandlerToken, {useClass: ErrorHandlerService});
  return module.exports;
});

System.registerDynamic("utilities/services/search/search.service", ["@angular/core", "lodash", "../object/object.service", "../string/string.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var object_service_1 = $__require('../object/object.service');
  var string_service_1 = $__require('../string/string.service');
  var SearchUtility = (function() {
    function SearchUtility(objectUtility, stringUtility) {
      this.objectUtility = objectUtility;
      this.stringUtility = stringUtility;
    }
    SearchUtility.prototype.search = function(object, search, caseSensitive) {
      var _this = this;
      if (this.objectUtility.isNullOrEmpty(search)) {
        return true;
      }
      if (_.isObject(object)) {
        var values = _.values(object);
        return _.some(values, function(value) {
          return _this.search(value, search, caseSensitive);
        });
      } else {
        var dataString = this.objectUtility.toString(object);
        if (!caseSensitive) {
          search = search.toLowerCase();
          dataString = dataString.toLowerCase();
        }
        return this.stringUtility.contains(dataString, search);
      }
    };
    SearchUtility.prototype.tokenizedSearch = function(object, search, caseSensitive) {
      var _this = this;
      if (search == null) {
        return true;
      }
      return _.every(search.split(' '), function(subsearch) {
        return _this.search(object, subsearch, caseSensitive);
      });
    };
    SearchUtility = __decorate([__param(0, core_1.Inject(object_service_1.objectToken)), __param(1, core_1.Inject(string_service_1.stringToken)), __metadata('design:paramtypes', [Object, Object])], SearchUtility);
    return SearchUtility;
  }());
  exports.searchUtility = new SearchUtility(object_service_1.objectUtility, string_service_1.stringUtility);
  exports.searchToken = new core_1.OpaqueToken('A service for performing text search against an object');
  exports.SEARCH_PROVIDER = new core_1.Provider(exports.searchToken, {useClass: SearchUtility});
  return module.exports;
});

System.registerDynamic("utilities/filters/filter", ["rxjs/Rx", "../services/object/object.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Rx = $__require('rxjs/Rx');
  var object_service_1 = $__require('../services/object/object.service');
  var SerializableFilter = (function() {
    function SerializableFilter() {
      this.subject = new Rx.Subject();
    }
    SerializableFilter.prototype.serialize = function() {
      return this;
    };
    SerializableFilter.prototype.subscribe = function(onValueChange) {
      return this.subject.subscribe(onValueChange);
    };
    SerializableFilter.prototype.onChange = function(force) {
      if (force === void 0) {
        force = true;
      }
      var newValue = this.serialize();
      if (force || !object_service_1.objectUtility.areEqual(newValue, this._value)) {
        this._value = newValue;
        this.subject.next(this._value);
      }
    };
    return SerializableFilter;
  }());
  exports.SerializableFilter = SerializableFilter;
  return module.exports;
});

System.registerDynamic("utilities/services/genericSearchFilter/genericSearchFilter.service", ["@angular/core", "../object/object.service", "../string/string.service", "../search/search.service", "../../filters/filter"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var object_service_1 = $__require('../object/object.service');
  var string_service_1 = $__require('../string/string.service');
  var search_service_1 = $__require('../search/search.service');
  var filter_1 = $__require('../../filters/filter');
  exports.filterName = 'search';
  var GenericSearchFilter = (function(_super) {
    __extends(GenericSearchFilter, _super);
    function GenericSearchFilter(object, string, tokenized) {
      _super.call(this);
      this.object = object;
      this.string = string;
      this.tokenized = tokenized;
      this.type = exports.filterName;
      this.minSearchLength = 1;
      this.caseSensitive = false;
    }
    Object.defineProperty(GenericSearchFilter.prototype, "searchText", {
      get: function() {
        return this._searchText;
      },
      set: function(value) {
        this._searchText = value;
        this.onChange(false);
      },
      enumerable: true,
      configurable: true
    });
    GenericSearchFilter.prototype.serialize = function() {
      return this.searchText != null && this.searchText.length >= this.minSearchLength ? this.searchText : null;
    };
    GenericSearchFilter.prototype.filter = function(item) {
      if (this.object.isNullOrEmpty(this.searchText) || this.searchText.length < this.minSearchLength) {
        return true;
      }
      if (this.tokenized) {
        return search_service_1.searchUtility.tokenizedSearch(item, this.searchText, this.caseSensitive);
      }
      return search_service_1.searchUtility.search(item, this.searchText, this.caseSensitive);
    };
    return GenericSearchFilter;
  }(filter_1.SerializableFilter));
  exports.GenericSearchFilter = GenericSearchFilter;
  var GenericSearchFilterFactory = (function() {
    function GenericSearchFilterFactory(objectUtility, stringUtility) {
      this.objectUtility = objectUtility;
      this.stringUtility = stringUtility;
    }
    GenericSearchFilterFactory.prototype.getInstance = function(tokenized) {
      return new GenericSearchFilter(this.objectUtility, this.stringUtility, tokenized);
    };
    GenericSearchFilterFactory = __decorate([__param(0, core_1.Inject(object_service_1.objectToken)), __param(1, core_1.Inject(string_service_1.stringToken)), __metadata('design:paramtypes', [Object, Object])], GenericSearchFilterFactory);
    return GenericSearchFilterFactory;
  }());
  exports.GenericSearchFilterFactory = GenericSearchFilterFactory;
  exports.genericSearchFilterToken = new core_1.OpaqueToken('A factory for getting generic search filters');
  exports.GENERIC_SEARCH_FILTER_PROVIDER = new core_1.Provider(exports.genericSearchFilterToken, {useClass: GenericSearchFilterFactory});
  return module.exports;
});

(function() {
var define = System.amdDefine;
(function(_window) {
  'use strict';
  var _rng,
      _mathRNG,
      _nodeRNG,
      _whatwgRNG,
      _previousRoot;
  function setupBrowser() {
    var _crypto = _window.crypto || _window.msCrypto;
    if (!_rng && _crypto && _crypto.getRandomValues) {
      try {
        var _rnds8 = new Uint8Array(16);
        _whatwgRNG = _rng = function whatwgRNG() {
          _crypto.getRandomValues(_rnds8);
          return _rnds8;
        };
        _rng();
      } catch (e) {}
    }
    if (!_rng) {
      var _rnds = new Array(16);
      _mathRNG = _rng = function() {
        for (var i = 0,
            r; i < 16; i++) {
          if ((i & 0x03) === 0) {
            r = Math.random() * 0x100000000;
          }
          _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }
        return _rnds;
      };
      if ('undefined' !== typeof console && console.warn) {
        console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()");
      }
    }
  }
  function setupNode() {
    if ('function' === typeof require) {
      try {
        var _rb = require('crypto').randomBytes;
        _nodeRNG = _rng = _rb && function() {
          return _rb(16);
        };
        _rng();
      } catch (e) {}
    }
  }
  if (_window) {
    setupBrowser();
  } else {
    setupNode();
  }
  var BufferClass = ('function' === typeof Buffer) ? Buffer : Array;
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0,
        ii = 0;
    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) {
        buf[i + ii++] = _hexToByte[oct];
      }
    });
    while (ii < 16) {
      buf[i + ii++] = 0;
    }
    return buf;
  }
  function unparse(buf, offset) {
    var i = offset || 0,
        bth = _byteToHex;
    return bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + '-' + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]] + bth[buf[i++]];
  }
  var _seedBytes = _rng();
  var _nodeId = [_seedBytes[0] | 0x01, _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]];
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;
  var _lastMSecs = 0,
      _lastNSecs = 0;
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];
    options = options || {};
    var clockseq = (options.clockseq != null) ? options.clockseq : _clockseq;
    var msecs = (options.msecs != null) ? options.msecs : new Date().getTime();
    var nsecs = (options.nsecs != null) ? options.nsecs : _lastNSecs + 1;
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs) / 10000;
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;
    msecs += 12219292800000;
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;
    b[i++] = tmh >>> 24 & 0xf | 0x10;
    b[i++] = tmh >>> 16 & 0xff;
    b[i++] = clockseq >>> 8 | 0x80;
    b[i++] = clockseq & 0xff;
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }
    return buf ? buf : unparse(b);
  }
  function v4(options, buf, offset) {
    var i = buf && offset || 0;
    if (typeof(options) === 'string') {
      buf = (options === 'binary') ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};
    var rnds = options.random || (options.rng || _rng)();
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }
    return buf || unparse(rnds);
  }
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;
  uuid._rng = _rng;
  uuid._mathRNG = _mathRNG;
  uuid._nodeRNG = _nodeRNG;
  uuid._whatwgRNG = _whatwgRNG;
  if (('undefined' !== typeof module) && module.exports) {
    module.exports = uuid;
  } else if (typeof define === 'function' && define.amd) {
    define("node_modules/node-uuid/uuid", [], function() {
      return uuid;
    });
  } else {
    _previousRoot = _window.uuid;
    uuid.noConflict = function() {
      _window.uuid = _previousRoot;
      return uuid;
    };
    _window.uuid = uuid;
  }
})('undefined' !== typeof window ? window : null);

})();
System.registerDynamic("utilities/services/guid/guid.service", ["@angular/core", "node-uuid"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var uuid = $__require('node-uuid');
  var GuidService = (function() {
    function GuidService() {}
    GuidService.prototype.time = function() {
      return uuid.v1();
    };
    GuidService.prototype.random = function() {
      return uuid.v4();
    };
    return GuidService;
  }());
  exports.guid = new GuidService();
  exports.guidToken = new core_1.OpaqueToken('Service for generating guids');
  exports.GUID_PROVIDER = new core_1.Provider(exports.guidToken, {useClass: GuidService});
  return module.exports;
});

System.registerDynamic("utilities/services/number/number.service", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var Sign;
  (function(Sign) {
    Sign[Sign["positive"] = 1] = "positive";
    Sign[Sign["negative"] = -1] = "negative";
  })(Sign || (Sign = {}));
  var NumberUtility = (function() {
    function NumberUtility() {}
    NumberUtility.prototype.preciseRound = function(num, decimals) {
      var sign = num >= 0 ? Sign.positive : Sign.negative;
      return (Math.round((num * Math.pow(10, decimals)) + (sign * 0.001)) / Math.pow(10, decimals));
    };
    NumberUtility.prototype.integerDivide = function(dividend, divisor) {
      return Math.floor(dividend / divisor);
    };
    NumberUtility.prototype.roundToStep = function(num, step) {
      if (!step) {
        return num;
      }
      var remainder = num % step;
      if (remainder >= step / 2) {
        return num + (step - remainder);
      } else {
        return num - remainder;
      }
    };
    return NumberUtility;
  }());
  exports.NumberUtility = NumberUtility;
  exports.numberUtility = new NumberUtility();
  exports.numberUtilityToken = new core_1.OpaqueToken('number utility service');
  exports.NUMBER_PROVIDER = new core_1.Provider(exports.numberUtilityToken, {useClass: NumberUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/array/array.service", ["@angular/core", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var ArrayUtility = (function() {
    function ArrayUtility() {}
    ArrayUtility.prototype.findIndexOf = function(array, predicate) {
      var targetIndex;
      _.each(array, function(item, index) {
        if (predicate(item)) {
          targetIndex = index;
          return false;
        }
      });
      return targetIndex != null ? targetIndex : -1;
    };
    ArrayUtility.prototype.remove = function(array, item) {
      var index;
      if (_.isFunction(item)) {
        index = this.findIndexOf(array, item);
      } else {
        index = _.indexOf(array, item);
      }
      if (index >= 0) {
        return array.splice(index, 1)[0];
      } else {
        return null;
      }
    };
    ArrayUtility.prototype.replace = function(array, oldItem, newItem) {
      var index = _.indexOf(array, oldItem);
      if (index >= 0) {
        array.splice(index, 1, newItem);
      }
    };
    ArrayUtility.prototype.sum = function(array, transform) {
      var list;
      if (transform != null) {
        list = _.map(array, function(item) {
          return transform(item);
        });
      } else {
        list = array;
      }
      return _.reduce(list, function(sum, num) {
        return sum + num;
      }, 0);
    };
    ArrayUtility.prototype.toDictionary = function(array, keySelector) {
      array = _.reject(array, function(item) {
        return keySelector(item) == null;
      });
      return _.reduce(array, function(dictionary, item) {
        dictionary[keySelector(item)] = item;
        return dictionary;
      }, {});
    };
    ArrayUtility.prototype.last = function(array) {
      if (array != null && array.length > 0) {
        return array[array.length - 1];
      }
    };
    ArrayUtility.prototype.has = function(array, index) {
      if (array == null || index < 0 || index >= array.length) {
        return false;
      }
      return array[index] != null;
    };
    ArrayUtility.prototype.arrayify = function(maybeArray) {
      if (_.isArray(maybeArray)) {
        return maybeArray;
      } else if (maybeArray) {
        return [maybeArray];
      } else {
        return [];
      }
    };
    return ArrayUtility;
  }());
  exports.ArrayUtility = ArrayUtility;
  exports.arrayUtility = new ArrayUtility();
  exports.arrayToken = new core_1.OpaqueToken('A service for manipulating arrays');
  exports.ARRAY_PROVIDER = new core_1.Provider(exports.arrayToken, {useClass: ArrayUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/object/object.service", ["@angular/core", "lodash", "../array/array.service", "../date/date.module"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var array_service_1 = $__require('../array/array.service');
  var date_module_1 = $__require('../date/date.module');
  var ObjectUtility = (function() {
    function ObjectUtility(array, dateUtility) {
      this.array = array;
      this.dateUtility = dateUtility;
    }
    ObjectUtility.prototype.isNullOrEmpty = function(object) {
      if (object == null) {
        return true;
      } else if (_.isArray(object)) {
        return _.some(object) === false;
      } else if (_.isNumber(object)) {
        return _.isNaN(object);
      } else {
        return object === '';
      }
    };
    ObjectUtility.prototype.isNullOrWhitespace = function(object) {
      if (_.isString(object)) {
        object = object.trim();
      }
      return this.isNullOrEmpty(object);
    };
    ObjectUtility.prototype.areEqual = function(obj1, obj2) {
      var _this = this;
      var type1 = typeof obj1;
      var type2 = typeof obj2;
      if (obj1 == null && obj2 == null) {
        return true;
      } else if (obj1 == null || obj2 == null) {
        return false;
      }
      if (type1 !== type2) {
        return false;
      } else if (obj1 instanceof Array) {
        if (obj1.length !== obj2.length) {
          return false;
        }
        for (var i = 0; i < obj1.length; i++) {
          if (this.areEqual(obj1[i], obj2[i]) === false) {
            return false;
          }
        }
      } else if (this.areDates(obj1, obj2)) {
        return this.dateUtility.sameDateTime(obj1, obj2);
      } else if (type1 === 'object') {
        var keys2 = _.keys(obj2);
        _.forIn(obj1, function(value, key) {
          if (_.has(obj2, key)) {
            if (_this.areEqual(value, obj2[key]) === false) {
              return false;
            } else {
              _this.array.remove(keys2, key);
            }
          } else {
            return false;
          }
        });
        if (_.some(keys2)) {
          return false;
        }
      } else {
        return obj1 === obj2;
      }
      return true;
    };
    ObjectUtility.prototype.areDates = function(obj1, obj2) {
      if ((_.isDate(obj1) && _.isDate(obj2)) || (moment.isMoment(obj1) && moment.isMoment(obj2))) {
        return true;
      }
      return false;
    };
    ObjectUtility.prototype.toString = function(object) {
      return object + '';
    };
    ObjectUtility.prototype.valueOrDefault = function(value, defaultValue) {
      if (value != null) {
        return value;
      } else {
        return defaultValue;
      }
    };
    ObjectUtility.prototype.propertyNameToString = function(propertyFunction) {
      var stringValue = propertyFunction.toString();
      var regExpLiteral = /\.([^\.;]+);?\s*\}$/;
      var propertyName = regExpLiteral.exec(stringValue)[1];
      return propertyName;
    };
    ObjectUtility = __decorate([core_1.Injectable(), __param(0, core_1.Inject(array_service_1.arrayToken)), __param(1, core_1.Inject(date_module_1.dateToken)), __metadata('design:paramtypes', [Object, Object])], ObjectUtility);
    return ObjectUtility;
  }());
  exports.ObjectUtility = ObjectUtility;
  exports.objectUtility = new ObjectUtility(array_service_1.arrayUtility, date_module_1.dateUtility);
  exports.objectToken = new core_1.OpaqueToken('A utility for working with objects');
  exports.OBJECT_PROVIDER = new core_1.Provider(exports.objectToken, {useClass: ObjectUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/observable/observable.service", ["@angular/core", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var ObservableService = (function() {
    function ObservableService(exceptionHandler) {
      this.watchers = [];
      this.nextKey = 0;
      this.exceptionHandler = exceptionHandler;
    }
    ObservableService.prototype.register = function(action, event) {
      var _this = this;
      if (!_.isFunction(action)) {
        this.exceptionHandler.call(new Error('Watcher must be a function'));
        return null;
      }
      if (this.allowableEvents != null && !_.find(this.allowableEvents, function(e) {
        return e === event;
      })) {
        this.exceptionHandler.call(new Error('This event is not allowed. Events: ' + this.allowableEvents.join(', ')));
        return null;
      }
      var currentKey = this.nextKey;
      this.nextKey++;
      this.watchers[currentKey] = {
        action: action,
        event: event
      };
      return function() {
        _this.unregister(currentKey);
      };
    };
    ObservableService.prototype.fire = function(event) {
      var _this = this;
      var params = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
      }
      return _(this.watchers).filter(function(watcher) {
        return watcher != null && watcher.event === event;
      }).map(function(watcher) {
        return watcher.action.apply(_this, params);
      }).value();
    };
    ObservableService.prototype.unregister = function(key) {
      this.watchers[key] = null;
    };
    ObservableService = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [core_1.ExceptionHandler])], ObservableService);
    return ObservableService;
  }());
  exports.ObservableService = ObservableService;
  exports.observableToken = new core_1.OpaqueToken('Deprecated - a service for observables');
  exports.OBSERVABLE_PROVIDER = new core_1.Provider(exports.observableToken, {useClass: ObservableService});
  return module.exports;
});

System.registerDynamic("utilities/services/redirect/redirect.service", ["@angular/core", "../window/window.provider"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var window_provider_1 = $__require('../window/window.provider');
  var RedirectService = (function() {
    function RedirectService(window) {
      this.window = window;
    }
    RedirectService.prototype.getCurrentLocationAsParam = function() {
      var baseUrl = this.window.location.pathname;
      var queryString = this.window.location.search || '';
      return encodeURIComponent(baseUrl + queryString);
    };
    RedirectService.prototype.to = function(target, newTab) {
      if (!newTab) {
        this.window.open(target);
      } else {
        var win = this.window.open(target, '_blank');
        win.focus();
      }
    };
    RedirectService = __decorate([core_1.Injectable(), __param(0, core_1.Inject(window_provider_1.windowToken)), __metadata('design:paramtypes', [Window])], RedirectService);
    return RedirectService;
  }());
  exports.RedirectService = RedirectService;
  exports.redirectToken = new core_1.OpaqueToken('A service for redirecting to a new page');
  exports.REDIRECT_PROVIDER = new core_1.Provider(exports.redirectToken, {useClass: RedirectService});
  return module.exports;
});

System.registerDynamic("utilities/services/string/string.service", ["@angular/core", "lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var StringUtility = (function() {
    function StringUtility() {}
    StringUtility.prototype.toNumber = function(string) {
      return +string;
    };
    StringUtility.prototype.contains = function(str, substring) {
      if (substring) {
        return str.indexOf(substring) !== -1;
      }
      return true;
    };
    StringUtility.prototype.substitute = function(formatString) {
      var _this = this;
      var params = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
      }
      _.each(params, function(param, index) {
        formatString = _this.replaceAll(formatString, '\\{' + index + '\\}', param);
      });
      return formatString;
    };
    StringUtility.prototype.replaceAll = function(str, patternToFind, replacementString) {
      return str.replace(new RegExp(patternToFind, 'gi'), replacementString);
    };
    return StringUtility;
  }());
  exports.StringUtility = StringUtility;
  exports.stringUtility = new StringUtility();
  exports.stringToken = new core_1.OpaqueToken('A service for working with strings');
  exports.STRING_PROVIDER = new core_1.Provider(exports.stringToken, {useClass: StringUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/synchronizedRequests/synchronizedRequests.service", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var SynchronizedRequestsService = (function() {
    function SynchronizedRequestsService(dataProvider, handleRequest) {
      this.requestId = 0;
      this.dataProvider = dataProvider;
      this.handleRequest = handleRequest;
    }
    SynchronizedRequestsService.prototype.getData = function() {
      var _this = this;
      var params = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        params[_i - 0] = arguments[_i];
      }
      this.requestId++;
      var currentRequestId = this.requestId;
      Promise.resolve(this.dataProvider.apply(this, params)).then(function() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          data[_i - 0] = arguments[_i];
        }
        if (currentRequestId == _this.requestId) {
          _this.handleRequest.apply(_this, data);
        }
      });
    };
    return SynchronizedRequestsService;
  }());
  exports.SynchronizedRequestsService = SynchronizedRequestsService;
  var SynchronizedRequestsFactory = (function() {
    function SynchronizedRequestsFactory() {}
    SynchronizedRequestsFactory.prototype.getInstance = function(dataProvider, handleRequest) {
      return new SynchronizedRequestsService(dataProvider, handleRequest);
    };
    return SynchronizedRequestsFactory;
  }());
  exports.SynchronizedRequestsFactory = SynchronizedRequestsFactory;
  exports.synchronizedRequestsToken = new core_1.OpaqueToken('A service for handling multiple requests and returning only the latest');
  function SynchronizedRequestsProvider(dataProvider, handleRequest) {
    return core_1.provide(exports.synchronizedRequestsToken, {useFactory: function() {
        return new SynchronizedRequestsService(dataProvider, handleRequest);
      }});
  }
  exports.SynchronizedRequestsProvider = SynchronizedRequestsProvider;
  exports.SYNCHRONIZED_REQUESTS_PROVIDER = new core_1.Provider(exports.synchronizedRequestsToken, {useClass: SynchronizedRequestsFactory});
  return module.exports;
});

System.registerDynamic("utilities/types/compareResult", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(CompareResult) {
    CompareResult[CompareResult["greater"] = 1] = "greater";
    CompareResult[CompareResult["equal"] = 0] = "equal";
    CompareResult[CompareResult["less"] = -1] = "less";
    CompareResult[CompareResult["invalid"] = null] = "invalid";
  })(exports.CompareResult || (exports.CompareResult = {}));
  var CompareResult = exports.CompareResult;
  function getCompareResult(num) {
    'use strict';
    if (num == null) {
      return CompareResult.invalid;
    }
    if (num === 0) {
      return CompareResult.equal;
    } else if (num > 0) {
      return CompareResult.greater;
    } else {
      return CompareResult.less;
    }
  }
  exports.getCompareResult = getCompareResult;
  return module.exports;
});

System.registerDynamic("utilities/services/date/date.service", ["@angular/core", "lodash", "moment", "moment-timezone", "../timezone/timezone.service", "./dateTimeFormatStrings", "../../types/compareResult"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var _ = $__require('lodash');
  var moment = $__require('moment');
  $__require('moment-timezone');
  var timezone_service_1 = $__require('../timezone/timezone.service');
  var dateTimeFormatStrings_1 = $__require('./dateTimeFormatStrings');
  var compareResult_1 = $__require('../../types/compareResult');
  var DateUtility = (function() {
    function DateUtility() {
      this.baseFormat = dateTimeFormatStrings_1.defaultFormats.isoFormat;
    }
    DateUtility.prototype.getFullString = function(month) {
      return moment().month(month).format('MMMM');
    };
    DateUtility.prototype.subtractDates = function(start, end, dateFormat) {
      var duration = this.subtractDatesMoment(start, end, dateFormat);
      if (duration == null) {
        return null;
      }
      var result = {};
      result.days = Math.floor(duration.days());
      result.months = Math.floor(duration.months());
      result.years = Math.floor(duration.years());
      return result;
    };
    DateUtility.prototype.subtractDateInDays = function(start, end, dateFormat) {
      var duration = this.subtractDatesMoment(start, end, dateFormat);
      return duration != null ? duration.asDays() : null;
    };
    DateUtility.prototype.subtractDateInMilliseconds = function(start, end, dateFormat) {
      var duration = this.subtractDatesMoment(start, end, dateFormat);
      return duration != null ? duration.asMilliseconds() : null;
    };
    DateUtility.prototype.subtractDatesMoment = function(start, end, dateFormat) {
      if (start == null || end == null) {
        return null;
      }
      var startDate = this.parseDate(start, dateFormat);
      var endDate = this.parseDate(end, dateFormat);
      return moment.duration(endDate.diff(startDate));
    };
    DateUtility.prototype.compareDates = function(date1, date2, dateFormat) {
      var difference = this.subtractDateInMilliseconds(date2, date1, dateFormat);
      return compareResult_1.getCompareResult(difference);
    };
    DateUtility.prototype.dateInRange = function(date, rangeStart, rangeEnd) {
      if (date == null || rangeStart == null || rangeEnd == null) {
        return null;
      }
      if (this.compareDates(date, rangeStart) === compareResult_1.CompareResult.less || this.compareDates(date, rangeEnd) === compareResult_1.CompareResult.greater) {
        return false;
      } else {
        return true;
      }
    };
    DateUtility.prototype.getDateFromISOString = function(isoDateTime) {
      if (isoDateTime == null) {
        return null;
      }
      var momentOffset = timezone_service_1.timezoneService.getMomentTimezone(isoDateTime);
      var momentDate = moment(isoDateTime, dateTimeFormatStrings_1.defaultFormats.isoFormat);
      return momentOffset != null ? momentDate.tz(momentOffset) : momentDate.tz(timezone_service_1.timezoneService.currentTimezone.momentName);
    };
    DateUtility.prototype.isDate = function(date, dateFormat) {
      if (_.isDate(date)) {
        return !isNaN(date.getTime());
      }
      return moment(date, this.getFormat(dateFormat)).isValid();
    };
    DateUtility.prototype.getNow = function() {
      if (timezone_service_1.timezoneService.currentTimezone != null) {
        return moment().tz(timezone_service_1.timezoneService.currentTimezone.momentName);
      }
      return moment();
    };
    DateUtility.prototype.formatDate = function(date, dateFormat) {
      return moment(this.parseDate(date, dateFormat)).format(this.getFormat(dateFormat));
    };
    DateUtility.prototype.sameDate = function(date1, date2, date1Format, date2Format, granularity) {
      if (date1 == null || date2 == null) {
        return null;
      }
      date2Format = date2Format || date1Format;
      granularity = granularity || 'day';
      if (this.isDate(date1, date1Format) && this.isDate(date2, date2Format)) {
        var moment1 = this.parseDate(date1, date1Format);
        var moment2 = this.parseDate(date2, date2Format);
        return moment1.isSame(moment2, granularity);
      } else {
        return false;
      }
    };
    DateUtility.prototype.sameDateTime = function(date1, date2, date1Format, date2Format) {
      return this.sameDate(date1, date2, date1Format, date2Format, 'milliseconds');
    };
    DateUtility.prototype.parseDate = function(date, dateFormat) {
      if (_.isDate(date)) {
        return moment(date);
      }
      return moment(date, this.getFormat(dateFormat));
    };
    DateUtility.prototype.getFormat = function(customFormat) {
      return customFormat != null ? customFormat : this.baseFormat;
    };
    return DateUtility;
  }());
  exports.DateUtility = DateUtility;
  exports.dateUtility = new DateUtility();
  exports.dateToken = new core_1.OpaqueToken('A utility for working with dates');
  exports.DATE_PROVIDER = new core_1.Provider(exports.dateToken, {useClass: DateUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/date/dateTimeFormatStrings", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.dateTimeFormatServiceName = 'dateTimeFormatStrings';
  exports.defaultFormats = {
    isoFormat: 'YYYY-MM-DDTHH:mm:ssZ',
    dateTimeFormat: 'MM/DD/YYYY h:mm A',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'h:mmA'
  };
  return module.exports;
});

System.registerDynamic("utilities/services/date/date.module", ["./date.service", "./dateTimeFormatStrings"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('./date.service'));
  __export($__require('./dateTimeFormatStrings'));
  return module.exports;
});

System.registerDynamic("utilities/services/time/time.service", ["@angular/core", "moment", "../../types/compareResult", "../date/date.module"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var moment = $__require('moment');
  var compareResult_1 = $__require('../../types/compareResult');
  var date_module_1 = $__require('../date/date.module');
  var TimeUtility = (function() {
    function TimeUtility() {}
    TimeUtility.prototype.compareTimes = function(time1, time2) {
      var format = date_module_1.defaultFormats.timeFormat;
      var start = moment(time1, format);
      var end = moment(time2, format);
      if (start.hours() === end.hours() && start.minutes() === end.minutes()) {
        return compareResult_1.CompareResult.equal;
      } else if (start.hours() >= end.hours() && start.minutes() >= end.minutes()) {
        return compareResult_1.CompareResult.greater;
      } else {
        return compareResult_1.CompareResult.less;
      }
    };
    return TimeUtility;
  }());
  exports.TimeUtility = TimeUtility;
  exports.timeUtility = new TimeUtility();
  exports.timeToken = new core_1.OpaqueToken('A utility for working with time');
  exports.TIME_PROVIDER = new core_1.Provider(exports.timeToken, {useClass: TimeUtility});
  return module.exports;
});

System.registerDynamic("utilities/services/timezone/timezone.enum", ["lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var Timezones = (function() {
    function Timezones() {
      this.AST = new Timezone({
        offset: '-04:00',
        display: 'AST',
        momentName: 'Canada/Atlantic',
        offsetMinutes: -240
      });
      this.EST = new Timezone({
        offset: '-05:00',
        display: 'EST',
        momentName: 'US/Eastern',
        offsetMinutes: -300
      });
      this.CST = new Timezone({
        offset: '-06:00',
        display: 'CST',
        momentName: 'US/Central',
        offsetMinutes: -360
      });
      this.MST = new Timezone({
        offset: '-07:00',
        display: 'MST',
        momentName: 'US/Mountain',
        offsetMinutes: -420
      });
      this.PST = new Timezone({
        offset: '-08:00',
        display: 'PST',
        momentName: 'US/Pacific',
        offsetMinutes: -480
      });
      this.AKST = new Timezone({
        offset: '-09:00',
        display: 'AKST',
        momentName: 'US/Alaska',
        offsetMinutes: -540
      });
      this.HAST = new Timezone({
        offset: '-10:00',
        display: 'HAST',
        momentName: 'US/Hawaii',
        offsetMinutes: -600
      });
      this.items = [this.AST, this.EST, this.CST, this.MST, this.PST, this.AKST, this.HAST];
    }
    Timezones.prototype.get = function(offsetOrMomentName) {
      return _.find(this.items, function(item) {
        return (item.offset === offsetOrMomentName || item.momentName === offsetOrMomentName);
      });
    };
    Timezones.prototype.all = function() {
      return this.items;
    };
    return Timezones;
  }());
  var Timezone = (function() {
    function Timezone(data) {
      this.offset = data.offset;
      this.display = data.display;
      this.momentName = data.momentName;
      this.offsetMinutes = data.offsetMinutes;
    }
    return Timezone;
  }());
  exports.timezones = new Timezones();
  return module.exports;
});

System.registerDynamic("utilities/services/timezone/timezone.service", ["@angular/core", "moment", "lodash", "./timezone.enum"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var core_1 = $__require('@angular/core');
  var moment = $__require('moment');
  var _ = $__require('lodash');
  var timezone_enum_1 = $__require('./timezone.enum');
  __export($__require('./timezone.enum'));
  var TimezoneService = (function() {
    function TimezoneService() {}
    Object.defineProperty(TimezoneService.prototype, "currentTimezone", {
      get: function() {
        return this._currentTimezone;
      },
      enumerable: true,
      configurable: true
    });
    TimezoneService.prototype.setCurrentTimezone = function(offset) {
      var timezone = timezone_enum_1.timezones.get(offset);
      this._currentTimezone = timezone;
    };
    TimezoneService.prototype.getTimezone = function(isoString) {
      if (isoString == null) {
        return null;
      }
      var offsetText = '-' + _.last(isoString.split('-'));
      return timezone_enum_1.timezones.get(offsetText);
    };
    TimezoneService.prototype.getMomentTimezone = function(isoString) {
      var timezone = this.getTimezone(isoString);
      return timezone != null ? timezone.momentName : null;
    };
    TimezoneService.prototype.buildMomentWithTimezone = function(dateValue, timezone, format) {
      var previousTimezone;
      var previousOffset;
      if (_.isString(dateValue)) {
        previousTimezone = this.getTimezone(dateValue);
      }
      if (previousTimezone != null) {
        previousOffset = previousTimezone.offsetMinutes;
      } else {
        previousOffset = moment(dateValue, format).utcOffset();
      }
      var dateWithNewTimezone = moment(dateValue, format).tz(timezone.momentName);
      var offsetDifferenceBetweenOriginalAndNewTimezones = previousOffset - dateWithNewTimezone.utcOffset();
      dateWithNewTimezone.add(offsetDifferenceBetweenOriginalAndNewTimezones, 'minutes');
      return dateWithNewTimezone;
    };
    return TimezoneService;
  }());
  exports.TimezoneService = TimezoneService;
  exports.timezoneService = new TimezoneService();
  exports.timezoneToken = new core_1.OpaqueToken('A service for working with timezones');
  exports.TIMEZONE_PROVIDER = new core_1.Provider(exports.timezoneToken, {useClass: TimezoneService});
  return module.exports;
});

System.registerDynamic("utilities/services/logger/logger.service", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var Logger = (function() {
    function Logger() {
      this.console = console;
    }
    Logger.prototype.log = function(message) {
      this.console.log(message);
    };
    return Logger;
  }());
  exports.Logger = Logger;
  exports.loggerToken = new core_1.OpaqueToken('An injectable logger for logging messages to the console');
  exports.LOGGER_PROVIDER = new core_1.Provider(exports.loggerToken, {useClass: Logger});
  return module.exports;
});

System.registerDynamic("utilities/services/notification/notification.service", ["@angular/core", "../window/window.provider", "../logger/logger.service"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var window_provider_1 = $__require('../window/window.provider');
  var logger_service_1 = $__require('../logger/logger.service');
  var NotificationService = (function() {
    function NotificationService(window, logger) {
      this.window = window;
      this.logger = logger;
    }
    NotificationService.prototype.info = function(message) {
      this.notify(message);
    };
    NotificationService.prototype.warning = function(message) {
      this.notify(message);
    };
    NotificationService.prototype.error = function(message) {
      this.notify(message);
    };
    NotificationService.prototype.success = function(message) {
      this.notify(message);
    };
    NotificationService.prototype.notify = function(message) {
      this.window.alert(message);
      this.logger.log(message);
    };
    NotificationService = __decorate([core_1.Injectable(), __param(0, core_1.Inject(window_provider_1.windowToken)), __param(1, core_1.Inject(logger_service_1.loggerToken)), __metadata('design:paramtypes', [Window, Object])], NotificationService);
    return NotificationService;
  }());
  exports.NotificationService = NotificationService;
  exports.notificationServiceToken = new core_1.OpaqueToken('Notification Service');
  exports.NOTIFICATION_PROVIDER = new core_1.Provider(exports.notificationServiceToken, {useClass: NotificationService});
  return module.exports;
});

System.registerDynamic("utilities/services/validation/validator", ["lodash"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var Validator = (function() {
    function Validator(showError) {
      this.showError = showError;
      this.validationHandlers = {};
      this.nextKey = 0;
    }
    Validator.prototype.validate = function() {
      var _this = this;
      var isValid = true;
      _.each(this.validationHandlers, function(handler) {
        var isActive = _this.isActive(handler);
        if (isActive && !handler.validate()) {
          isValid = false;
          var error = _this.errorMessage(handler);
          _this.showError(error, handler.name);
          return false;
        }
      });
      return isValid;
    };
    Validator.prototype.getErrorCount = function() {
      var _this = this;
      return _.reduce(this.validationHandlers, function(count, handler) {
        var isActive = _this.isActive(handler);
        if (isActive && !handler.validate()) {
          count++;
        }
        return count;
      }, 0);
    };
    Validator.prototype.registerValidationHandler = function(handler) {
      var _this = this;
      var currentKey = this.nextKey;
      this.nextKey++;
      this.validationHandlers[currentKey] = handler;
      return function() {
        _this.unregister(currentKey);
      };
    };
    Validator.prototype.unregister = function(key) {
      delete this.validationHandlers[key];
    };
    Validator.prototype.isActive = function(handler) {
      return (_.isFunction(handler.isActive) && handler.isActive()) || handler.isActive == null || handler.isActive === true;
    };
    Validator.prototype.errorMessage = function(handler) {
      return _.isFunction(handler.errorMessage) ? handler.errorMessage() : handler.errorMessage;
    };
    return Validator;
  }());
  exports.Validator = Validator;
  return module.exports;
});

System.registerDynamic("utilities/services/validation/compositeValidator", ["lodash", "./validator"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _ = $__require('lodash');
  var validator_1 = $__require('./validator');
  var CompositeValidator = (function() {
    function CompositeValidator(showError) {
      this.showError = showError;
      this.childValidators = {};
      this.nextKey = 0;
    }
    CompositeValidator.prototype.validate = function() {
      var isValid = true;
      _.each(this.childValidators, function(handler) {
        if (!handler.validate()) {
          isValid = false;
          return false;
        }
      });
      return isValid;
    };
    CompositeValidator.prototype.getErrorCount = function() {
      return _.reduce(this.childValidators, function(count, handler) {
        return count += handler.getErrorCount();
      }, 0);
    };
    CompositeValidator.prototype.buildChildValidator = function() {
      var _this = this;
      var validator = new validator_1.Validator(function(error) {
        _this.showError(error);
      });
      var currentKey = this.nextKey;
      this.nextKey++;
      this.childValidators[currentKey] = validator;
      validator.key = currentKey;
      return validator;
    };
    CompositeValidator.prototype.unregisterChild = function(validator) {
      delete this.childValidators[validator.key];
    };
    return CompositeValidator;
  }());
  exports.CompositeValidator = CompositeValidator;
  return module.exports;
});

System.registerDynamic("utilities/services/validation/validation.service", ["@angular/core", "../notification/notification.service", "./validator", "./compositeValidator"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var __param = (this && this.__param) || function(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  };
  var core_1 = $__require('@angular/core');
  var notification_service_1 = $__require('../notification/notification.service');
  var validator_1 = $__require('./validator');
  var compositeValidator_1 = $__require('./compositeValidator');
  var ValidationService = (function() {
    function ValidationService(notification) {
      this.notification = notification;
    }
    ValidationService.prototype.buildNotificationWarningValidator = function() {
      var _this = this;
      return new validator_1.Validator(function(error) {
        _this.notification.warning(error);
      });
    };
    ValidationService.prototype.buildNotificationErrorValidator = function() {
      var _this = this;
      return new validator_1.Validator(function(error) {
        _this.notification.error(error);
      });
    };
    ValidationService.prototype.buildCustomValidator = function(showError) {
      return new validator_1.Validator(showError);
    };
    ValidationService.prototype.buildCompositeNotificationWarningValidator = function() {
      var _this = this;
      return new compositeValidator_1.CompositeValidator(function(error) {
        _this.notification.warning(error);
      });
    };
    ValidationService.prototype.buildCompositeNotificationErrorValidator = function() {
      var _this = this;
      return new compositeValidator_1.CompositeValidator(function(error) {
        _this.notification.error(error);
      });
    };
    ValidationService.prototype.buildCompositeCustomValidator = function(showError) {
      return new compositeValidator_1.CompositeValidator(showError);
    };
    ValidationService = __decorate([core_1.Injectable(), __param(0, core_1.Inject(notification_service_1.notificationServiceToken)), __metadata('design:paramtypes', [Object])], ValidationService);
    return ValidationService;
  }());
  exports.ValidationService = ValidationService;
  exports.validationToken = new core_1.OpaqueToken('Service for building validation rules');
  exports.VALIDATION_PROVIDER = new core_1.Provider(exports.validationToken, {useClass: ValidationService});
  return module.exports;
});

System.registerDynamic("utilities/services/window/window.provider", ["@angular/core"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  exports.windowToken = new core_1.OpaqueToken('The browser window');
  exports.WINDOW_PROVIDER = new core_1.Provider(exports.windowToken, {useValue: window});
  return module.exports;
});

System.registerDynamic("utilities/utilitiesDowngrade", ["@angular/core", "angular", "./filters/isEmpty/isEmpty", "./filters/truncate/truncate", "./services/array/array.service", "./services/boolean/boolean.service", "./services/dataContracts/resourceBuilder/resourceBuilder.service", "./services/date/date.service", "./services/errorHandler/errorHandler.service", "./services/genericSearchFilter/genericSearchFilter.service", "./services/guid/guid.service", "./services/logger/logger.service", "./services/notification/notification.service", "./services/number/number.service", "./services/object/object.service", "./services/observable/observable.service", "./services/redirect/redirect.service", "./services/string/string.service", "./services/synchronizedRequests/synchronizedRequests.service", "./services/time/time.service", "./services/timezone/timezone.service", "./services/validation/validation.service", "./services/window/window.provider"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core_1 = $__require('@angular/core');
  var angular = $__require('angular');
  var isEmpty_1 = $__require('./filters/isEmpty/isEmpty');
  var truncate_1 = $__require('./filters/truncate/truncate');
  var array_service_1 = $__require('./services/array/array.service');
  var boolean_service_1 = $__require('./services/boolean/boolean.service');
  var resourceBuilder_service_1 = $__require('./services/dataContracts/resourceBuilder/resourceBuilder.service');
  var date_service_1 = $__require('./services/date/date.service');
  var errorHandler_service_1 = $__require('./services/errorHandler/errorHandler.service');
  var genericSearchFilter_service_1 = $__require('./services/genericSearchFilter/genericSearchFilter.service');
  var guid_service_1 = $__require('./services/guid/guid.service');
  var logger_service_1 = $__require('./services/logger/logger.service');
  var notification_service_1 = $__require('./services/notification/notification.service');
  var number_service_1 = $__require('./services/number/number.service');
  var object_service_1 = $__require('./services/object/object.service');
  var observable_service_1 = $__require('./services/observable/observable.service');
  var redirect_service_1 = $__require('./services/redirect/redirect.service');
  var string_service_1 = $__require('./services/string/string.service');
  var synchronizedRequests_service_1 = $__require('./services/synchronizedRequests/synchronizedRequests.service');
  var time_service_1 = $__require('./services/time/time.service');
  var timezone_service_1 = $__require('./services/timezone/timezone.service');
  var validation_service_1 = $__require('./services/validation/validation.service');
  var window_provider_1 = $__require('./services/window/window.provider');
  exports.isEmptyFilterName = 'isEmpty';
  exports.truncateFilterName = 'truncate';
  exports.arrayServiceName = 'rlArrayService';
  exports.booleanServiceName = 'rlBooleanService';
  exports.resourceBuilderServiceName = 'rlResourceBuilderService';
  exports.dateServiceName = 'rlDateService';
  exports.errorHandlerServiceName = 'rlErrorHandlerService';
  exports.genericSearchFilterServiceName = 'rlGenericSearchFilterService';
  exports.guidServiceName = 'rlGuidService';
  exports.httpServiceName = 'rlHttpService';
  exports.notificationServiceName = 'rlNotificationService';
  exports.numberServiceName = 'rlNumberService';
  exports.objectServiceName = 'rlObjectService';
  exports.observableServiceName = 'rlObservableService';
  exports.stringServiceName = 'rlStringService';
  exports.synchronizedRequestsServiceName = 'rlSynchronizedRequestsService';
  exports.timeServiceName = 'rlTimeService';
  exports.timezoneServiceName = 'rlTimezoneService';
  exports.validationServiceName = 'rlValidationService';
  exports.moduleName = 'rl.utilities';
  var utilitiesModule = angular.module(exports.moduleName, []);
  function PipeDowngrader(pipe) {
    return function(value) {
      var args = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      return pipe.transform.apply(pipe, [value].concat(args));
    };
  }
  exports.PipeDowngrader = PipeDowngrader;
  function downgradeUtilitiesToAngular1(upgradeAdapter) {
    var observableFactoryProvider = new core_1.Provider(observable_service_1.observableToken, {useValue: {
        deps: [core_1.ExceptionHandler],
        getInstance: function(exceptionHandler) {
          return new observable_service_1.ObservableService(exceptionHandler);
        }
      }});
    upgradeAdapter.addProvider(array_service_1.ARRAY_PROVIDER);
    upgradeAdapter.addProvider(boolean_service_1.BOOLEAN_PROVIDER);
    upgradeAdapter.addProvider(resourceBuilder_service_1.RESOURCE_BUILDER_PROVIDER);
    upgradeAdapter.addProvider(date_service_1.DATE_PROVIDER);
    upgradeAdapter.addProvider(errorHandler_service_1.ERROR_HANDLER_PROVIDER);
    upgradeAdapter.addProvider(errorHandler_service_1.DEFAULT_ERROR_PROVIDERS);
    upgradeAdapter.addProvider(errorHandler_service_1.DEFAULT_LOGIN_URL_PROVIDERS);
    upgradeAdapter.addProvider(genericSearchFilter_service_1.GENERIC_SEARCH_FILTER_PROVIDER);
    upgradeAdapter.addProvider(guid_service_1.GUID_PROVIDER);
    upgradeAdapter.addProvider(logger_service_1.LOGGER_PROVIDER);
    upgradeAdapter.addProvider(notification_service_1.NOTIFICATION_PROVIDER);
    upgradeAdapter.addProvider(number_service_1.NUMBER_PROVIDER);
    upgradeAdapter.addProvider(object_service_1.OBJECT_PROVIDER);
    upgradeAdapter.addProvider(observableFactoryProvider);
    upgradeAdapter.addProvider(redirect_service_1.REDIRECT_PROVIDER);
    upgradeAdapter.addProvider(string_service_1.STRING_PROVIDER);
    upgradeAdapter.addProvider(synchronizedRequests_service_1.SYNCHRONIZED_REQUESTS_PROVIDER);
    upgradeAdapter.addProvider(time_service_1.TIME_PROVIDER);
    upgradeAdapter.addProvider(timezone_service_1.TIMEZONE_PROVIDER);
    upgradeAdapter.addProvider(validation_service_1.VALIDATION_PROVIDER);
    upgradeAdapter.addProvider(window_provider_1.WINDOW_PROVIDER);
    utilitiesModule.filter(exports.isEmptyFilterName, PipeDowngrader(new isEmpty_1.IsEmptyPipe(object_service_1.objectUtility)));
    utilitiesModule.filter(exports.truncateFilterName, PipeDowngrader(new truncate_1.TruncatePipe(object_service_1.objectUtility)));
    utilitiesModule.factory(exports.arrayServiceName, upgradeAdapter.downgradeNg2Provider(array_service_1.ARRAY_PROVIDER));
    utilitiesModule.factory(exports.booleanServiceName, upgradeAdapter.downgradeNg2Provider(boolean_service_1.BOOLEAN_PROVIDER));
    utilitiesModule.factory(exports.resourceBuilderServiceName, upgradeAdapter.downgradeNg2Provider(resourceBuilder_service_1.RESOURCE_BUILDER_PROVIDER));
    utilitiesModule.factory(exports.dateServiceName, upgradeAdapter.downgradeNg2Provider(date_service_1.DATE_PROVIDER));
    utilitiesModule.factory(exports.errorHandlerServiceName, upgradeAdapter.downgradeNg2Provider(errorHandler_service_1.ERROR_HANDLER_PROVIDER));
    utilitiesModule.factory(exports.genericSearchFilterServiceName, upgradeAdapter.downgradeNg2Provider(genericSearchFilter_service_1.GENERIC_SEARCH_FILTER_PROVIDER));
    utilitiesModule.factory(exports.guidServiceName, upgradeAdapter.downgradeNg2Provider(guid_service_1.GUID_PROVIDER));
    utilitiesModule.factory(exports.notificationServiceName, upgradeAdapter.downgradeNg2Provider(notification_service_1.NOTIFICATION_PROVIDER));
    utilitiesModule.factory(exports.numberServiceName, upgradeAdapter.downgradeNg2Provider(number_service_1.NUMBER_PROVIDER));
    utilitiesModule.factory(exports.objectServiceName, upgradeAdapter.downgradeNg2Provider(object_service_1.OBJECT_PROVIDER));
    utilitiesModule.factory(exports.observableServiceName, upgradeAdapter.downgradeNg2Provider(observableFactoryProvider));
    utilitiesModule.factory(exports.stringServiceName, upgradeAdapter.downgradeNg2Provider(string_service_1.STRING_PROVIDER));
    utilitiesModule.factory(exports.synchronizedRequestsServiceName, upgradeAdapter.downgradeNg2Provider(synchronizedRequests_service_1.SYNCHRONIZED_REQUESTS_PROVIDER));
    utilitiesModule.factory(exports.timeServiceName, upgradeAdapter.downgradeNg2Provider(time_service_1.TIME_PROVIDER));
    utilitiesModule.factory(exports.timezoneServiceName, upgradeAdapter.downgradeNg2Provider(timezone_service_1.TIMEZONE_PROVIDER));
    utilitiesModule.factory(exports.validationServiceName, upgradeAdapter.downgradeNg2Provider(validation_service_1.VALIDATION_PROVIDER));
  }
  exports.downgradeUtilitiesToAngular1 = downgradeUtilitiesToAngular1;
  return module.exports;
});

System.registerDynamic("utilities/vendor", ["rxjs/add/operator/map", "rxjs/add/operator/toPromise"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('rxjs/add/operator/map');
  $__require('rxjs/add/operator/toPromise');
  return module.exports;
});

System.registerDynamic("utilities/main", ["./behaviors/behaviors.module", "./filters/filters.module", "./services/services.module", "./types/types.module", "./utilitiesDowngrade", "./vendor"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var behaviors = $__require('./behaviors/behaviors.module');
  exports.behaviors = behaviors;
  var filters = $__require('./filters/filters.module');
  exports.filters = filters;
  var services = $__require('./services/services.module');
  exports.services = services;
  var types = $__require('./types/types.module');
  exports.types = types;
  var downgrade = $__require('./utilitiesDowngrade');
  exports.downgrade = downgrade;
  $__require('./vendor');
  return module.exports;
});

//# sourceMappingURL=utilities.js.map