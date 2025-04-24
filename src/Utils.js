const Convert = {
    "ComponentToHex": function(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    "RgbToHex": function(color3) {
        return "#" + Convert.ComponentToHex(color3.r) + Convert.ComponentToHex(color3.g) + Convert.ComponentToHex(color3.b);
    }
}

const Table = {
    "Merge": function(object1 = {}, object2 = {}) {
        return Object.assign({}, object1, object2)
    }
}

export {Convert, Table}