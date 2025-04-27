import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceNowhere extends InstanceService {

}

const NowhereFactory = {
    new: function(Parent: InstanceGame) {
        let instance = Service.new("Nowhere", Parent) as InstanceNowhere

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = NowhereFactory

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceNowhere, NowhereFactory}