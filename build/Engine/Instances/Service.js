import { Instance } from "./Instance.js";
const Service = {
    new: function (Name = "Instance", Parent = null) {
        let instance = Instance.new(Name, Name, Parent);
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = Service;
        return instance;
    },
    Derived: Instance,
    Base: Instance
};
export { Service };
