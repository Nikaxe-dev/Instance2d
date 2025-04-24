import { GameFactory, InstanceGame } from "./Services/Game"
import { InstanceInstance } from "./Instances/Instance"

interface Instace2d {
    new: Function,
}

const Instance2d: Instace2d = {
    new: function(screen: HTMLCanvasElement, name: string, id: string) {
        const game: InstanceGame = GameFactory.new(name, id)

        return game
    }
}

export {Instance2d}