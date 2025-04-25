import { Instance2dEngine } from "../../Engine/Instance2d.js";
import { Sprite2d } from "../../Engine/Instances/Sprite2d.js";
const game = Instance2dEngine.instance(document.getElementById("canvas"));
const player = Sprite2d.new("Player", "Player", game.Screen);
player.xv = 5;
player.yv = 1;
player.SetAttribute("Speed", 5);
console.log(player.GetAttribute("Speed"), player.GetAttributes());
console.log(game);
console.log(game.GetDescendents());
function gameloop() {
    console.log(player.x, player.y);
    game.RunService.Frame();
}
game.Start(gameloop);
