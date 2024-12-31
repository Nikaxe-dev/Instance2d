There are many different datatypes in Instance2d, and this wikipage is for classifying them.
Most of them can be instanced with the function `.new()`

# Enum
### DrawType
Controls the way things are drawn in `RenderService.Draw(DrawFrame)`

- `Rectangle` - Draws it as a rectangle,
- `PixelImage` - Draws it as a pixelated image,
- `Image` - Draws it as an image,
- `Circle` - Draws it as a circle,

### CollisionType (Collision is to be added!)
Controls the way collision is detected for collidable objects.

- `Rectangle` - Uses the `instance.CollisionShape` as a rectangle (use `Vector2` for the `CollisionShape`),
- `Defined` - Uses the `instance.Size` parameter.,
- `Custom` - (To Be Added) Uses the `instance.CollisionShape` as a list of points. (May become a new datatype.)

# DataTypes
## Vector2
Vector2 is a datatype for a `position`, `size`, or `velocity` on the screen.

`Vector2.new(x = 0, y = x)`

```js
{
"x": Number,
"y": Number,

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
```

`Vector2.Takeaway(takeawayvector = Vector2.new())` => returns the `Vector2` with it's x and y components taken away by the `takeawayvectors` components.

`Vector2.Divide(dividevector = Vector2.new())` => returns the `Vector2` with it's x and y components divided by the `dividevectors` components.

`Vector2.PointTowards(towards = Vector2.new())` => returns the direction the `Vector2` would point to `towards`.

## Color3
Returns a new `RGB` color.

`Color3.new(r = 0, g = 0, b = 0)`

```js
{
"r": Number,
"g": Number,
"b": Number
}
```

## DrawData
The data used by `Sprite2d`'s that includes the type, and the `TextureURL` | `Color3`.

`DrawData.new(DrawType = Enum.DrawType.Rectangle, Type = "placeholder.bmp" | Color3.new())`

```js
{
"DrawType": [Enum.DrawType],
"Type": ["placeholder.bmp" | [Color3]]
}
```

## DrawFrame
The data used by `RenderService.Draw()` to draw something on a screen.

`DrawFrame.new(drawdata = DrawData.new(), position = Vector2.new(), rotation = 0, size = Vector2.new(), gui = false)`

```js
{
"DrawData": [DrawData],
"Position": [Vector2],
"Rotation": Number,
"Size": [Vector2],
"Gui": Boolean,
}
```

`DrawFrame.Gui` => A property controlling whether the camera is considered in the position.
