import { Vector2 } from "./Data.js"
import { Screen } from "./Instance2d.js"

const InputService = {
    "Mouse": {
        "Position": Vector2.new(),
        // "TruePosition": Vector2.new(),
        // "PointPosition": Vector2.new(),

        get TruePosition() {
            return Vector2.new(InputService.Mouse.Position.x + Screen.Camera.Position.x, InputService.Mouse.Position.y + Screen.Camera.Position.y)
        },

        get PointPosition() {
            return InputService.Mouse.TruePosition.Takeaway(Vector2.new(window.innerWidth / 2, window.innerHeight / 2))
        },

        "Button1Down": false,
        "Button2Down": false,
        "Button3Down": false,
        "ScrollwheelVelocity": 0,
    },

    "Keyboard": {
        "Inputs": {

        },
    },

    "KeyDown": function(key) {
        return InputService.Keyboard.Inputs[key] == true
    },

    "BeginListen": function() {
        window.addEventListener('keydown', function (e) {
            InputService.Keyboard.Inputs[e.key.toLowerCase()] = true
        }, true)
    
        window.addEventListener('keyup', function (e) {
            InputService.Keyboard.Inputs[e.key.toLowerCase()] = false
        }, true)
        
        addEventListener("mousedown", function (e) {
            if(e.button == 0) {
                InputService.Mouse.Button1Down = true
            }

            if(e.button == 1) {
                InputService.Mouse.Button3Down = true
            }

            if(e.button == 2) {
                InputService.Mouse.Button2Down = true
            }
        })
    
        addEventListener("mouseup", function (e) {
            if(e.button == 0) {
                InputService.Mouse.Button1Down = false
            }

            if(e.button == 1) {
                InputService.Mouse.Button3Down = false
            }

            if(e.button == 2) {
                InputService.Mouse.Button2Down = false
            }
        })

        document.body.onmousemove = function (e) {
            InputService.Mouse.Position = Vector2.new(e.clientX, e.clientY)
        }

        addEventListener("wheel", function (e) {
            InputService.Mouse.ScrollwheelVelocity = (e.deltaY / 102) * -1

            setTimeout(function (e) {
                InputService.Mouse.ScrollwheelVelocity = 0
            }, 50)
        })
        
        // setInterval(function() {
        //     if(Screen.Camera) {
        //         InputService.Mouse.TruePosition = Vector2.new(InputService.Mouse.Position.x + Screen.Camera.Position.x, InputService.Mouse.Position.y + Screen.Camera.Position.y)
        //         InputService.Mouse.PointPosition = InputService.Mouse.TruePosition.Takeaway(Vector2.new(window.innerWidth / 2, window.innerHeight / 2))
        //     }
        // }, 10)
    },
}

export {InputService}