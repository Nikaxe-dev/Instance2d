## About

`RenderService` is a service made for rendering. It's mainly made for only engine use, but in the future I might add more methods to the service.

## Functions
* `RenderService.Draw(drawframe = DrawFrame.new())` => Draws the given `DrawFrame`

* `RenderService.LoadImage(directory = "Instance2d/placeholder.bmp")` => Loads the given `path` for use in `RenderService.Draw()`. Used internally to load images so they can be drawn to the screen.