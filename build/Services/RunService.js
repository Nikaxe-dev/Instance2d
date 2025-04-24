"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunServiceFactory = void 0;
const Service_1 = require("../Instances/Service");
const RunServiceFactory = {
    new: function (Name = "Instance", Id = "Instance", Parent) {
        let instance = Service_1.Service.new(Name, Id, Parent);
        return instance;
    }
};
exports.RunServiceFactory = RunServiceFactory;
