function ComponentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function RgbToHex(color3) {
    return "#" + ComponentToHex(color3.r) + ComponentToHex(color3.g) + ComponentToHex(color3.b);
}
function MergeTable(object1, object2) {
    return Object.assign({}, object1, object2);
}
export { ComponentToHex, RgbToHex, MergeTable };
