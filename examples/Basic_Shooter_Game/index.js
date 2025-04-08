// Import Instance2d's modules and set the game up.

import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData, Utils} from '/src/Instance2d.js'

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

Game.Init(document.getElementById("canvas"))

function getenemycount() {
    return Object.keys(Screen.GetInstanceOfType("Enemy")).length
}

function vector2unit(vector, speed) {
    let vec = Vector2.new(vector.x, vector.y)
    let magnitude = vec.Magnitude
    vec.x = vec.x / magnitude
    vec.y = vec.y / magnitude

    vec.x = vec.x * speed
    vec.y = vec.y * speed

    return vec
}

function gameloop() {
    // Set the screens size (optional)
    Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

    RunService.frame()
}

function enemy() {
    let instance = Instance.Sprite2d.new({
        Id: "Enemy.." + Math.random() * 1000,
        Type: "Enemy",
        Position: Vector2.new(player.Position.x + Math.random() * 2000 - 1000, player.Position.y + Math.random() * 2000 - 1000),
        Rotation: 90,
        RotVelocity: 0,
        Size: Vector2.new(75, 75),
        Velocity: Vector2.new(),
        DrawData: DrawData.new(Enum.DrawType.PixelImage, "./Icon.svg"),
        ZIndex: 9,
        CollisionType: Enum.CollisionType.Rectangle,
        Parent: Nowhere
    })

    instance.Speed = 500
    instance.Health = 10
    instance.MultiSpeed = 1

    instance.Collision = function(speed) {
        let colliding = instance.GetAllCollidingInstances()

        for(const [key, value] of Object.entries(colliding)) {
            if(value.Type == "Bullet") {
                let force = Vector2.new((-value.Position.x - instance.Position.x) / 5, (-value.Position.y - instance.Position.y) / 5)
                instance.ApplyForce(force)
                instance.Health -= 1
                value.Destroy()
            }
        }
    }

    instance.Script = function(speed) {
        let velocity = Vector2.new(player.Position.x - instance.Position.x, player.Position.y - instance.Position.y)
        velocity = vector2unit(velocity, instance.Speed)
        velocity = Vector2.new(velocity.x * speed * instance.MultiSpeed, velocity.y * speed * instance.MultiSpeed)
        instance.MultiSpeed += (Math.random() * 0.05) - 0.025
        instance.MultiSpeed = Math.min(Math.max(instance.MultiSpeed, 0.25), 1.75)

        instance.ApplyForce(Vector2.new((velocity.x - instance.Velocity.x) / 2, (velocity.y - instance.Velocity.y) / 2))

        instance.Collision()

        if(instance.Health < 1) {
            instance.Destroy()
        }
    }

    return instance
}

function spawnenemies(amount) {
    for(let i = 0; i < amount; i++) {
        let instance = enemy()
        instance.Parent = Screen
    }
}

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

player.Shoot = function(speed) {
    //Shooting function for the player

    let bullet = Instance.Sprite2d.new({
        Id: "Bullet" + Math.random() * 10000,
        Type: "Bullet",
        Position: Vector2.new(player.Position.x, player.Position.y),
        Rotation: 90,
        RotVelocity: 0,
        Size: Vector2.new(50, 50),
        Velocity: vector2unit(InputService.Mouse.PointPosition.Takeaway(player.Position), 20),
        DrawData: DrawData.new(Enum.DrawType.PixelImage, "./player.png"),
        ZIndex: 10,
        CollisionType: Enum.CollisionType.Rectangle,
        Parent: Screen,
    })

    let bulletdestruction = Instance.Cooldown.new({
        Id: "DebreeCooldown" + Math.random() * 10000,
        Type: "PlayerCooldown",
        Parent: Screen,
        Time: 5,
        Loop: false,
    
        OnEnd: function() {
            bullet.Destroy()
            bulletdestruction.Destroy()
        },
    })

    bulletdestruction.Play()
}

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

// Shooting

let shootcooldown = Instance.Cooldown.new({
    Id: "ShootingCooldown",
    Type: "PlayerCooldown",
    Parent: Screen,
    Time: 0.1,
    Loop: true,

    OnEnd: function() {
        if(InputService.Mouse.Button1Down) {
            // Run the player.Shoot function declared.
    
            player.Shoot()
        }
    },
})

spawnenemies(5)

shootcooldown.Play()

console.log(Game)
console.log(player.GetAncestors())

// Start the game.

Game.Start(gameloop)