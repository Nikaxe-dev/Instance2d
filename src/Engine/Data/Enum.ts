type EnumDrawType = string
type EnumRenderingType = string

interface Enum {
    DrawType: {
        Rectangle: EnumDrawType,
        Image: EnumDrawType,
        PixelImage: EnumDrawType,
    }

    RenderingType: {
        Canvas: EnumRenderingType
    }
}

const Enum: Enum = {
    DrawType: {
        Rectangle: "Enum.DrawType.Rectangle",
        Image: "Enum.DrawType.Image",
        PixelImage: "Enum.Drawtype.PixelImage",
    },

    RenderingType: {
        Canvas: "Enum.RenderingType.Canvas"
    },
}

export {Enum, EnumDrawType, EnumRenderingType}