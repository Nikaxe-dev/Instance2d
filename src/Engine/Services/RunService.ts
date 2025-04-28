import { InstanceInstance } from "../Instances/Instance.js"
import { InstanceRenderInstance, RenderInstance } from "../Instances/RenderInstance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

let lastupdate = Date.now()

interface InstanceRunService extends InstanceService {
    DeltaTime: number,
    GameSpeed: number,
    Speed: number,
    FrameTimeout: number,

    ProcessInstancesUnder: InstanceInstance,

    Frame(): undefined,
    InstanceLogic(instances: InstanceInstance[]): undefined,
    InstanceRendering(instances: InstanceInstance[]): undefined
}

const RunServiceFactory = {
    new: function(Game: InstanceGame) {
        let instance = Service.new("RunService", Game) as InstanceRunService
        instance.DeltaTime = 1
        instance.GameSpeed = 1
        instance.Speed = 1
        instance.FrameTimeout = 1/60
        instance.ProcessInstancesUnder = Game.Screen

        instance.InstanceLogic = function(instances) {
            instances.forEach((instance, index) => {
                for(const [key, value] of Object.entries(instance.FrameTasks)) {
                    value(Game)
                }
            })
        }

        instance.InstanceRendering = function(instances) {
            instances.forEach((instance, index) => {

            })
        }

        instance.Frame = function() {
            const now = Date.now()
            const deltatime = now - lastupdate
            lastupdate = now

            instance.DeltaTime = deltatime / 1000
            instance.Speed = deltatime * instance.GameSpeed

            const process = instance.ProcessInstancesUnder.GetDescendents()
            instance.InstanceLogic(process)

            const render = process.filter(instance => instance.IsA(RenderInstance)) as InstanceRenderInstance[]
            Game.RenderService.Render(render)
        }

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = RunServiceFactory

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceRunService, RunServiceFactory}