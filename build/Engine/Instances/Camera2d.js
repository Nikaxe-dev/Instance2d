import { Instance2d } from "./Instance2d.js";
const Camera2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = Instance2d.new(Name, Id, Parent);
        instance.Zoom = 100;
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = Camera2d;
        return instance;
    },
    Derived: Instance2d,
    Base: Instance2d
};
export { Camera2d };
