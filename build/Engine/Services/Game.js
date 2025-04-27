import { Service } from "../Instances/Service.js";
import { NowhereFactory } from "./Nowhere.js";
import { RenderServiceFactory } from "./RenderService.js";
import { RunServiceFactory } from "./RunService.js";
import { ScreenFactory } from "./Screen.js";
const GameFactory = {
    new: function (Canvas) {
        let instance = Service.new("Game", null);
        ScreenFactory.new(instance);
        NowhereFactory.new(instance);
        RunServiceFactory.new(instance);
        RenderServiceFactory.new(instance);
        instance.RenderService.Canvas = Canvas;
        instance.RenderService.Init(instance);
        instance.RunService.ProcessInstancesUnder = instance.Screen;
        instance.Start = function (gameloop) {
            setInterval(gameloop, instance.RunService.FrameTimeout);
        };
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = GameFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { GameFactory };
