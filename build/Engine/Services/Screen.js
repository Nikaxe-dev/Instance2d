import { Color3 } from "../Data/DataTypes/Color3.js";
import { Service } from "../Instances/Service.js";
const ScreenFactory = {
    new: function (Parent) {
        let instance = Service.new("Screen", Parent);
        instance.Camera = null;
        instance.Width = window.innerWidth;
        instance.Height = window.innerHeight;
        instance.BackgroundColor3 = Color3.new(0, 0, 0);
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = ScreenFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { ScreenFactory };
