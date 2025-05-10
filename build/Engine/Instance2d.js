import { GameFactory } from "./Services/Game.js";
const Instance2dEngine = {
    instance: function (Canvas) {
        const game = GameFactory.new(Canvas);
        return game;
    }
};
export { Instance2dEngine };
