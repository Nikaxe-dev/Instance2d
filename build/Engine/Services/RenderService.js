import { Service } from "../Instances/Service.js";
const RenderServiceFactory = {
    new: function (Game) {
        let instance = Service.new("RenderService", Game);
        instance.RenderInstancesUnder = Game.Screen;
        instance.Render = (instances) => {
            instances.forEach((value, index) => {
            });
        };
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = RenderServiceFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { RenderServiceFactory };
