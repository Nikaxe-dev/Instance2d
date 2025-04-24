import { Service } from "../Instances/Service.js";
const ScreenFactory = {
    new: function (Parent) {
        let instance = Service.new("Screen", Parent);
        instance.Camera = null;
        return instance;
    }
};
export { ScreenFactory };
