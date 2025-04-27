import { Service } from "../Instances/Service.js";
const ScreenFactory = {
    new: function (Parent) {
        let instance = Service.new("Screen", Parent);
        instance.Camera = null;
        instance.Width = window.innerWidth;
        instance.Height = window.innerHeight;
        return instance;
    }
};
export { ScreenFactory };
