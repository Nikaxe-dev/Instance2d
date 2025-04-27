import { RenderInstance } from "../Instances/RenderInstance.js";
import { Service } from "../Instances/Service.js";
const RunServiceFactory = {
    new: function (Game) {
        let instance = Service.new("RunService", Game);
        instance.DeltaTime = 1;
        instance.GameSpeed = 1;
        instance.FrameTimeout = 1 / 60;
        instance.ProcessInstancesUnder = Game.Screen;
        instance.InstanceLogic = function (instances) {
            instances.forEach((instance, index) => {
                for (const [key, value] of Object.entries(instance.FrameTasks)) {
                    value(Game);
                }
            });
        };
        instance.InstanceRendering = function (instances) {
            instances.forEach((instance, index) => {
            });
        };
        instance.Frame = function () {
            const process = instance.ProcessInstancesUnder.GetDescendents();
            instance.InstanceLogic(process);
            const render = process.filter(instance => instance.IsA(RenderInstance));
            Game.RenderService.Render(render);
        };
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = RunServiceFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { RunServiceFactory };
