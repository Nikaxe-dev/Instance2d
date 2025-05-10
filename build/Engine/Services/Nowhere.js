import { Service } from "../Instances/Service.js";
const NowhereFactory = {
    new: function (Parent) {
        let instance = Service.new("Nowhere", Parent);
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = NowhereFactory;
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { NowhereFactory };
