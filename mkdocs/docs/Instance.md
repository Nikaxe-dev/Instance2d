## About

Instance is a service that allows you to create instances. It is the first one you need to learn. Without it, the engine would be useless.

## Creating an instance
To create an instance, you have to use the `.new()` function.

```js
Instance.new({
    Id: "Instance",
    Type: "Instance",
    Parent: Screen,
})
```

This makes the most basic instance. It doesnt have any properties apart from the ones needed, and can be used as folders for other instances.

## The different classes

There are many different classes, from ones that you can see, to ones that are used for other purposes such as `Cooldown`.
Every class and their functions are in the `Instance` module.

To create a new one of any class you do:
```js
Instance.ClassNameHere.new({

})
```

For example:
```js
Instance.Sprite2d.new({
    Id: "Player",
    Type: "Player",
    Position: Vector2.new(),
    Rotation: 90,
    RotVelocity: 0,
    Size: Vector2.new(50, 50),
    Velocity: Vector2.new(),
    DrawData: DrawData.new(Enum.DrawType.PixelImage, "/images/player.png"),
    ZIndex: 10,
    CollisionType: Enum.CollisionType.Rectangle,
    Parent: Screen
})
```

## Parent Child Relationship
Just like many other engines/frameworks, Instance2d is organized with a parent, child relationship between instances.
Unlike JavaScript with the DOM and other ways of changing the projects organization, Instance2d lets you access instances very easily. Just like `luau (roblox lua)`, you access instances like you do with files on a computer. Example: `Screen.Player.Gun`. This has a couple limitations though, such as instances needing a unique `id` inside their parents. You can still have the same `id` as another instance, that just means that it will return the first instance found when getting an instance with an `id`.

## Functions
* `Instance.new({Id: String, Type: String, Parent: Instance})` => Creates a new instance of the class `Instance`. Used in every `.new()` function of the module.
* `Instance.isinstance(object = {})` => Returns if the given `Object` is an instance.
* `Instance.giveinstance(instance, id, type, classname)` => Gives the given `Object` | `Instance` the correct properties if they dont have them.
* `Instance.giveinstancefunctions(instance)` => Gives the given `Object` | `Instance` the basic functions needed for every instance. Used internally inside `Instance.giveinstance()`.

## Classes
### 2d

---

### Instance2d
[Instance](#Instance) with a `position`, `rotation`, `rotationvelocity`, `velocity`, and `size`.

Inherits: [Instance](#Instance)

`.new({id, type, position: Vector2.new(), rotation: 0, rotationvelocity: 0, velocity: Vector2.new(), size: Vector2.new(50, 50), collisiontype: Enum.CollisionType.Rectangle, parent: Nowhere})`

```js
{
Id: String,
Type: String,
Class: "Sprite2d",
Script: Script(speed, instance),
Parent: [Instance],
Position: [Vector2],
Rotation: Number,
RotVelocity: Number,
CollisionType: [Enum.CollisionType]
}
```

`Instance2d.Colliding(Instance2d | Sprite2d)` => Returns `true` if the `Instance2d` is colliding with the `Instance2d` | `Sprite2d`

`Instance2d.GetCollison()` => Returns every instance touching itself.

### Sprite2d
[Instance2d](#Instance2d) that is drawn to the screen dependent on its property `DrawData`.

Inherits: [Instance2d](#Instance2d)

`.new({id, type, position: Vector2.new(), rotation: 0, rotationvelocity: 0, velocity: Vector2.new(), size: Vector2.new(50, 50), drawdata: DrawData.new(), zindex: 0, collisiontype: Enum.CollisionType.Rectangle, parent = Nowhere})`

```js
{
Class: "Sprite2d",
Id: String,
Type: String,
Parent: [Instance],
DrawData: [DrawData],
Position: [Vector2],
Size: [Vector2],
Velocity: [Vector2],
Rotation: Number,
RotVelocity: Number,
Script: function,
ZIndex: Number,
CollisionType: [Enum.CollisionType]
}
```

### Camera2d
A camera. Useless on its own, set `Screen.Camera` to one of these instances and your game has a camera.

Inherits: [Instance2d](#Instance2d)

`.new({id, type, position: Vector2.new(), rotation: 0, rotationvelocity: 0, velocity: Vector2.new(), zoom: 100, parent: Nowhere)}`

```js
{
Id: String,
Type: String,
Class: "Sprite2d",
Script: function,
Parent: [Instance],
Position: [Vector2],
Rotation: Number,
RotVelocity: Number,
Zoom: Number%,
}
```

## Event

---

### Cooldown
Use this to add time into your game. Useful for weapon cooldowns, debree deletion, ect.

Inherits: [Instance](#Instance)

`.new({id, type, time: 1, loop: false, onend: function() {}, parent: Nowhere)}`

```js
{
Id: String,
Type: String,
Class: "Cooldown",
Script: function,
Parent: [Instance],
Time: Number,
Loop: Boolean,
OnEnd: function,
Playing: Boolean,
MaxTime: Time
}
```

`Cooldown.Play()` => Sets `Cooldown.Playing` to true, also running any other tasks needed when starting a `Cooldown`.

`Cooldown.Stop()` => Sets `Cooldown.Playing` to false, also running any other tasks needed when ending a `Cooldown`.

`Cooldown.OnEnd()` => Assigned to the `Cooldown` on creation by the game. Runs when `Cooldown.Time <= 0`.

## Basic

---

### Instance
The most basic instance you could have. Think of it like a `Node` in Godot.
Every class of Instance inherits from this class.

`.new({id, type, parent: Nowhere})`

```js
{
Id: String,
Type: String,
Class: "Instance",
Script: function,
Parent: [Instance],
}
```

`Instance.GetChildren()` => Gets all children of the instance.

`Instance.GetDescendants()` => Gets all descendants of the instance.

`Instance.IsA(classname = Instance.ClassNameHere | "ClassNameHere")` => Returns if the instance is the given class.

`Instance.Script(speed)` => A script function that can be assigned to this instance. It is ran every frame.

`Instance.Destroy()` => Removes the instance and it's descendants completely from the game.

### Service
The class every service uses. Not really useful to anything you'd do in a game. It's the same as an Instance, just with the Parent property locked.

Inherits: [Instance](#Instance)

`.new({id, type, parent: Nowhere})`

```js
{
Id: String,
Type: String,
Class: "Service",
Script: function,
Parent: [Instance],
}
```

