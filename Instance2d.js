const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const loadedimages = document.createElement("div")
loadedimages.style.display = "none"
loadedimages.id = "loadedimages"

document.body.appendChild(loadedimages)

document.addEventListener('contextmenu', event => event.preventDefault())

import { Enum, Vector2, Color3, DrawData, DrawFrame, ComputeStorage } from "./Data.js"
import { Convert } from "./Utils.js"

import { Nowhere } from "./Nowhere.js"
import { Instance } from "./Instance.js"
import { Screen } from "./Screen.js"
import { RenderService } from "./RenderService.js"
import { RunService } from "./RunService.js"
import { InputService } from "./InputService.js"

Instance.giveinstance(Screen, "Screen", "Screen", "Service")
Instance.giveinstance(Instance, "Instance", "Instance", "Service")
Instance.giveinstance(Nowhere, "Nowhere", "Nowhere", "Service")
Instance.giveinstance(RunService, "RunService", "RunService", "Service")
Instance.giveinstance(RenderService, "RenderService", "RenderService", "Service")
Instance.giveinstance(InputService, "InputService", "InputService", "Service")

const Game = {
    "BackgroundColor3": Color3.new(255, 255, 255),

    "Screen": Screen,
    "Instance": Instance,
    "Nowhere": Nowhere,
    "RunService": RunService,
    "RenderService": RenderService,
    "InputService": InputService,
}

//Draw background to avoid flashes when reloading the page.
RenderService.Draw(DrawFrame.new(DrawData.new(Enum.DrawType.Rectangle, Game.BackgroundColor3), Vector2.new(canvas.width / 2, canvas.height / 2), 0, Vector2.new(canvas.width, canvas.height), true))

Instance.giveinstance(Game, "Game", "Game", "Service")
InputService.BeginListen()

export {Game, Screen, Instance, RunService, RenderService, InputService, Color3, Vector2, DrawData, Enum, ComputeStorage}