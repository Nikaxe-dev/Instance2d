import { Instance, InstanceInstance } from "./Instance.js"
import { Instance2d, InstanceInstance2d } from "./Instance2d.js"

// Instance with a position (x, y) and velocity (xv, yv) that acts as a camera

interface InstanceCamera2d extends InstanceInstance2d {
    Zoom: number
}

const Camera2d = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        const instance = Instance2d.new(Name, Id, Parent) as InstanceCamera2d
        instance.Zoom = 100

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = Camera2d

        return instance
    },

    Derived: Instance2d,
    Base: Instance2d
}

export {InstanceCamera2d, Camera2d}