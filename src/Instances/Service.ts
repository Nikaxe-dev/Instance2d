import { Instance, InstanceInstance } from "./Instance"

// Service instance

// Used as a base class for all services

interface InstanceService extends InstanceInstance {
    
}

const Service = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        let instance: InstanceService = Instance.new(Name, Id, Parent)

        return instance
    }
}

export {InstanceService, Service}