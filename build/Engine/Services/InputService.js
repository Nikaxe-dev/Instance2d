import { Service } from "../Instances/Service.js";
const InputServiceFactory = {
    new: function (Parent) {
        let instance = Service.new("InputService", Parent);
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = InputServiceFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { InputServiceFactory };
