type EnumDrawType = string
type EnumRenderingType = string

interface Enum {
    DrawType: {
        Rectangle: EnumDrawType,
        Image: EnumDrawType,
    }

    RenderingType: {
        Canvas: EnumRenderingType
    }
}

const Enum: Enum = {
    DrawType: {
        Rectangle: "Enum.DrawType.Rectangle",
        Image: "Enum.DrawType.Image",
    },

    RenderingType: {
        Canvas: "Enum.RenderingType.Canvas"
    },
}

export {Enum, EnumDrawType, EnumRenderingType}