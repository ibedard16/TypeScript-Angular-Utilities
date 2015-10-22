var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseSingletonData_service_1 = require('../baseSingletonDataService/baseSingletonData.service');
var BaseParentSingletonDataService = (function (_super) {
    __extends(BaseParentSingletonDataService, _super);
    function BaseParentSingletonDataService($http, $q, endpoint, mockData, resourceDictionaryBuilder, transform, useMock) {
        _super.call(this, $http, $q, endpoint, mockData, transform, useMock);
        this.resourceDictionaryBuilder = resourceDictionaryBuilder;
    }
    BaseParentSingletonDataService.prototype.childContracts = function () {
        return this.resourceDictionaryBuilder(this.endpoint);
    };
    return BaseParentSingletonDataService;
})(baseSingletonData_service_1.BaseSingletonDataService);
exports.BaseParentSingletonDataService = BaseParentSingletonDataService;
//# sourceMappingURL=baseParentSingletonData.service.js.map