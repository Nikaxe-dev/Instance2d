import { Service } from "../Instances/Service.js";
const ScreenFactory = {
    new: function (Parent) {
        let instance = Service.new("Screen", Parent);
        instance.Camera = null;
        instance.Width = window.innerWidth;
        instance.Height = window.innerHeight;
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = ScreenFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { ScreenFactory };
