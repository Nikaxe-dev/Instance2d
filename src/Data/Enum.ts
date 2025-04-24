type EnumDrawType = string

interface Enum {
    DrawType: {
        Rectangle: EnumDrawType,
        Image: EnumDrawType,
    }
}

const Enum: Enum = {
    DrawType: {
        Rectangle: "Enum.DrawType.Rectangle",
        Image: "Enum.DrawType.Image",
    }
}

export {Enum, EnumDrawType}