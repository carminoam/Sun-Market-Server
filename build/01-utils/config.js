"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Config = /** @class */ (function () {
    function Config() {
    }
    return Config;
}());
var DevelopmentConfig = /** @class */ (function (_super) {
    __extends(DevelopmentConfig, _super);
    function DevelopmentConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDevelopment = true;
        _this.connectionString = "mongodb://localhost:27017/sunmarket";
        return _this;
        // public connectionString = "mongodb+srv://noamcarmi:<noam7693>@cluster0.vnwgw.mongodb.net/test";
    }
    return DevelopmentConfig;
}(Config));
var ProductionConfig = /** @class */ (function (_super) {
    __extends(ProductionConfig, _super);
    function ProductionConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDevelopment = false;
        _this.connectionString = "mongodb+srv://noamcarmi:noam7693@sun-market-cluster.hxb0s.mongodb.net/sample_sun_market?retryWrites=true&w=majority";
        return _this;
        // public connectionString = "mongodb://localhost:27017/sunmarket";
    }
    return ProductionConfig;
}(Config));
var config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();
exports.default = config;
