import { Instance } from "./Instance.js";
const Instance2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = Instance.new(Name, Id, Parent);
        instance.x = 0;
        instance.y = 0;
        instance.xv = 0;
        instance.yv = 0;
        instance.Rotation = 0;
        instance.RotVelocity = 0;
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = Instance2d;
        instance.AddFrameTask("Velocity", (Game) => {
            instance.x += instance.xv;
            instance.y += instance.yv;
            instance.Rotation += instance.RotVelocity;
            if (instance.Rotation > 360) {
                instance.Rotation = 0;
            }
        });
        return instance;
    },
    Derived: Instance,
    Base: Instance,
};
export { Instance2d };
