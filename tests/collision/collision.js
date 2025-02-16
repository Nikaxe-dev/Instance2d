// Import Instance2d's and set the games properties.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from '/Instance2d.js'
Game.BackgroundColor3 = Color3.new(0, 0, 0)
RunService.TargetFrameRate = 120
RunService.GameSpeed = 1
Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

// Initialize the game.

Game.Init(document.getElementById("canvas"))

let sprite2d = Instance.Sprite2d.new({
    Id: 1934665,
    Type: "a",
    Position: Vector2.new(0, 0),
    Parent: Screen,
    Rotation: 0,
    RotVelocity: 0,
    Velocity: Vector2.new(0),
    Size: Vector2.new(50, 50),
    CollisionType: Enum.CollisionType.Defined,
    DrawData: DrawData.new(Enum.DrawType.Rectangle, Color3.new(255, 255, 255))
})

sprite2d.Script = function() {
    console.log(InputService.Mouse.CenteredPosition.x, InputService.Mouse.CenteredPosition.y)

    if(sprite2d.Colliding(InputService.Mouse.CenteredPosition)) {
        sprite2d.DrawData.Type = Color3.new(0, 255, 0)
    } else {
        sprite2d.DrawData.Type = Color3.new(255, 0, 0)
    }
}

let sprite2dcollision1 = Instance.Sprite2d.new({
    Id: 26453445,
    Type: "a",
    Position: Vector2.new(500, 100),
    Parent: Screen,
    Rotation: 0,
    RotVelocity: 0,
    Velocity: Vector2.new(-2.5, 0),
    Size: Vector2.new(50, 50),
    CollisionType: Enum.CollisionType.Defined,
    DrawData: DrawData.new(Enum.DrawType.Rectangle, Color3.new(255, 255, 255))
})

sprite2dcollision1.Script = function(speed) {
    if(sprite2dcollision1.Colliding(sprite2dcollision2)) {
        sprite2dcollision1.DrawData.Type = Color3.new(0, 255, 0)
    } else {
        sprite2dcollision1.DrawData.Type = Color3.new(255, 0, 0)
    }

    sprite2dcollision1.Velocity.x = -125 * speed
}

let sprite2dcollision2 = Instance.Sprite2d.new({
    Id: 6356345,
    Type: "a",
    Position: Vector2.new(-500, 100),
    Parent: Screen,
    Rotation: 0,
    RotVelocity: 0,
    Velocity: Vector2.new(2.5, 0),
    Size: Vector2.new(50, 50),
    CollisionType: Enum.CollisionType.Defined,
    DrawData: DrawData.new(Enum.DrawType.Rectangle, Color3.new(255, 255, 255))
})

sprite2dcollision2.Script = function(speed) {
    if(sprite2dcollision2.Colliding(sprite2dcollision1)) {
        sprite2dcollision2.DrawData.Type = Color3.new(0, 255, 0)
    } else {
        sprite2dcollision2.DrawData.Type = Color3.new(255, 0, 0)
    }

    sprite2dcollision2.Velocity.x = 125 * speed
}

function gameloop() {
    // Set the screens size (optional)
    Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

    RunService.frame()
}

// Start the game.

Game.Start(gameloop)