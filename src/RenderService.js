import { Convert } from "./Utils.js"
import { ComputeStorage, Enum } from "./Data.js"
import { Screen, canvas } from "./Instance2d.js"

const RenderService = {
    "LoadImage": function(directory) {
        const image = document.createElement("img")
        image.src = directory
        image.classname = "loadedimage"

        loadedimages.appendChild(image)
        ComputeStorage.RenderService.LoadedImages[directory] = image

        return image
    },

    "Draw": function(drawframe) {
        const ctx = canvas.getContext("2d")

        if(Screen.Camera && !drawframe.Gui) {
            ctx.translate(((drawframe.Position.x - Screen.Camera.Position.x) * (Screen.Camera.Zoom / 100)) + Screen.Size.x / 2, ((drawframe.Position.y - Screen.Camera.Position.y) * (Screen.Camera.Zoom / 100)) + Screen.Size.y / 2)
        } else {
            ctx.translate(drawframe.Position.x + Screen.Size.x / 2, drawframe.Position.y + Screen.Size.y / 2)
        }

        ctx.rotate(drawframe.Rotation * Math.PI / 180)

        if(drawframe.DrawData.DrawType == Enum.DrawType.Rectangle) {
            ctx.fillStyle = Convert.RgbToHex(drawframe.DrawData.Type)

            if(Screen.Camera && !drawframe.Gui) {
                ctx.fillRect((-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100))
            } else {
                ctx.fillRect(-drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y)
            }
        }

        if(drawframe.DrawData.DrawType == Enum.DrawType.Image) {
            if(!ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]) {
                RenderService.LoadImage(drawframe.DrawData.Type)
            }

            const image = ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]

            ctx.fillStyle = drawframe.DrawData.Type
            ctx.imageSmoothingEnabled = true
            ctx.mozImageSmoothingEnabled = true
            ctx.webkitImageSmoothingEnabled = true

            if(Screen.Camera && !drawframe.Gui) {
                ctx.drawImage(image, (-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100))
            } else {
                ctx.drawImage(image, -drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y)
            }
        }

        if(drawframe.DrawData.DrawType == Enum.DrawType.PixelImage) {
            if(!ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]) {
                RenderService.LoadImage(drawframe.DrawData.Type)
            }

            const image = ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]

            ctx.fillStyle = drawframe.DrawData.Type
            ctx.imageSmoothingEnabled = false
            ctx.mozImageSmoothingEnabled = false
            ctx.webkitImageSmoothingEnabled = false

            if(Screen.Camera && !drawframe.Gui) {
                ctx.drawImage(image, (-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100))
            } else {
                ctx.drawImage(image, -drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y)
            }
        }

        //ctx.rotate(-drawframe.Rotation * Math.PI / 180)
        ctx.resetTransform()

        // if(Screen.Camera && !drawframe.Gui) {
        //     ctx.translate(-drawframe.Position.x - Screen.Camera.Position.x, -drawframe.Position.y - Screen.Camera.Position.y)
        // } else {
        //     ctx.translate(-drawframe.Position.x, -drawframe.Position.y)
        // }
    }
}

export {RenderService}