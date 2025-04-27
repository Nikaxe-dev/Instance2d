import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceRenderService extends InstanceService {

}

const RenderServiceFactory = {
    new: function(Game: InstanceGame) {
        let instance = Service.new("RenderService", Game) as InstanceRenderService

        return instance
    }
}

export {InstanceRenderService, RenderServiceFactory}