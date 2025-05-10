import { DataDrawData, DrawData } from "../Data/DataTypes/DrawData.js"
import { InstanceGame } from "../Services/Game.js"
import { Instance, InstanceInstance } from "./Instance.js"
import { Instance2d, InstanceInstance2d } from "./Instance2d.js"

// Used as a template for all instances

interface InstanceRenderInstance extends InstanceInstance2d {
    DrawData: DataDrawData

    Render(Game: InstanceGame, Context: WebGL2RenderingContext | CanvasRenderingContext2D): undefined
}

const RenderInstance = {
    new: function(Name: string = "Instance", Id: string = "", Parent: InstanceInstance | null = null) {
        let instance = Instance2d.new(Name, Id, Parent) as InstanceRenderInstance
        instance.DrawData = DrawData.new()

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = RenderInstance

        instance.Render = (Game) => {
            console.warn("Instance2dEngine: RenderInstance still has default function")
        }

        return instance
    },

    Derived: Instance2d,
    Base: Instance2d
}

export {InstanceRenderInstance, RenderInstance}