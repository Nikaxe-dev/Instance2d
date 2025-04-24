"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameFactory = void 0;
const Service_1 = require("../Instances/Service");
const GameFactory = {
    new: function (Name = "Instance", Id = "Instance") {
        let instance = Service_1.Service.new(Name, Id, null);
        return instance;
    }
};
exports.GameFactory = GameFactory;
