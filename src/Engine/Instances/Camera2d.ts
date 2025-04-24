import { Instance, InstanceInstance } from "./Instance.js"
import { InstanceInstance2d } from "./Instance2d.js"

// Instance with a position (x, y) and velocity (xv, yv) that acts as a camera

interface InstanceCamera2d extends InstanceInstance2d {
    Zoom?: number
}

const Instance2d = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        const instance: InstanceCamera2d = Instance.new(Name, Id, Parent)
        instance.x = 0
        instance.y = 0

        instance.xv = 0
        instance.yv = 0

        instance.Zoom = 100

        return instance
    }
}

export {InstanceCamera2d, Instance2d}