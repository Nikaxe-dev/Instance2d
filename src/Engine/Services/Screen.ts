import { InstanceCamera2d } from "../Instances/Camera2d.js"
import { Instance, InstanceInstance } from "../Instances/Instance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InstanceScreen extends InstanceService {
    Camera: InstanceCamera2d | null
}

const ScreenFactory = {
    new: function(Parent: InstanceGame) {
        let instance = Service.new("Screen", Parent) as InstanceScreen
        instance.Camera = null

        return instance
    }
}

export {InstanceScreen, ScreenFactory}