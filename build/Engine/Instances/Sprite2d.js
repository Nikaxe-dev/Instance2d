import { Enum } from "../Data/Enum.js";
import { Instance } from "./Instance.js";
const Instance2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = Instance.new(Name, Id, Parent);
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
export { Instance2d };
