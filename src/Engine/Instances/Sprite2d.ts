import { DataDrawData, DrawData } from "../Data/DataTypes/DrawData.js"
import { Enum, EnumDrawType } from "../Data/Enum.js"
import { RgbToHex } from "../Utils.js"
import { Instance, InstanceInstance } from "./Instance.js"
import { Instance2d, InstanceInstance2d } from "./Instance2d.js"
import { InstanceRenderInstance, RenderInstance } from "./RenderInstance.js"

// Instance with a position (x, y), velocity (xv, yv), and a size (width, height)

interface InstanceSprite2d extends InstanceRenderInstance {
    Width: number
    Height: number
}

const Sprite2d = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        const instance = RenderInstance.new(Name, Id, Parent) as InstanceSprite2d
        instance.Width = 0
        instance.Height = 0

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = Sprite2d

        instance.Render = (game, context) => {
            if(context instanceof CanvasRenderingContext2D) {
                if(instance.DrawData.Type == Enum.DrawType.Rectangle) {
                    if(instance.DrawData.Data instanceof Object) {
                        context.fillStyle = RgbToHex(instance.DrawData.Data)
                        context.globalAlpha = instance.DrawData.Data.a
                    } else {
                        context.fillStyle = instance.DrawData.Data
                    }

                    context.fillRect(instance.x, -instance.y, instance.Width, instance.Height)
                }
            }
        }

        return instance
    },

    Derived: RenderInstance,
    Base: RenderInstance,
}

export {InstanceSprite2d, Sprite2d}