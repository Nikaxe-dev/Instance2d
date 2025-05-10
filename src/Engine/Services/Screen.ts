import { Color3, DataColor3 } from "../Data/DataTypes/Color3.js"
import { InstanceCamera2d } from "../Instances/Camera2d.js"
import { Instance, InstanceInstance } from "../Instances/Instance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceScreen extends InstanceService {
    Camera: InstanceCamera2d | null

    Width: number
    Height: number

    BackgroundColor3: DataColor3
}

const ScreenFactory = {
    new: function(Parent: InstanceGame) {
        let instance = Service.new("Screen", Parent) as InstanceScreen
        instance.Camera = null

        instance.Width = window.innerWidth
        instance.Height = window.innerHeight

        instance.BackgroundColor3 = Color3.new(0, 0, 0)

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = ScreenFactory

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceScreen, ScreenFactory}