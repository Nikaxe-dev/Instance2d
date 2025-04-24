import { Service } from "../Instances/Service.js";
const RunServiceFactory = {
    new: function (Parent) {
        let instance = Service.new("RunService", Parent);
        return instance;
    }
};
export { RunServiceFactory };
