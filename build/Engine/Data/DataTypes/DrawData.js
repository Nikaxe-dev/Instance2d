import { Enum } from "../Enum.js";
import { Color3 } from "./Color3.js";
import { DataType } from "./DataType.js";
const DrawData = {
    new: function (type = Enum.DrawType.Rectangle, gui = false, render = true) {
        let frame = DataType.new();
        frame.Type = type;
        frame.Gui = gui;
        frame.Render = render;
        frame.AnchorPointX = 0.5;
        frame.AnchorPointY = 0.5;
        frame.Color = Color3.new(255, 255, 255);
        frame.ImageURL = "/images/Icon.svg";
        frame.DataType = DrawData;
        return frame;
    }
};
export { DrawData };
