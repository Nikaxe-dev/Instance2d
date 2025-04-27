import { Color3 } from "../../Engine/Data/DataTypes/Color3.js";
import { DrawData } from "../../Engine/Data/DataTypes/DrawData.js";
import { Enum } from "../../Engine/Data/Enum.js";
import { Instance2dEngine } from "../../Engine/Instance2d.js";
import { Sprite2d } from "../../Engine/Instances/Sprite2d.js";
import { InstanceGame } from "../../Engine/Services/Game.js";

const game: InstanceGame = Instance2dEngine.instance(document.getElementById("canvas"))

const player = Sprite2d.new("Player", "Player", game.Screen)
player.xv = 5
player.yv = 0
player.DrawData = DrawData.new(Enum.DrawType.Rectangle, Color3.new(255, 0, 0), false, true)

player.AddFrameTask("gravity", () => {
    player.yv -= 1
})

function gameloop() {


    game.RunService.Frame()
}

game.Start(gameloop)