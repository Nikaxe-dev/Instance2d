import { GameFactory, InstanceGame } from "./Services/Game.js"
import { InstanceInstance } from "./Instances/Instance"

interface Instace2d {
    new: Function,
}

const Instance2dEngine: Instace2d = {
    new: function(Canvas: HTMLCanvasElement, Name: string, Id: string) {
        const game: InstanceGame = GameFactory.new(Canvas)

        return game
    }
}

export {Instance2dEngine}