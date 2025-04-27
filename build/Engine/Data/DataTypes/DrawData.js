import { Enum } from "../Enum";
import { Color3 } from "./Color3";
const DrawData = {
    new: function (type = Enum.DrawType.Rectangle, data = Color3.new(255, 255, 255), gui = false, render = true) {
        return {
            Type: type,
            Data: data,
            Gui: gui,
            Render: render,
        };
    }
};
export { DrawData };
