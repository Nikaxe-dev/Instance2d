import { Enum } from "../Data/Enum.js";
import { Instance2d } from "./Instance2d.js";
const Sprite2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = Instance2d.new(Name, Id, Parent);
        instance.x = 0;
        instance.y = 0;
        instance.xv = 0;
        instance.yv = 0;
        instance.Width = 0;
        instance.Height = 0;
        instance.DrawType = Enum.DrawType.Rectangle;
        return instance;
    }
};
export { Sprite2d };
