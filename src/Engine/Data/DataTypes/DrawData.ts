import { Enum, EnumDrawType } from "../Enum.js";
import { Color3, DataColor3 } from "./Color3.js";
import { DataDataType, DataType } from "./DataType.js";

interface DataDrawData extends DataDataType {
    Type: EnumDrawType
    
    Color: DataColor3
    ImageURL: string

    AnchorPointX: number
    AnchorPointY: number

    Gui: boolean
    Render: boolean
}

const DrawData = {
    new: function(type: EnumDrawType = Enum.DrawType.Rectangle, gui: boolean = false, render: boolean = true) {
        let frame = DataType.new() as DataDrawData
        frame.Type = type
        frame.Gui = gui
        frame.Render = render

        frame.AnchorPointX = 0.5
        frame.AnchorPointY = 0.5

        frame.Color = Color3.new(255, 255, 255)
        frame.ImageURL = "/images/Icon.svg"

        frame.DataType = DrawData

        return frame
    }
}

export {DataDrawData, DrawData}