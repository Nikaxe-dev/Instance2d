import { Service } from "../Instances/Service.js";
const RenderServiceFactory = {
    new: function (Game) {
        let instance = Service.new("RenderService", Game);
        return instance;
    }
};
export { RenderServiceFactory };
