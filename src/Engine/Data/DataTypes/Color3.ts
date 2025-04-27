import { DataDataType, DataType } from "./DataType.js"

interface DataColor3 extends DataDataType {
    r: number
    g: number
    b: number
    a: number
}

const Color3 = {
    new: function(r: number, g: number, b: number, a: number = 1) {
        let data = DataType.new() as DataColor3
        data.r = r
        data.g = g
        data.b = b

        data.DataType = Color3

        return data
    }
}

export {DataColor3, Color3}