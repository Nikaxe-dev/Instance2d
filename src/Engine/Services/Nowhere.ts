import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceNowhere extends InstanceService {

}

const NowhereFactory = {
    new: function(Parent: InstanceGame) {
        let instance: InstanceNowhere = Service.new("Nowhere", Parent)

        return instance
    }
}

export {InstanceNowhere, NowhereFactory}