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
            addEventListener("keydown", function(event: KeyboardEvent) {
                instance.Keyboard[event.key] = true
                instance.Keyboard[event.key.toLowerCase()] = true
            })

            addEventListener("keyup", function(event: KeyboardEvent) {
                instance.Keyboard[event.key] = false
                instance.Keyboard[event.key.toLowerCase()] = false
            })

            addEventListener("mousemove", function(event: MouseEvent) {
                instance.Mouse.PositionX = event.x
                instance.Mouse.PositionY = event.y
            })

            addEventListener("mousedown", function(event: MouseEvent) {
                
            })
        }

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = InputServiceFactory

        instance.Init()

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceInputService, InputServiceFactory}