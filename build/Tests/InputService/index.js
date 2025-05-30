import { Instance2dEngine } from "../../Engine/Instance2d";
const game = Instance2dEngine.instance(document.getElementById("canvas"));
const inputservice = game.InputService;
function gameloop() {
    game.Screen.Height = window.innerHeight;
    game.Screen.Width = window.innerWidth;
    game.RunService.Frame();
    console.log(inputservice.Mouse.PositionX, inputservice.Mouse.PositionY);
    console.log(inputservice.Mouse.Button1Down, inputservice.Mouse.Button2Down, inputservice.Mouse.Button3Down);
    console.log(inputservice.Keyboard);
}
game.Start(gameloop);
