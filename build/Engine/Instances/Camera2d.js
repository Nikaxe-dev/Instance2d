import { Instance } from "./Instance.js";
const Instance2d = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        const instance = Instance.new(Name, Id, Parent);
        instance.Zoom = 100;
        return instance;
    }
};
export { Instance2d };
