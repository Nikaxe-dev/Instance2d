import { Instance } from "./Instance.js";
const Service = {
    new: function (Name = "Instance", Id = "", Parent = null) {
        let instance = Instance.new(Name, Id, Parent);
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = Service;
        return instance;
    },
    Derived: Instance,
    Base: Instance
};
export { Service };
