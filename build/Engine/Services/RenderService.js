import { Enum } from "../Data/Enum.js";
import { RenderInstance } from "../Instances/RenderInstance.js";
import { Service } from "../Instances/Service.js";
const RenderServiceFactory = {
    new: function (Game) {
        let instance = Service.new("RenderService", Game);
        instance.RenderInstancesUnder = Game.Screen;
        instance.RenderingType = Enum.RenderingType.Canvas;
        const Screen = Game.Screen;
        instance.Init = function (Game) {
            if (!this.Canvas) {
                return;
            }
            if (instance.RenderingType == Enum.RenderingType.Canvas) {
                instance.Ctx = instance.Canvas?.getContext("2d");
            }
        };
        instance.Render = (instances) => {
            if (!instance.Canvas) {
                return;
            }
            instance.Canvas.width = Game.Screen.Width;
            instance.Canvas.height = Game.Screen.Height;
            if (instance.Ctx instanceof CanvasRenderingContext2D) {
                instance.Ctx.fillStyle = "rgb(" + Screen.BackgroundColor3.r + "," + Screen.BackgroundColor3.g + "," + Screen.BackgroundColor3.b + "," + Screen.BackgroundColor3.a + ")";
                instance.Ctx.fillRect(0, 0, Screen.Width, Screen.Height);
            }
            instances.forEach((value, index) => {
                if (value.IsA(RenderInstance)) {
                    if (value.DrawData.Render) {
                        value.Render(Game, instance.Ctx);
                    }
                }
            });
        };
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = RenderServiceFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { RenderServiceFactory };
