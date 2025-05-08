import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

interface InputServiceMouse {
    PositionX: number
    PositionY: number

    Button1Down: boolean
    Button2Down: boolean
    Button3Down: boolean
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

            Button1Down: false,
            Button2Down: false,
            Button3Down: false,
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