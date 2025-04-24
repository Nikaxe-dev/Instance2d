import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceNowhere extends InstanceService {

}

const NowhereFactory = {
    new: function(Parent: InstanceGame) {
        let instance = Service.new("Nowhere", Parent) as InstanceNowhere

        return instance
    }
}

export {InstanceNowhere, NowhereFactory}