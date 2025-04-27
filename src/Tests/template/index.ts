import { Color3 } from "../../Engine/Data/DataTypes/Color3.js";
import { DrawData } from "../../Engine/Data/DataTypes/DrawData.js";
import { Enum } from "../../Engine/Data/Enum.js";
import { Instance2dEngine } from "../../Engine/Instance2d.js";
import { Sprite2d } from "../../Engine/Instances/Sprite2d.js";
import { InstanceGame } from "../../Engine/Services/Game.js";

const game: InstanceGame = Instance2dEngine.instance(document.getElementById("canvas") as HTMLCanvasElement)
game.Screen.BackgroundColor3 = Color3.new(255, 255, 255)

const player = Sprite2d.new("Player", "Player", game.Screen)
player.xv = 1
player.yv = -1

player.Width = 100
player.Height = 100

player.x = 10
player.y = 10
player.DrawData = DrawData.new(Enum.DrawType.Rectangle, Color3.new(255, 0, 0), false, true)

player.AddFrameTask("gravity", () => {
    console.log(player.x, player.y)
})

function gameloop() {
    game.Screen.Width = window.innerWidth
    game.Screen.Height = window.innerHeight

    game.RunService.Frame()
}

game.Start(gameloop)