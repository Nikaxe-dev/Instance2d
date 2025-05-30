import { Camera2d } from "./Instances/Camera2d"
import { Instance } from "./Instances/Instance"
import { Instance2d } from "./Instances/Instance2d"
import { RenderInstance } from "./Instances/RenderInstance"
import { Service } from "./Instances/Service"
import { Sprite2d } from "./Instances/Sprite2d"

const Instances = {
    Instance: Instance,
    Instance2d: Instance2d,
    Camera2d: Camera2d,
    RenderInstance: RenderInstance,
    Service: Service,
    Sprite2d: Sprite2d,
}

export {Instances}