"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
var Contract = /** @class */ (function () {
    function Contract() {
        this.metadata = {
            name: 'AAA',
            symbol: 'BBB'
        };
    }
    Contract.prototype.getMetadata = function () {
        return this.metadata;
    };
    return Contract;
}());
exports.Contract = Contract;
//# sourceMappingURL=contract.js.map