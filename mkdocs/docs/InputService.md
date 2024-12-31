`InputService` is a service that has many properties, all getting updated once the game starts. It is used for getting player input.

# Functions
* `InputService.KeyDown(key)` => Returns if a key is down.
* `InputService.BeginListen()` => Begins listening for inputs and updating the services properties. (Automatically executed on import)

# Properties
## `Keyboard`
* `Inputs`: Contains all keyboard inputs. When a key is down, its name will be `true` in here.

## `Mouse`
* `Position`: The position of the mouse on the screen.
* `TruePosition`: The position of the mouse in the game. (`Mouse.Position` + `Screen.Camera.Position`)
* `PointPosition`: The position of the mouse in the game, but it can be pointed to properly. (`Mouse.TruePosition` - `Vector2.new(window.innerWidth / 2, window.innerHeight / 2)`)
* `Button1Down`: If the left mouse button is down.
* `Button2Down`: If the right mouse button is down.
* `Button3Down`: If the middle mouse button is down.
* `ScrollwheelVelocity`: The velocity of the scrollwheel. (Up: 1, Down: -1)