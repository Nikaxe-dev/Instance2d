import { Enum, EnumDrawType } from "../Enum";
import { Color3, DataColor3 } from "./Color3";
import { DataDrawData, DrawData } from "./DrawData";

interface DataDrawFrame extends DataDrawData {
    x: number
    y: number
    Rotation: number
    Width: number
    Height: number
}

const DrawFrame = {
    new: function
    (
        type: EnumDrawType = Enum.DrawType.Rectangle,
        data: string | DataColor3 = Color3.new(255, 255, 255),
        gui: boolean = false,
        render: boolean = true,
        x: number = 0,
        y: number = 0,
        rotation: number = 0,
        width: number = 50,
        height: number = 50,
    )

    {
        const frame = DrawData.new(type, data, gui, render) as DataDrawFrame
        frame.x = x
        frame.y = y,
        frame.Rotation = rotation
        frame.Width = width
        frame.Height = height

        return frame
    }
}

export {DataDrawFrame, DrawFrame}