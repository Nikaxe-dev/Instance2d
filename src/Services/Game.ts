import { InstanceService, Service } from "../Instances/Service"
import { InstanceInstance } from "../Instances/Instance"

interface InstanceGame extends InstanceService {
    
}

const GameFactory = {
    new: function(Name: string = "Instance", Id: string = "Instance") {
        let instance: InstanceGame = Service.new(Name, Id, null)

        return instance
    }
}

export {InstanceGame, GameFactory}