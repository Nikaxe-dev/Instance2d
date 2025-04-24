import { GameFactory } from "./Services/Game.js";
const Instance2dEngine = {
    new: function (Canvas, Name, Id) {
        const game = GameFactory.new(Canvas);
        return game;
    }
};
export { Instance2dEngine };
