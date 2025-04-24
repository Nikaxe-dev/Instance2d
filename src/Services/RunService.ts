import { InstanceInstance } from "../Instances/Instance"
import { InstanceService, Service } from "../Instances/Service"
import { InstanceGame } from "./Game"

interface InstanceRunService extends InstanceService {
    
}

const RunServiceFactory = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceGame) {
        let instance: InstanceRunService = Service.new(Name, Id, Parent)

        return instance
    }
}

export {InstanceRunService, RunServiceFactory}