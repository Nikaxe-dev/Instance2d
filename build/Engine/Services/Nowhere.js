import { Service } from "../Instances/Service.js";
const NowhereFactory = {
    new: function (Parent) {
        let instance = Service.new("Nowhere", Parent);
        return instance;
    }
};
export { NowhereFactory };
