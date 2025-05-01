import { InstanceGame } from "../Services/Game.js"
import { Instance, InstanceInstance } from "./Instance.js"

// Instance with a position (x, y) and velocity (xv, yv), and rotation (r, rv)

interface InstanceInstance2d extends InstanceInstance {
    x: number,
    y: number,
    Rotation: number,

    xv: number,
    yv: number,
    RotVelocity: number,
}

const Instance2d = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        const instance = Instance.new(Name, Id, Parent) as InstanceInstance2d
        instance.x = 0
        instance.y = 0
        instance.xv = 0
        instance.yv = 0
        instance.Rotation = 0
        instance.RotVelocity = 0

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = Instance2d

        // FrameTasks

        instance.AddFrameTask("Velocity", (Game: InstanceGame) => {
            instance.x += instance.xv
            instance.y += instance.yv

            instance.Rotation += instance.RotVelocity

            if(instance.Rotation > 360) {
                instance.Rotation = 0
            }
        })

        return instance
    },

    Derived: Instance,
    Base: Instance,
}

export {InstanceInstance2d, Instance2d}