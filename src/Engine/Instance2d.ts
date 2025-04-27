import { GameFactory, InstanceGame } from "./Services/Game.js"
import { InstanceInstance } from "./Instances/Instance"

interface Instace2d {
    instance(Canvas: HTMLCanvasElement | null): any,
}

const Instance2dEngine: Instace2d = {
    instance: function(Canvas) {
        const game: InstanceGame = GameFactory.new(Canvas)

        return game
    }
}

export {Instance2dEngine}