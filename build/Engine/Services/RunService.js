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
                instance.FrameTasks.forEach((value, index) => {
                    value(Game);
                });
            });
        };
        instance.Frame = function () {
            const process = instance.ProcessInstancesUnder.GetDescendents();
            instance.InstanceLogic(process);
        };
        return instance;
    }
};
export { RunServiceFactory };
