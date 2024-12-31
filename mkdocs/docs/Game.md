# About

`Game` is a module that is used for declaring properties of the game.

```js
{
    "BackgroundColor3": [Color3],
    "DoDisableRightClickMenu": Boolean,

    "Screen": Screen,
    "Instance": Instance,
    "Nowhere": Nowhere,
    "RunService": RunService,
    "RenderService": RenderService,
    "InputService": InputService,

    "Init": function(canvas),

    "Start": function(gameloop = function() { RunService.frame() })
}

```

# Properties

- `BackgroundColor3`: Color3 that controls the color of the background.
- `DoDisableRightClickMenu`: Controls if the right click menu is disabled.

# Functions

- `Init(canvas)` => Initiates the game, and the services.
- `Start(gameloop = function() { RunService.frame() })` => Starts the gameloop.