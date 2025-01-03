## Simple Player Controller

Example of a very simple player controler written using this framework

[Try it out](https://nikaxe-dev.github.io/Instance2d/examples/Basic_Player_Controller/)

```js
// Import Instance2d's modules and set the game up.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from '/Instance2d/Instance2d.js'

// Set the games properties.

// Background Color
Game.BackgroundColor3 = Color3.new(0, 0, 0)

// Target Frame Rate
RunService.TargetFrameRate = 120

// Do Disable Right Click Menu
Game.DoDisableRightClickMenu = false

// Set the screens size (defualts to the window size if not set)
Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

// Game Speed
RunService.GameSpeed = 1

// Initialize the game with the canvas and the gameloop function.

function gameloop() {
    // Set the screens size (optional but recommended)
    Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

    RunService.frame()
}

Game.Init(document.getElementById("canvas"))

// Create the player.

let player = Instance.Sprite2d.new({
    Id: "Player", // The Players Id. Make sure its unique because otherwise you risk overwriting other instances.
    Type: "Player", // The type. Used for general filtering of instances.
    Position: Vector2.new(), // The position. At 0, 0 this object with be at the center of the screen.
    Rotation: 90, // The rotation of the object.
    RotVelocity: 0, // The rotational velocity of the object.
    Size: Vector2.new(50, 50), // The size of the object.
    Velocity: Vector2.new(), // The velocity of the object.
    DrawData: DrawData.new(Enum.DrawType.PixelImage, "./player.png"), // The draw data of the object. Find out more about DrawData in the documentation.
    ZIndex: 10, // The ZIndex of the object. The higher the ZIndex the more in front the object will be.
    CollisionType: Enum.CollisionType.Rectangle, // The collision type of the object. Find out more about CollisionType in the documentation.
    Parent: Screen // The parent of the object. This is what the object is inside of. In this case it is the Screen.
})

player.Speed = 250 // Custom parameter for the player. This is the speed of the player that will be used in the players functions.

// The movement script for the player. This will be called every frame.

player.Script = function(speed) {
    // Check for player input and move the player accordingly.
    // Make sure to times this by the speed parameter (deltatime * RunService.GameSpeed)

    if(InputService.KeyDown("a")) {
        player.Velocity.x -= player.Speed * speed
    }

    if(InputService.KeyDown("d")) {
        player.Velocity.x += player.Speed * speed
    }

    if(InputService.KeyDown("w")) {
        player.Velocity.y -= player.Speed * speed
    }

    if(InputService.KeyDown("s")) {
        player.Velocity.y += player.Speed * speed
    }

    // Add some friction to the player so it isnt as fast.

    player.Velocity.x *= .75
    player.Velocity.y *= .75

    // Point the player towards the mouse.

    player.Rotation = player.Position.PointTowards(InputService.Mouse.PointPosition) - 270
}

// Start the game.

Game.Start(gameloop)
```

## Cooldown Example

Example of the `cooldown` class.

Open up the console to see the output. (CTRL + SHIFT + I)

[Try it out](https://nikaxe-dev.github.io/Instance2d/examples/Cooldown_Class_Example/)

```js
// Import Instance2d's and set the games properties.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from 'https://nikaxe-dev.github.io/Instance2d/Instance2d.js'
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
```
