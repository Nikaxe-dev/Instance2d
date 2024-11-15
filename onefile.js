const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const loadedimages = document.createElement("div")
loadedimages.style.display = "none"
loadedimages.id = "loadedimages"

document.body.appendChild(loadedimages)

document.addEventListener('contextmenu', event => event.preventDefault())

const Enum = {
    "DrawType": {
        "Rectangle": "Rectangle",
        "Image": "Image",
        "Circle": "Circle",
    }
}

const ComputeStorage = {
    "RenderService": {
        "LoadedImages": {

        }
    }
}

const Convert = {
    "ComponentToHex": function(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    "RgbToHex": function(color3) {
        return "#" + Convert.ComponentToHex(color3.r) + Convert.ComponentToHex(color3.g) + Convert.ComponentToHex(color3.b);
    }
}

const Vector2 = {
    "new": function(x = 0, y = 0) {
        return {"x":x, "y":y}
    },

    "times": function(input1 = Vector2.new(), input2 = 1) {
        return {"x": input1.x * input2, "y": input1.y * input2}
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

const Nowhere = {

}

const Instance = {
    "new": function(id, type, parent = Nowhere) {
        let instance = {
            "Id": id,
            "Type": type,
            "Class": "Instance",
            "ParentValue": parent,
        }

        Instance.giveinstancefunctions(instance)

        if(parent == undefined) {
            instance.Parent = Game
        }
    
        instance.ParentValue[instance.Id] = instance

        return instance
    },
    
    "Instance2d": {
        "new": function(id, type, position = Vector2.new(), rotation = 0, rotationvelocity = 0, velocity = Vector2.new(), size = Vector2.new(50, 50), parent = Nowhere) {
            // let instance = {
            //     "Id": id,
            //     "Type": type,
            //     "Class": "Sprite2d",
            //     "Position": position,
            //     "Rotation": rotation,
            //     "RotVelocity": rotationvelocity,
            //     "Velocity": velocity,
            //     "Size": size,
            //     "ParentValue": parent,
            // }

            let instance = Instance.new(id, type, parent)
            instance.Position = position
            instance.Rotation = rotation
            instance.RotVelocity = rotationvelocity
            instance.Velocity = velocity
            instance.Size = size

            instance.Class = "Instance2d"

            Instance.giveinstancefunctions(instance)

            if(parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Sprite2d": {
        "new": function(id, type, position = Vector2.new(), rotation = 0, rotationvelocity = 0, velocity = Vector2.new(), size = Vector2.new(50, 50), drawdata, parent = Nowhere) {
            let instance = Instance.Instance2d.new(id, type, position, rotation, rotationvelocity, velocity, size, parent)
            instance.DrawData = drawdata
            instance.Class = "Sprite2d"

            Instance.giveinstancefunctions(instance)

            if(parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Cooldown": {
        "new": function(id, type,  parent = Nowhere) {
            let instance = Instance.new(id, type, parent)

            instance.Class = "Cooldown"

            Instance.giveinstancefunctions(instance)

            if(parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Camera2d": {
        "new": function(id, type, position = Vector2.new(), rotation = 0, rotationvelocity = 0, velocity = Vector2.new(), zoom = 100, parent = Nowhere) {
            let instance = Instance.Instance2d.new(id, type, position, rotation, rotationvelocity, velocity, Vector2.new(), parent)
            instance.Zoom = zoom

            instance.Class = "Camera2d"

            Instance.giveinstancefunctions(instance)

            if(parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Service": {
        "new": function(id, parent = Nowhere) {
            let instance = Instance.new(id, id, parent)

            Instance.giveinstancefunctions(instance)

            if(parent == undefined) {
                instance.Parent = Game
            }
    
            instance.ParentValue[instance.Id] = instance

            return instance
        },

        "turn": function(original, id, parent) {
            let instance = Instance.Service.new(id, parent)

            return {...instance, ...original}
        },
    },

    "turn": function(original, id, type, position, size, drawdata, parent) {
        let instance = Instance.new(id, type, position, size, drawdata, parent)
        
        return {...instance, ...original}
    },

    "isinstance": function(instance) {
        if(instance == null) {return false}

        return !(instance.Class == undefined) && !(instance.Id == undefined)
    },

    "giveinstance": function(instance, id, type, classname) {
        instance.Id = id
        instance.Type = type
        instance.Class = classname
        instance.ParentValue = null

        Instance.giveinstancefunctions(instance)
    },

    "giveinstancefunctions": function(instance) {
        instance.Move = function(parent) {
            let properparent = parent

            if(parent == undefined) {
                properparent = Nowhere
            }

            properparent[instance.Id] = instance

            if(instance.Parent) {
                delete instance.ParentValue[instance.Id]
            }

            instance.ParentValue = parent
        }

        instance.GetChildren = function() {
            let children = {}

            for(const [key, value] of Object.entries(instance)) {
                if(Instance.isinstance(value) && !(key == "Parent") && !(key == "ParentValue")) {
                    children[key] = value
                }
            }

            return children
        }

        instance.GetDescendents = function() {
            let descendents = {}

            for(const [key, value] of Object.entries(instance.GetChildren())) {
                descendents[key] = value

                for(const [key2, value2] of Object.entries(value.GetDescendents())) {
                    descendents[key2] = value2
                }
            }

            return descendents
        }

        instance.Script = function(speed, instance) {

        }

        instance.__defineGetter__("Parent", function() {
            return instance.ParentValue
        })

        instance.__defineSetter__("Parent", function(parent) {
            instance.Move(parent)
        })
    },
}

const Screen = {
    "Camera": null,
}

const RenderService = {
    "LoadImage": function(directory) {
        const image = document.createElement("img")
        image.src = directory
        image.classname = "loadedimage"

        loadedimages.appendChild(image)
        ComputeStorage.RenderService.LoadedImages[directory] = image

        return image
    },

    "Draw": function(drawframe) {
        const ctx = canvas.getContext("2d")

        if(Screen.Camera && !drawframe.Gui) {
            ctx.translate(((drawframe.Position.x - Screen.Camera.Position.x) * (Screen.Camera.Zoom / 100)) + window.innerWidth / 2, ((drawframe.Position.y - Screen.Camera.Position.y) * (Screen.Camera.Zoom / 100)) + window.innerHeight / 2)
        } else {
            ctx.translate(drawframe.Position.x + window.innerWidth / 2, drawframe.Position.y + window.innerHeight / 2)
        }

        ctx.rotate(drawframe.Rotation * Math.PI / 180)

        if(drawframe.DrawData.DrawType == Enum.DrawType.Rectangle) {
            ctx.fillStyle = Convert.RgbToHex(drawframe.DrawData.Type)

            if(Screen.Camera && !drawframe.Gui) {
                ctx.fillRect((-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100))
            } else {
                ctx.fillRect(-drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y)
            }
        }

        if(drawframe.DrawData.DrawType == Enum.DrawType.Image) {
            if(!ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]) {
                RenderService.LoadImage(drawframe.DrawData.Type)
            }

            const image = ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]

            ctx.fillStyle = drawframe.DrawData.Type

            if(Screen.Camera && !drawframe.Gui) {
                ctx.drawImage(image, (-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100))
            } else {
                ctx.drawImage(image, -drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y)
            }
        }

        //ctx.rotate(-drawframe.Rotation * Math.PI / 180)
        ctx.resetTransform()

        // if(Screen.Camera && !drawframe.Gui) {
        //     ctx.translate(-drawframe.Position.x - Screen.Camera.Position.x, -drawframe.Position.y - Screen.Camera.Position.y)
        // } else {
        //     ctx.translate(-drawframe.Position.x, -drawframe.Position.y)
        // }
    }
}

const RunService = {
    "classlogicframes": {
        /*
        Example:

        "Sprite2d": function(instance) {
            instance.Position.x += instance.Velocity.x
            instance.Position.y += instance.velocity.y
        }
        */

        "Sprite2d": function(speed, instance) {
            instance.Position.x += instance.Velocity.x
            instance.Position.y += instance.Velocity.y
            instance.Rotation += instance.RotVelocity

            if(instance.Rotation >= 360) {
                instance.Rotation -= 360
            }

            if(instance.Rotation <= 0) {
                instance.Rotation += 360
            }
        },

        "Camera2d": function(speed, instance) {
            instance.Position.x += instance.Velocity.x
            instance.Position.y += instance.Velocity.y
            instance.Rotation += instance.RotVelocity

            if(instance.Rotation >= 360) {
                instance.Rotation -= 360
            }

            if(instance.Rotation <= 0) {
                instance.Rotation += 360
            }
        },
    },

    "instancedrawframe": function(instance) {
        if(instance.Class == "Sprite2d") {
            RenderService.Draw(DrawFrame.new(instance.DrawData, instance.Position, instance.Rotation, instance.Size))
        }
    },

    "instancelogicframe": function(speed, instance) {
        if(RunService.classlogicframes[instance.Class]) {
            RunService.classlogicframes[instance.Class](speed, instance)
        }

        instance.Script(speed, instance)
    },
    
    "logicframe": function(speed, instances) {
        for(const [key, value] of Object.entries(instances)) {
            RunService.instancelogicframe(speed, value)
        }
    },

    "drawframe": function(instances) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        RenderService.Draw(DrawFrame.new(DrawData.new(Enum.DrawType.Rectangle, Game.BackgroundColor3), Vector2.new(), 0, Vector2.new(canvas.width, canvas.height), true))

        for(const [key, value] of Object.entries(instances)) {
            RunService.instancedrawframe(value)
        }
    },

    "frame": function(speed) {
        const instances = Game.GetDescendents()
        RunService.logicframe(speed, instances)
        RunService.drawframe(instances)
    },
}

const InputService = {
    "Mouse": {
        "Position": Vector2.new(),
        "TruePosition": Vector2.new(),
        "Button1Down": false,
        "Button2Down": false,
        "Button3Down": false,
        "ScrollwheelVelocity": 0,
    },

    "Keyboard": {
        "Inputs": {

        },
    },

    "KeyDown": function(key) {
        return InputService.Keyboard.Inputs[key] == true
    },

    "BeginListen": function() {
        window.addEventListener('keydown', function (e) {
            InputService.Keyboard.Inputs[e.key.toLowerCase()] = true
        }, true)
    
        window.addEventListener('keyup', function (e) {
            InputService.Keyboard.Inputs[e.key.toLowerCase()] = false
        }, true)
        
        addEventListener("mousedown", function (e) {
            if(e.button == 0) {
                InputService.Mouse.Button1Down = true
            }

            if(e.button == 1) {
                InputService.Mouse.Button3Down = true
            }

            if(e.button == 2) {
                InputService.Mouse.Button2Down = true
            }
        })
    
        addEventListener("mouseup", function (e) {
            if(e.button == 0) {
                InputService.Mouse.Button1Down = false
            }

            if(e.button == 1) {
                InputService.Mouse.Button3Down = false
            }

            if(e.button == 2) {
                InputService.Mouse.Button2Down = false
            }
        })

        document.body.onmousemove = function (e) {
            InputService.Mouse.Position = Vector2.new(e.clientX, e.clientY)

            if(Screen.Camera) {
                InputService.Mouse.TruePosition = Vector2.new(e.clientX + Screen.Camera.Position.x, e.clientY + Screen.Camera.Position.y)
            }
        }

        addEventListener("wheel", function (e) {
            InputService.Mouse.ScrollwheelVelocity = (e.deltaY / 102) * -1

            setTimeout(function (e) {
                InputService.Mouse.ScrollwheelVelocity = 0
            }, 50)
        })
    },
}

Instance.giveinstance(Screen, "Screen", "Screen", "Service")
Instance.giveinstance(Instance, "Instance", "Instance", "Service")
Instance.giveinstance(Nowhere, "Nowhere", "Nowhere", "Service")
Instance.giveinstance(RunService, "RunService", "RunService", "Service")
Instance.giveinstance(RenderService, "RenderService", "RenderService", "Service")
Instance.giveinstance(InputService, "InputService", "InputService", "Service")

const Game = {
    "BackgroundColor3": Color3.new(255, 255, 255),

    "Screen": Screen,
    "Instance": Instance,
    "Nowhere": Nowhere,
    "RunService": RunService,
    "RenderService": RenderService,
    "InputService": InputService,
}

//Draw background to avoid flashes when reloading the page.
RenderService.Draw(DrawFrame.new(DrawData.new(Enum.DrawType.Rectangle, Game.BackgroundColor3), Vector2.new(canvas.width / 2, canvas.height / 2), 0, Vector2.new(canvas.width, canvas.height), true))

Instance.giveinstance(Game, "Game", "Game", "Service")
InputService.BeginListen()

export {Game, Screen, Instance, RunService, RenderService, InputService, Color3, Vector2, DrawData, Enum}