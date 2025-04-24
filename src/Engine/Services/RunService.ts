import { InstanceInstance } from "../Instances/Instance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceRunService extends InstanceService {
    
}

const RunServiceFactory = {
    new: function(Parent: InstanceGame) {
        let instance: InstanceRunService = Service.new("RunService", Parent)

        return instance
    }
}

export {InstanceRunService, RunServiceFactory}