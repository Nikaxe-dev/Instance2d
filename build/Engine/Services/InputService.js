import { Service } from "../Instances/Service.js";
const InputServiceFactory = {
    new: function (Parent) {
        let instance = Service.new("InputService", Parent);
        instance.Mouse = {
            PositionX: 0,
            PositionY: 0,
        };
        instance.Keyboard = {};
        instance.KeyDown = function (key) {
            return instance.Keyboard[key];
        };
        instance.Init = function () {
        };
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = InputServiceFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { InputServiceFactory };
