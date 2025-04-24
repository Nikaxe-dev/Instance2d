import { Instance, InstanceInstance } from "./Instance.js"

// Instance with a position (x, y) and velocity (xv, yv)

interface InstanceInstance2d extends InstanceInstance {
    x: number,
    y: number,
    xv: number,
    yv: number,
}

const Instance2d = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        const instance = Instance.new(Name, Id, Parent) as InstanceInstance2d
        instance.x = 0
        instance.y = 0
        instance.xv = 0
        instance.yv = 0

        return instance
    }
}

export {InstanceInstance2d, Instance2d}