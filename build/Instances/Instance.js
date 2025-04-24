"use strict";
// Base of all instances
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance = void 0;
const Instance = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        let instance = {
            Name: Name,
            Id: Id,
            Parent: Parent
        };
        return instance;
    }
};
exports.Instance = Instance;
