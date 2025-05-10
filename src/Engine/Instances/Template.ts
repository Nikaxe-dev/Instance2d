import { Instance, InstanceInstance } from "./Instance.js"

// Used as a template for all instances

interface InstanceTemplate extends InstanceInstance {
    
}

const Service = {
    new: function(Name: string = "Instance", Id: string = "", Parent: InstanceInstance | null = null) {
        let instance = Instance.new(Name, Id, Parent) as InstanceTemplate

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = Service

        return instance
    },

    Derived: Instance,
    Base: Instance
}

export {InstanceTemplate, Service}