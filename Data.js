const Enum = {
    "DrawType": {
        "Rectangle": "Rectangle",
        "Image": "Image",
        "Circle": "Circle",
    }
}

const Vector2 = {
    "new": function(x = 0, y = x) {
        let vector = {
            "x": x,
            "y": y,

            "Takeaway": function(takeawayvector = Vector2.new()) {
                return Vector2.new(vector.x - takeawayvector.x, vector.y - takeawayvector.y)
            },

            "Divide": function(dividevector) {
                return Vector2.new(vector.x / dividevector.x, vector.y / dividevector.y)
            },

            "PointTowards": function(towards) {
                return Vector2.takeaway(towards, vector).Direction
            },

            get Magnitude() {
                return Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
            },

            get Direction() {
                let angle = (Math.atan2(vector.y, vector.x) / Math.PI) * 180
                return angle
            },
        }

        return vector
    },

    "times": function(input1 = Vector2.new(), input2 = 1) {
        return {"x": input1.x * input2, "y": input1.y * input2}
    },

    "takeaway": function(input1 = Vector2.new(), input2 = Vector2.new()) {
        return Vector2.new(input1.x - input2.x, input1.y - input2.y)
    }
}

const Color3 = {
    "new": function(r = 0, g = 0, b = 0) {
        return {"r":r, "g":g, "b":b}
    }
}

const DrawData = {
    "new": function(drawtype, type) {
        return {
            "DrawType": drawtype,
            "Type": type
        }
    }
}

const DrawFrame = {
    "new": function(drawdata, position, rotation, size, gui = false) {
        return {
            "DrawData": drawdata,
            "Position": position,
            "Rotation": rotation,
            "Size": size,
            "Gui": gui,
        }
    }
}

const ComputeStorage = {
    "RenderService": {
        "LoadedImages": {

        }
    }
}

export {Enum, Vector2, Color3, DrawData, DrawFrame, ComputeStorage}