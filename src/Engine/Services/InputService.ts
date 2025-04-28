import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceInputService extends InstanceService {
    
}

const InputServiceFactory = {
    new: function(Parent: InstanceGame) {
        let instance = Service.new("InputService", Parent) as InstanceInputService

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = InputServiceFactory

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceInputService, InputServiceFactory}