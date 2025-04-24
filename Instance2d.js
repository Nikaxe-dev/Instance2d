// Shortcut for importing Instance2d.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData, DrawFrame} from '/src/Instance2d.js'

if(typeof window.Instance2d !== "undefined") {
    window.Instance2d.Game = Game
    
    window.Instance2d.Color3 = Color3
    window.Instance2d.Vector2 = Vector2
    window.Instance2d.DrawData = DrawData
    window.Instance2d.DrawFrame = DrawFrame
    window.Instance2d.Enum = Enum
}

export {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData, DrawFrame}