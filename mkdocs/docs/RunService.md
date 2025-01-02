## About

`RunService` is the module responsible for running the actual game itself. On `RunService.frame(deltatime)` it computes the logic for every instance, then draws every instance inside the `Screen`.

## Properties
* `TargetFrameRate`: The target fps of the game. It isn't actually used inside the framework, just used when your making the gameloop run.
* `GameSpeed`: The speed the game runs at. It wont effect deltatime, only the deltatime given. (Dont set this as a percentage.)

## Functions
* `RunService.frame(speed)` => Executes a single frame.
* `RunService.instancedrawframe(instance)` => Draws the instance given.
* `RunService.instancelogicframe(instance)` => Does the logic for the instance given.
* `RunService.logicframe(speed, instances)` => Does the logic for every instance given.
* `RunService.drawframe(instances)` => Does the drawing for every instance given.