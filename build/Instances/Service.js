"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const Instance_1 = require("./Instance");
const Service = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        let instance = Instance_1.Instance.new(Name, Id, Parent);
        return instance;
    }
};
exports.Service = Service;
