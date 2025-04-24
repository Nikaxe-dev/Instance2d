import { Instance2d } from "../../Engine/Instance2d.js";
import { InstanceGame } from "../../Engine/Services/Game.js";

const game: InstanceGame = Instance2d.new(document.getElementById("canvas"))

console.log(game)
console.log(game.Screen)