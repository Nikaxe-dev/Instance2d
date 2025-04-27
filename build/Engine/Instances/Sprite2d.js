import { RenderInstance } from "./RenderInstance.js";
const Sprite2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = RenderInstance.new(Name, Id, Parent);
        instance.Width = 0;
        instance.Height = 0;
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = Sprite2d;
        instance.Render = (Game) => {
        };
        return instance;
    },
    Derived: RenderInstance,
    Base: RenderInstance,
};
export { Sprite2d };
