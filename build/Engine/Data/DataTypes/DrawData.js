import { Enum } from "../Enum.js";
import { Color3 } from "./Color3.js";
import { DataType } from "./DataType.js";
const DrawData = {
    new: function (type = Enum.DrawType.Rectangle, data = Color3.new(255, 255, 255), gui = false, render = true) {
        let frame = DataType.new();
        frame.Type = type;
        frame.Data = data;
        frame.Gui = gui;
        frame.Render = render;
        frame.DataType = DrawData;
        return frame;
    }
};
export { DrawData };
