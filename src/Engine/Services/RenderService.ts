import { InstanceInstance } from "../Instances/Instance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceRenderService extends InstanceService {
    RenderInstancesUnder: InstanceInstance

    Render(instances: InstanceInstance[]): undefined
}

const RenderServiceFactory = {
    new: function(Game: InstanceGame) {
        let instance = Service.new("RenderService", Game) as InstanceRenderService
        instance.RenderInstancesUnder = Game.Screen

        instance.Render = (instances) => {
            instances.forEach((value, index) => {

            })
        }

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = RenderServiceFactory

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceRenderService, RenderServiceFactory}