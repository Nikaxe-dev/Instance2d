import { Enum, EnumDrawType } from "../Enum";
import { Color3, DataColor3 } from "./Color3";

interface DataDrawData {
    Type: EnumDrawType
    Data: string | DataColor3
    Gui: boolean
    Render: boolean
}

const DrawData = {
    new: function(type: EnumDrawType = Enum.DrawType.Rectangle, data: string | DataColor3 = Color3.new(255, 255, 255), gui: boolean = false, render: boolean = true) {
        return {
            Type: type,
            Data: data,
            Gui: gui,
            Render: render,
        } as DataDrawData
    }
}

export {DataDrawData, DrawData}