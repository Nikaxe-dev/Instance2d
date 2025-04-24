import { Instance } from "./Instance.js";
const Service = {
    new: function (Name = "Instance", Parent = null) {
        let instance = Instance.new(Name, Name, Parent);
        return instance;
    }
};
export { Service };
