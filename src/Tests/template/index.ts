import { Instance2dEngine } from "../../Engine/Instance2d.js";
import { InstanceSprite2d, Sprite2d } from "../../Engine/Instances/Sprite2d.js";
import { InstanceGame } from "../../Engine/Services/Game.js";

const game: InstanceGame = Instance2dEngine.new(document.getElementById("canvas"))

const player = Sprite2d.new("Player", "Player", game.Screen)
player.xv = 5
player.yv = 1

player.SetAttribute("Speed", 5)

console.log(player.GetAttribute("Speed"), player.GetAttributes())

console.log(game)

game.Start()