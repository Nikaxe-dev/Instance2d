import { DataType } from "./DataType.js";
const Color3 = {
    new: function (r, g, b, a = 1) {
        let data = DataType.new();
        data.r = r;
        data.g = g;
        data.b = b;
        data.DataType = Color3;
        return data;
    }
};
export { Color3 };
