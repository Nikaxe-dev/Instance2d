import { Enum, EnumDrawType } from "../Data/Enum.js"
import { Instance, InstanceInstance } from "./Instance.js"
import { Instance2d, InstanceInstance2d } from "./Instance2d.js"

// Instance with a position (x, y), velocity (xv, yv), and a size (width, height)

interface InstanceSprite2d extends InstanceInstance2d {
    Width?: number,
    Height?: number,

    DrawType?: EnumDrawType,
}

const Sprite2d = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        const instance: InstanceSprite2d = Instance2d.new(Name, Id, Parent)
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

export {InstanceSprite2d, Sprite2d}