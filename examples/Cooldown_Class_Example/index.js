// Import Instance2d's and set the games properties.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from 'https://instance2d.js.org/Instance2d.js'
Game.BackgroundColor3 = Color3.new(0, 0, 0)
RunService.TargetFrameRate = 60
RunService.GameSpeed = 1
Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

// Initialize the game.

Game.Init(document.getElementById("canvas"))

// Create a cooldown that runs "cooldown ended" every second.

let cooldown = Instance.Cooldown.new(
    {
        Id: "testcooldown", // Id
        Type: "cooldown", // Type
        Time: 1, // Time it takes to end (in seconds)
        Parent: Nowhere, // Parent
        Loop: true, // Controls whether the cooldown should loop or not

        // Function that runs when the cooldown ends.
        OnEnd: function() {
            console.log("Cooldown ended")
        }
    }
)

// Start the cooldown.
cooldown.Play()

function gameloop() {
    // Set the screens size (optional)
    Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

    RunService.frame()
}

// Start the game.

Game.Start(gameloop)