import { Service } from "../Instances/Service.js";
import { NowhereFactory } from "./Nowhere.js";
import { RunServiceFactory } from "./RunService.js";
import { ScreenFactory } from "./Screen.js";
const GameFactory = {
    new: function (Canvas) {
        let instance = Service.new("Game", null);
        instance.Canvas = Canvas;
        ScreenFactory.new(instance);
        NowhereFactory.new(instance);
        RunServiceFactory.new(instance);
        instance.Init = function () {
        };
        instance.Start = function () {
        };
        return instance;
    }
};
export { GameFactory };
