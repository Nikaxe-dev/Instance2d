import { Enum, EnumRenderingType } from "../Data/Enum.js"
import { InstanceInstance } from "../Instances/Instance.js"
import { InstanceRenderInstance, RenderInstance } from "../Instances/RenderInstance.js"
import { InstanceService, Service } from "../Instances/Service.js"
import { InstanceGame } from "./Game.js"

const LoadedImagesDiv: HTMLDivElement = document.createElement("div")
LoadedImagesDiv.id = "instances2d/images"
LoadedImagesDiv.style.display = "none"

interface InstanceRenderService extends InstanceService {
    Canvas: HTMLCanvasElement | null
    RenderInstancesUnder: InstanceInstance
    RenderingType: EnumRenderingType
    Ctx: CanvasRenderingContext2D | WebGL2RenderingContext

    Render(instances: InstanceRenderInstance[]): undefined
    Init(Game: InstanceGame): undefined

    LoadedImagesDiv: HTMLDivElement
    LoadedImages: { [key: string]: HTMLImageElement }
    LoadImage(url: string): HTMLImageElement
}

const RenderServiceFactory = {
    new: function(Game: InstanceGame) {
        let instance = Service.new("RenderService", Game) as InstanceRenderService
        instance.RenderInstancesUnder = Game.Screen
        instance.RenderingType = Enum.RenderingType.Canvas

        const Screen = Game.Screen

        instance.LoadedImages = {

        }

        instance.LoadedImagesDiv = LoadedImagesDiv

        instance.LoadImage = function(url) {
            if(instance.LoadedImages[url] != undefined) {
                return instance.LoadedImages[url]
            }

            let image = document.createElement("img")
            image.src = url

            LoadedImagesDiv.appendChild(image)

            instance.LoadedImages[url] = image

            return image
        }

        instance.Init = function(Game) {
            if(!this.Canvas) { return }

            if(instance.RenderingType == Enum.RenderingType.Canvas) {
                instance.Ctx = instance.Canvas?.getContext("2d") as CanvasRenderingContext2D
            }
        }

        instance.Render = (instances) => {
            if(!instance.Canvas) { return }

            instance.Canvas.width = Game.Screen.Width
            instance.Canvas.height = Game.Screen.Height

            if(instance.Ctx instanceof CanvasRenderingContext2D) {
                instance.Ctx.fillStyle = "rgb(" + Screen.BackgroundColor3.r + "," + Screen.BackgroundColor3.g + "," + Screen.BackgroundColor3.b + "," + Screen.BackgroundColor3.a + ")"
                instance.Ctx.fillRect(0, 0, Screen.Width, Screen.Height)
            }

            instances.forEach((value, index) => {
                if(value.IsA(RenderInstance)) {
                    if(value.DrawData.Render) {
                        value.Render(Game, instance.Ctx)
                    }
                }
            })
        }

        instance.Derived = this.Derived
        instance.Base = this.Base
        instance.Class = RenderServiceFactory

        return instance
    },

    Derived: Service,
    Base: Service
}

export {InstanceRenderService, RenderServiceFactory}