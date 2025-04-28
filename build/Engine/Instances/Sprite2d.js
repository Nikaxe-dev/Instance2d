import { Enum } from "../Data/Enum.js";
import { RgbToHex } from "../Utils.js";
import { RenderInstance } from "./RenderInstance.js";
const Sprite2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = RenderInstance.new(Name, Id, Parent);
        instance.Width = 0;
        instance.Height = 0;
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = Sprite2d;
        instance.Render = (game, context) => {
            if (context instanceof CanvasRenderingContext2D) {
                if (instance.DrawData.Color) {
                    context.fillStyle = RgbToHex(instance.DrawData.Color);
                }
                context.translate(instance.x, -instance.y);
                context.rotate(instance.Rotation * Math.PI / 180);
                if (instance.DrawData.Type == Enum.DrawType.Rectangle) {
                    context.fillRect(-instance.Width * instance.DrawData.AnchorPointX, -instance.Height * instance.DrawData.AnchorPointY, instance.Width, instance.Height);
                }
                if (instance.DrawData.Type == Enum.DrawType.Image || instance.DrawData.Type == Enum.DrawType.PixelImage) {
                    if (instance.DrawData.Type == Enum.DrawType.PixelImage) {
                        context.imageSmoothingEnabled = false;
                    }
                    else {
                        context.imageSmoothingEnabled = true;
                    }
                    const image = game.RenderService.LoadImage(instance.DrawData.ImageURL);
                    context.drawImage(image, -instance.Width * instance.DrawData.AnchorPointX, -instance.Height * instance.DrawData.AnchorPointY, instance.Width, instance.Height);
                }
                context.resetTransform();
            }
        };
        return instance;
    },
    Derived: RenderInstance,
    Base: RenderInstance,
};
export { Sprite2d };
