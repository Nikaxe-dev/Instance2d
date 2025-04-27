interface DataColor3 {
    r: number
    g: number,
    b: number
}

const Color3 = {
    new: function(r: number, g: number, b: number) {
        return {
            r: r,
            g: g,
            b: b,
        } as DataColor3
    }
}

export {DataColor3, Color3}