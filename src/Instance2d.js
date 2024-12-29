let canvas = document.getElementById("canvas")

if(canvas) {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

const loadedimages = document.createElement("div")
loadedimages.style.display = "none"
loadedimages.id = "loadedimages"

document.body.appendChild(loadedimages)

import { Enum, Vector2, Color3, DrawData, DrawFrame, ComputeStorage } from "./Data.js"
import { Convert } from "./Utils.js"

import { Nowhere } from "./Nowhere.js"
import { Instance } from "./Instance.js"
import { Screen } from "./Screen.js"
import { RenderService } from "./RenderService.js"
import { RunService } from "./RunService.js"
import { InputService } from "./InputService.js"

const Game = {
    "BackgroundColor3": Color3.new(0, 0, 0),
    "DoDisableRightClickMenu": true,

    "Screen": Screen,
    "Instance": Instance,
    "Nowhere": Nowhere,
    "RunService": RunService,
    "RenderService": RenderService,
    "InputService": InputService,

    "Init": function(newcanvas) {
        // Initializes the game

        if(newcanvas) {
            canvas = newcanvas
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        Instance.giveinstance(Screen, "Screen", "Screen", "Service")
        Instance.giveinstance(Instance, "Instance", "Instance", "Service")
        Instance.giveinstance(Nowhere, "Nowhere", "Nowhere", "Service")
        Instance.giveinstance(RunService, "RunService", "RunService", "Service")
        Instance.giveinstance(RenderService, "RenderService", "RenderService", "Service")
        Instance.giveinstance(InputService, "InputService", "InputService", "Service")

        Instance.giveinstance(Game, "Game", "Game", "Service")

        if(Game.DoDisableRightClickMenu) {
            document.addEventListener("contextmenu", function(e) {
                e.preventDefault()
            })
        }

        //Draw background to avoid flashes when reloading the page.

        RenderService.Draw(DrawFrame.new(DrawData.new(Enum.DrawType.Rectangle, Game.BackgroundColor3), Vector2.new(0), 0, Vector2.new(canvas.width, canvas.height), true))

        //Begin listening for input

        InputService.BeginListen()
    },

    "Start": function(gameloop = function() { RunService.frame() }) {
        setInterval(gameloop, 1000 / RunService.TargetFrameRate)
    },

    set Canvas(canvas) {
        canvas = canvas
    },

    get Canvas() {
        return canvas
    },
}

export {Game, Screen, Instance, RunService, RenderService, InputService, Nowhere, Color3, Vector2, DrawData, Enum, ComputeStorage}