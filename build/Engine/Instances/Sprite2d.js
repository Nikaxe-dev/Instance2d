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
                if (instance.DrawData.Type == Enum.DrawType.Rectangle) {
                    if (instance.DrawData.Data instanceof Object) {
                        context.fillStyle = RgbToHex(instance.DrawData.Data);
                        context.globalAlpha = instance.DrawData.Data.a;
                    }
                    else {
                        context.fillStyle = instance.DrawData.Data;
                    }
                    context.fillRect(instance.x, -instance.y, instance.Width, instance.Height);
                }
            }
        };
        return instance;
    },
    Derived: RenderInstance,
    Base: RenderInstance,
};
export { Sprite2d };
