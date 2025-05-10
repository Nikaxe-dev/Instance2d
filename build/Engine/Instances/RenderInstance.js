import { DrawData } from "../Data/DataTypes/DrawData.js";
import { Instance2d } from "./Instance2d.js";
const RenderInstance = {
    new: function (Name = "Instance", Id = "", Parent = null) {
        let instance = Instance2d.new(Name, Id, Parent);
        instance.DrawData = DrawData.new();
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = RenderInstance;
        instance.Render = (Game) => {
            console.warn("Instance2dEngine: RenderInstance still has default function");
        };
        return instance;
    },
    Derived: Instance2d,
    Base: Instance2d
};
export { RenderInstance };
