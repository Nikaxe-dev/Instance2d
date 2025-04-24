// Import Instance2d's and set the games properties.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from '/Instance2d.js'
Game.BackgroundColor3 = Color3.new(0, 0, 0)
RunService.TargetFrameRate = 120
RunService.GameSpeed = 1
Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

// Initialize the game.

Game.Init(document.getElementById("canvas"))

let text1 = Instance.Text.new({
    Id: "TextOne",
    Type: "Text",
    Position: Vector2.new(0, 100),
    Parent: Screen,
    Rotation: 0,
    RotVelocity: 0,
    Size: Vector2.new(200, 50),
    Text: "Hello, World!",
    Font: "48px Serif",
    DrawData: DrawData.new(Enum.DrawType.Text, Color3.new(255, 255, 255))
})

function gameloop() {
    // Set the screens size (optional)
    Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

    RunService.frame()
}

// Start the game.

Game.Start(gameloop)