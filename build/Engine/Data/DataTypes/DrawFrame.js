import { Enum } from "../Enum";
import { Color3 } from "./Color3";
import { DrawData } from "./DrawData";
const DrawFrame = {
    new: function (type = Enum.DrawType.Rectangle, data = Color3.new(255, 255, 255), gui = false, render = true, x = 0, y = 0, rotation = 0, width = 50, height = 50) {
        const frame = DrawData.new(type, data, gui, render);
        frame.x = x;
        frame.y = y,
            frame.Rotation = rotation;
        frame.Width = width;
        frame.Height = height;
        return frame;
    }
};
export { DrawFrame };
