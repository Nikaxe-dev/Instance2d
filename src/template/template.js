// Import Instance2d's and set the games properties.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from 'https://instance2d.js.org/Instance2d.js'
Game.BackgroundColor3 = Color3.new(0, 0, 0)
RunService.TargetFrameRate = 60
RunService.GameSpeed = 1
Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

// Initialize the game.

Game.Init(document.getElementById("canvas"))

function gameloop() {
    // Set the screens size (optional)
    Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

    RunService.frame()
}

// Start the game.

Game.Start(gameloop)