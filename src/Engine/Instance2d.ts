import { GameFactory, InstanceGame } from "./Services/Game.js"
import { InstanceInstance } from "./Instances/Instance"

interface Instance2d {
    instance(Canvas: HTMLCanvasElement | null): any,
}

const Instance2dEngine: Instance2d = {
    instance: function(Canvas): InstanceGame {
        const game: InstanceGame = GameFactory.new(Canvas)

        return game
    }
}

export {Instance2dEngine}