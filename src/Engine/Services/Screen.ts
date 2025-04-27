import { InstanceCamera2d } from "../Instances/Camera2d.js"
import { Instance, InstanceInstance } from "../Instances/Instance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceScreen extends InstanceService {
    Camera: InstanceCamera2d | null
    Canvas: HTMLElement | HTMLCanvasElement | null

    Width: number
    Height: number
}

const ScreenFactory = {
    new: function(Parent: InstanceGame) {
        let instance = Service.new("Screen", Parent) as InstanceScreen
        instance.Camera = null
        
        instance.Width = window.innerWidth
        instance.Height = window.innerHeight

        return instance
    }
}

export {InstanceScreen, ScreenFactory}