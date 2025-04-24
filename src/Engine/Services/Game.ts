import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceNowhere, NowhereFactory } from "./Nowhere.js"
import { InstanceRunService, RunServiceFactory } from "./RunService.js"
import { InstanceScreen, ScreenFactory } from "./Screen.js"

interface InstanceGame extends InstanceService {
    Canvas?: HTMLCanvasElement,
    Init?: Function,
    Start?: Function,

    Screen?: InstanceScreen,
    Nowhere?: InstanceNowhere,
    RunService?: InstanceRunService,
}

const GameFactory = {
    new: function(Canvas: HTMLCanvasElement) {
        let instance: InstanceGame = Service.new("Game", null)
        instance.Canvas = Canvas

        ScreenFactory.new(instance)
        NowhereFactory.new(instance)
        RunServiceFactory.new(instance)

        instance.Init = function() {

        }

        instance.Start = function() {
            
        }

        return instance
    }
}

export {InstanceGame, GameFactory}