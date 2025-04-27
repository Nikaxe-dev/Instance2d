import { Instance, InstanceInstance } from "./Instance.js"

// Service instance

// Used as a base class for all services

interface InstanceService extends InstanceInstance {
    
}

const Service = {
    new: function(Name: string = "Instance", Parent: InstanceInstance | null = null) {
        let instance = Instance.new(Name, Name, Parent) as InstanceService

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = Service

        return instance
    },

    Derived: Instance,
    Base: Instance
}

export {InstanceService, Service}