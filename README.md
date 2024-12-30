![image](/images/Text_And_Icon.svg)

---

## Introduction

Instance2d is a JavaScript framework where each game object (referred to as an Instance) can have a parent and a child, allowing you to organize your games in various ways.

[Website](https://nikaxe.is-a.dev/Instance2d/)

## Using it

To include this framework in your code, simply add this to the start of your script:

```js
import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from 'https://nikaxe-dev.github.io/Instance2d/Instance2d.js'
```

Just make sure that the `type` attribute of your `html` script tag is `module`

Example:

```html
<script type="module">
    import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from 'https://nikaxe-dev.github.io/Instance2d/Instance2d.js'
    // blah blah blah
</script>
```

## Documentation

For detailed documentation, please visit the [Instance2d Wiki](https://github.com/Nikaxe-dev/Instance2d/wiki).

## Example: Simple Player Controller

Here's an example of a very simple player controler written using this framework

[Try it out](https://nikaxe-dev.github.io/Instance2d/examples/Basic_Player_Controller/)

```js
// Import Instance2d's modules and set the game up.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from 'https://nikaxe-dev.github.io/Instance2d/Instance2d.js'

// Set the games properties.

// Background Color
Game.BackgroundColor3 = Color3.new(0, 0, 0)

// Target Frame Rate
RunService.TargetFrameRate = 120
// Do Disable Right Click Menu
Game.DoDisableRightClickMenu = false

// Game Speed
RunService.GameSpeed = 1

// Initialize the game with the canvas and the gameloop function.

function gameloop() {
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
    DrawData: DrawData.new(Enum.DrawType.PixelImage, "/images/player.png"), // The draw data of the object. Find out more about DrawData in the documentation.
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
