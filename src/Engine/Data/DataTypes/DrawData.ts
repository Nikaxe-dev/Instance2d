import { Enum, EnumDrawType } from "../Enum.js";
import { Color3, DataColor3 } from "./Color3.js";
import { DataDataType, DataType } from "./DataType.js";

interface DataDrawData extends DataDataType {
    Type: EnumDrawType
    Data: string | DataColor3
    Gui: boolean
    Render: boolean
}

const DrawData = {
    new: function(type: EnumDrawType = Enum.DrawType.Rectangle, data: string | DataColor3 = Color3.new(255, 255, 255), gui: boolean = false, render: boolean = true) {
        let frame = DataType.new() as DataDrawData
        frame.Type = type
        frame.Data = data
        frame.Gui = gui
        frame.Render = render

        frame.DataType = DrawData

        return frame
    }
}

export {DataDrawData, DrawData}