import { Enum, EnumDrawType } from "../Data/Enum"
import { Instance, InstanceInstance } from "./Instance"

// Instance with a position (x, y), velocity (xv, yv), and a size (width, height)

interface InstanceInstance2d extends InstanceInstance {
    x?: number,
    y?: number,

    xv?: number,
    yv?: number,

    Width?: number,
    Height?: number,

    DrawType?: EnumDrawType,
}

const Instance2d = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        const instance: InstanceInstance2d = Instance.new(Name, Id, Parent)
        instance.x = 0
        instance.y = 0

        instance.xv = 0
        instance.yv = 0

        instance.Width = 0
        instance.Height = 0

        instance.DrawType = Enum.DrawType.Rectangle

        return instance
    }
}

export {InstanceInstance2d, Instance2d}