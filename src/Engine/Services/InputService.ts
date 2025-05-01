import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InputServiceMouse {
    PositionX: number
    PositionY: number
}

interface InstanceInputService extends InstanceService {
    Mouse: InputServiceMouse

    Keyboard: { [key: string]: boolean }

    Init(): undefined

    KeyDown(key: string): boolean
}

const InputServiceFactory = {
    new: function(Parent: InstanceGame) {
        let instance = Service.new("InputService", Parent) as InstanceInputService

        instance.Mouse = {
            PositionX: 0,
            PositionY: 0,

            
        }

        instance.Keyboard = {

        }

        instance.KeyDown = function(key) {
            return instance.Keyboard[key]
        }

        instance.Init = function() {

        }

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = InputServiceFactory

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceInputService, InputServiceFactory}