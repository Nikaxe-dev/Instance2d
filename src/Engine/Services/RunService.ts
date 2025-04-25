import { InstanceInstance } from "../Instances/Instance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceRunService extends InstanceService {
    DeltaTime: number,
    GameSpeed: number,
    FrameTimeout: number,

    ProcessInstancesUnder: InstanceInstance,

    Frame(): undefined,
    InstanceLogic(instances: InstanceInstance[]): undefined,
}

const RunServiceFactory = {
    new: function(Game: InstanceGame) {
        let instance = Service.new("RunService", Game) as InstanceRunService
        instance.DeltaTime = 1
        instance.GameSpeed = 1
        instance.FrameTimeout = 1/60
        instance.ProcessInstancesUnder = Game.Screen

        instance.InstanceLogic = function(instances) {
            instances.forEach((instance, index) => {
                instance.FrameTasks.forEach((value, index) => {
                    value(Game)
                })
            })
        }

        instance.Frame = function() {
            const process = instance.ProcessInstancesUnder.GetDescendents()
            instance.InstanceLogic(process)
        }

        return instance
    }
}

export {InstanceRunService, RunServiceFactory}