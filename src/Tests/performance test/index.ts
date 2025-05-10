import { Color3 } from "../../Engine/Data/DataTypes/Color3.js";
import { DrawData } from "../../Engine/Data/DataTypes/DrawData.js";
import { Enum } from "../../Engine/Data/Enum.js";
import { Instance2dEngine } from "../../Engine/Instance2d.js";
import { InstanceSprite2d, Sprite2d } from "../../Engine/Instances/Sprite2d.js";
import { InstanceGame } from "../../Engine/Services/Game.js";
import { MagnitudeVector2 } from "../../Engine/Utils.js";

const game: InstanceGame = Instance2dEngine.instance(document.getElementById("canvas") as HTMLCanvasElement)

const gravity = 2.5

function createparticle() {
    let particle = Sprite2d.new("Particle" + Math.random() * 1000, "Particle" + Math.random() * 1000, game.Screen)
    particle.Width = 10
    particle.Height = 10

    particle.x = 0
    particle.y = 0

    particle.RotVelocity = 100

    particle.DrawData = DrawData.new(Enum.DrawType.PixelImage, false, true)
    particle.DrawData.ImageURL = "/images/ExampleResources/player.png"

    particle.xv = Math.random() * 1.25 - 0.625
    particle.yv = Math.random() * 1.25 - 0.625

    particle.AddFrameTask("random", () => {
        game.Screen.GetChildren().forEach((other, index) => {
            if(other.IsExactlyA(Sprite2d)) {
                const takeawayvectorx = (other as InstanceSprite2d).x - particle.x
                const takeawayvectory = (other as InstanceSprite2d).y - particle.y

                const directionx = takeawayvectorx / MagnitudeVector2(takeawayvectorx, takeawayvectory)
                const directiony = takeawayvectory / MagnitudeVector2(takeawayvectorx, takeawayvectory)

                if(isNaN(directionx) || isNaN(directiony)) {return}

                particle.xv += directionx * gravity * game.RunService.Speed
                particle.yv += directiony * gravity * game.RunService.Speed
            }
        })
    })
}

for(let i = 0; i < 2; i++) {
    createparticle()
}

function gameloop() {
    game.Screen.Width = window.innerWidth
    game.Screen.Height = window.innerHeight

    game.RunService.Frame()

    console.log(game.RunService.DeltaTime, game.Screen.GetChildren().length)

    createparticle()
}

game.Start(gameloop)