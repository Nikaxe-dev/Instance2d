import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceNowhere, NowhereFactory } from "./Nowhere.js"
import { InstanceRunService, RunServiceFactory } from "./RunService.js"
import { InstanceScreen, ScreenFactory } from "./Screen.js"

interface InstanceGame extends InstanceService {
    Start(gameloop: Function): any,

    Screen: InstanceScreen,
    Nowhere: InstanceNowhere,
    RunService: InstanceRunService,
}

const GameFactory = {
    new: function(Canvas: HTMLElement | HTMLCanvasElement | null) {
        let instance = Service.new("Game", null) as InstanceGame

        ScreenFactory.new(instance)
        NowhereFactory.new(instance)
        RunServiceFactory.new(instance)

        instance.Screen.Canvas = Canvas
        instance.RunService.ProcessInstancesUnder = instance.Screen

        instance.Start = function(gameloop: Function) {
            setInterval(gameloop, instance.RunService.FrameTimeout)
        }

        return instance
    }
}

export {InstanceGame, GameFactory}