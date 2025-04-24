"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance2d = void 0;
const Game_1 = require("./Services/Game");
const Instance2d = {
    new: function (screen, name, id) {
        const game = Game_1.GameFactory.new(name, id);
        return game;
    }
};
exports.Instance2d = Instance2d;
