"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Game = {
    new: function (Name = "Instance", Id = "Instance") {
        let instance = {
            Name: Name,
            Id: Id,
            Parent: null
        };
        return instance;
    }
};
exports.Game = Game;
