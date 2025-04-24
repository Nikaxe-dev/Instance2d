import {Game, Instance, InputService, Screen, RunService, Nowhere, Color3, Vector2, Enum, DrawData} from '/src/bundle.js'
Game.BackgroundColor3 = Color3.new(0, 0, 0)
RunService.TargetFrameRate = 60
RunService.GameSpeed = 1
Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

Game.Init(document.getElementById("canvas"))

const gravity = 2.5

let objects = Instance.new({
    Id: "objects",
    Type: "folder",
    Parent: Screen,
})

let camera = Instance.Camera2d.new({
    Id: "Camera",
    Type: "Camera",
    Position: Vector2.new(0, 0),
    Rotation: 0,
    RotVelocity: 0,
    Velocity: Vector2.new(),
    Zoom: 50,
    Parent: Screen
})

for(let i = 0; i < 5; i++) {
    let object = Instance.Sprite2d.new({
        Id: Math.random(),
        Type: "point",
        Position: Vector2.new(Math.random() * 500 - 250, Math.random() * 500 - 250),
        Size: Vector2.new(Math.random() * 25 - 12.5),
        Velocity: Vector2.new(Math.random() * 10 - 5, Math.random() * 10 - 5),
        DrawData: DrawData.new(Enum.DrawType.Rectangle, Color3.new(255, 255, 255)),
        Parent: objects
    })

    object.Script = function(speed) {
        for(const [id, other] of Object.entries(objects.GetChildren())) {
            const takeawayvector = Vector2.new(other.Position.x - object.Position.x, other.Position.y - object.Position.y)

            const direction = Vector2.new(takeawayvector.x / takeawayvector.Magnitude, takeawayvector.y / takeawayvector.Magnitude)

            if(isNaN(direction.x) || isNaN(direction.y)) {continue}

            object.Velocity.x += direction.x * gravity * speed
            object.Velocity.y += direction.y * gravity * speed
        }
    }
}

function gameloop() {
    Screen.Size = Vector2.new(window.innerWidth, window.innerHeight)

    RunService.frame()
}

Game.Start(gameloop)