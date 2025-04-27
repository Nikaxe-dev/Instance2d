import { Service } from "../Instances/Service.js";
import { NowhereFactory } from "./Nowhere.js";
import { RunServiceFactory } from "./RunService.js";
import { ScreenFactory } from "./Screen.js";
const GameFactory = {
    new: function (Canvas) {
        let instance = Service.new("Game", null);
        ScreenFactory.new(instance);
        NowhereFactory.new(instance);
        RunServiceFactory.new(instance);
        instance.Screen.Canvas = Canvas;
        instance.RunService.ProcessInstancesUnder = instance.Screen;
        instance.Start = function (gameloop) {
            setInterval(gameloop, instance.RunService.FrameTimeout);
        };
        return instance;
    }
};
export { GameFactory };
