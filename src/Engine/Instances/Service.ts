import { Instance, InstanceInstance } from "./Instance.js"

// Service instance

// Used as a base class for all services

interface InstanceService extends InstanceInstance {
    
}

const Service = {
    new: function(Name: string = "Instance", Parent: InstanceInstance | null = null) {
        let instance = Instance.new(Name, Name, Parent) as InstanceService

        return instance
    }
}

export {InstanceService, Service}