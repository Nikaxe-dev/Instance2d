"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance2d = void 0;
const Enum_1 = require("../Data/Enum");
const Instance_1 = require("./Instance");
const Instance2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = Instance_1.Instance.new(Name, Id, Parent);
        instance.x = 0;
        instance.y = 0;
        instance.xv = 0;
        instance.yv = 0;
        instance.Width = 0;
        instance.Height = 0;
        instance.DrawType = Enum_1.Enum.DrawType.Rectangle;
        return instance;
    }
};
exports.Instance2d = Instance2d;
