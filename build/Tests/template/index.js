import { Instance2dEngine } from "../../Engine/Instance2d.js";
import { Sprite2d } from "../../Engine/Instances/Sprite2d.js";
const game = Instance2dEngine.new(document.getElementById("canvas"));
const player = Sprite2d.new("Player", "Player", game.Screen);
console.log(game);
console.log(game.Screen);
