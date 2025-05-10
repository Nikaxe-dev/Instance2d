import { Instance2dEngine } from "../../Engine/Instance2d";
import { InstanceGame } from "../../Engine/Services/Game";
import { InstanceInputService } from "../../Engine/Services/InputService";


const game: InstanceGame = Instance2dEngine.instance(document.getElementById("canvas") as HTMLCanvasElement)

const inputservice: InstanceInputService = game.InputService

function gameloop() {
    game.Screen.Height = window.innerHeight
    game.Screen.Width = window.innerWidth

    game.RunService.Frame()

    console.log(inputservice.Mouse.PositionX, inputservice.Mouse.PositionY)
    console.log(inputservice.Mouse.Button1Down, inputservice.Mouse.Button2Down, inputservice.Mouse.Button3Down)
    console.log(inputservice.Keyboard)
}

game.Start(gameloop)