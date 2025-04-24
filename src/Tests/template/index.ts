import { Instance2dEngine } from "../../Engine/Instance2d.js";
import { InstanceSprite2d, Sprite2d } from "../../Engine/Instances/Sprite2d.js";
import { InstanceGame } from "../../Engine/Services/Game.js";

const game: InstanceGame = Instance2dEngine.new(document.getElementById("canvas"))

const player: InstanceSprite2d = Sprite2d.new("Player", "Player", game.Screen)

console.log(game)
console.log(game.Screen)