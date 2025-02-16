
'use strict';

    const Enum = {
        "DrawType": {
            "Rectangle": "DrawTypeRectangle",
            "Image": "DrawTypeImage",
            "PixelImage": "DrawTypePixelImage",
            "Circle": "DrawTypeCircle",
        },

        "CollisionType": {
            "Rectangle": "CollisionTypeRectangle",
            "Defined": "CollisionTypeDefined",
            "Custom": "CollisionTypeCustom"
        },
    };

    const Vector2 = {
        "new": function(x = 0, y = x) {
            let vector = {
                "x": x,
                "y": y,

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
                    let angle = (Math.atan2(vector.y, vector.x) / Math.PI) * 180;
                    return angle
                },
            };

            return vector
        },

        "times": function(input1 = Vector2.new(), input2 = 1) {
            return {"x": input1.x * input2, "y": input1.y * input2}
        },

        "takeaway": function(input1 = Vector2.new(), input2 = Vector2.new()) {
            return Vector2.new(input1.x - input2.x, input1.y - input2.y)
        }
    };

    const Color3 = {
        "new": function(r = 0, g = 0, b = 0) {
            return {"r":r, "g":g, "b":b}
        }
    };

    const DrawData = {
        "new": function(drawtype, type) {
            return {
                "DrawType": drawtype,
                "Type": type
            }
        }
    };

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
    };

    const ComputeStorage = {
        "RenderService": {
            "LoadedImages": {

            }
        }
    };

    const Convert = {
        "ComponentToHex": function(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        },

        "RgbToHex": function(color3) {
            return "#" + Convert.ComponentToHex(color3.r) + Convert.ComponentToHex(color3.g) + Convert.ComponentToHex(color3.b);
        }
    };

    const Nowhere = {

    };

    const InputService = {
        "Mouse": {
            "Position": Vector2.new(),
            // "TruePosition": Vector2.new(),
            // "PointPosition": Vector2.new(),

            get TruePosition() {
                if(!Screen.Camera) {
                    return InputService.Mouse.Position
                }

                return Vector2.new(InputService.Mouse.Position.x + Screen.Camera.Position.x, InputService.Mouse.Position.y + Screen.Camera.Position.y)
            },

            get PointPosition() {
                return InputService.Mouse.TruePosition.Takeaway(Vector2.new(Screen.Size.x / 2, Screen.Size.y / 2))
            },

            get CenteredPosition() {
                return InputService.Mouse.PointPosition
            },

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
                InputService.Keyboard.Inputs[e.key.toLowerCase()] = true;
            }, true);
        
            window.addEventListener('keyup', function (e) {
                InputService.Keyboard.Inputs[e.key.toLowerCase()] = false;
            }, true);
            
            addEventListener("mousedown", function (e) {
                if(e.button == 0) {
                    InputService.Mouse.Button1Down = true;
                }

                if(e.button == 1) {
                    InputService.Mouse.Button3Down = true;
                }

                if(e.button == 2) {
                    InputService.Mouse.Button2Down = true;
                }
            });
        
            addEventListener("mouseup", function (e) {
                if(e.button == 0) {
                    InputService.Mouse.Button1Down = false;
                }

                if(e.button == 1) {
                    InputService.Mouse.Button3Down = false;
                }

                if(e.button == 2) {
                    InputService.Mouse.Button2Down = false;
                }
            });

            document.body.onmousemove = function (e) {
                InputService.Mouse.Position = Vector2.new(e.clientX, e.clientY);
            };

            addEventListener("wheel", function (e) {
                InputService.Mouse.ScrollwheelVelocity = (e.deltaY / 102) * -1;

                setTimeout(function (e) {
                    InputService.Mouse.ScrollwheelVelocity = 0;
                }, 50);
            });
            
            // setInterval(function() {
            //     if(Screen.Camera) {
            //         InputService.Mouse.TruePosition = Vector2.new(InputService.Mouse.Position.x + Screen.Camera.Position.x, InputService.Mouse.Position.y + Screen.Camera.Position.y)
            //         InputService.Mouse.PointPosition = InputService.Mouse.TruePosition.Takeaway(Vector2.new(window.innerWidth / 2, window.innerHeight / 2))
            //     }
            // }, 10)
        },
    };

    const Instance = {
        "new": function(data = {Id: Instance.id.new(), Type: "", Parent: Nowhere}) {
            let instance = {
                "Id": data.Id,
                "Type": data.Type,
                "Class": "Instance",
                "ParentValue": data.Parent,
            };

            Instance.giveinstancefunctions(instance);

            if(data.Parent == undefined) {
                instance.Parent = Nowhere;
            }
        
            instance.ParentValue[instance.Id] = instance;

            return instance
        },
        
        "Instance2d": {
            "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, RotVelocity: 0, Velocity: Vector2.new(), Size: Vector2.new(), CollisionType: Enum.CollisionType.Rectangle}) {
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

                let instance = Instance.new(data);
                instance.Position = data.Position;
                instance.Rotation = data.Rotation;
                instance.RotVelocity = data.RotVelocity;
                instance.Velocity = data.Velocity;
                instance.Size = data.Size;

                instance.Class = "Instance2d";

                Instance.giveinstancefunctions(instance);

                instance.Colliding = function(colliding = Instance.Sprite2d.new({})) {
                    if(Instance.isinstance(colliding)) {
                        if(colliding.IsA("Instance2d")) {
                            if(instance.IsA("Instance2d")) {
                                return instance.Position == colliding
                            }
        
                            const left = instance.Position.x - instance.Size.x / 2;
                            const right = instance.Position.x + instance.Size.x / 2;
                            const up = instance.Position.y - instance.Size.y / 2;
                            const down = instance.Position.y + instance.Size.y / 2;
        
                            return (
                                colliding.Position.x > left && colliding.Position.x < right &&
                                colliding.Position.y > up && colliding.Position.y < down
                            )
                        }

                        if(colliding.IsA("Sprite2d")) {
                            if(instance.IsA("Instance2d")) {
                                return colliding.Colliding(instance)
                            }

                            instance.Position.x - instance.Size.x / 2;
                            const instanceright = instance.Position.x + instance.Size.x / 2;
                            const instanceup = instance.Position.y - instance.Size.y / 2;
                            instance.Position.y + instance.Size.y / 2;

                            colliding.Position.x - colliding.Size.x / 2;
                            const collidingright = colliding.Position.x + colliding.Size.x / 2;
                            const collidingup = colliding.Position.y - colliding.Size.y / 2;
                            colliding.Position.y + colliding.Size.y / 2;

                            return (
                                instance.Position.x < collidingright &&
                                instanceright > colliding.Position.x &&
                                instance.Position.y > collidingup &&
                                instanceup < colliding.Position.y
                            )
                        }
                    } else if(colliding.x != undefined && colliding.y != undefined) {
                        if(instance.IsA("Instance2d")) {
                            return instance.Position == colliding
                        }

                        const left = instance.Position.x - instance.Size.x / 2;
                        const right = instance.Position.x + instance.Size.x / 2;
                        const up = instance.Position.y - instance.Size.y / 2;
                        const down = instance.Position.y + instance.Size.y / 2;

                        return (
                            colliding.x > left && colliding.x < right &&
                            colliding.y > up && colliding.y < down
                        )
                    }
                };

                if(data.Parent == undefined) {
                    instance.Parent = Nowhere;
                }

                instance.ParentValue[instance.Id] = instance;

                return instance.Parent[instance.Id]
            },
        },

        "Sprite2d": {
            "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, RotVelocity: 0, Velocity: Vector2.new(), Size: Vector2.new(), CollisionType: Enum.CollisionType.Rectangle, DrawData: DrawData.new(), ZIndex: 0}) {
                let instance = Instance.Instance2d.new(data);
                instance.DrawData = data.DrawData;
                instance.ZIndex = data.ZIndex;

                instance.Class = "Sprite2d";

                Instance.giveinstancefunctions(instance);

                if(data.Parent == undefined) {
                    instance.Parent = Nowhere;
                }

                instance.ParentValue[instance.Id] = instance;

                return instance.Parent[instance.Id]
            },
        },

        "Cooldown": {
            "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Time: 1, Loop: false, OnEnd: function() {}}) {
                let instance = Instance.new(data);
                instance.MaxTime = data.Time;
                instance.Time = data.Time;
                instance.Loop = data.Loop;
                instance.OnEnd = data.OnEnd;
                instance.Playing = false;

                instance.Play = function() {
                    instance.Playing = true;
                };

                instance.Stop = function() {
                    instance.Playing = false;
                };

                instance.Class = "Cooldown";

                Instance.giveinstancefunctions(instance);

                if(data.Parent == undefined) {
                    instance.Parent = Nowhere;
                }

                instance.ParentValue[instance.Id] = instance;

                return instance.Parent[instance.Id]
            },
        },

        "Camera2d": {
            "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, RotVelocity: 0, Velocity: Vector2.new(), Zoom: 100}) {
                let instance = Instance.Instance2d.new(data);
                instance.Position = data.Position;
                instance.Zoom = data.Zoom;
                
                // instance.__defineGetter__("Position", function() {
                //     return instance.PositionValue
                // })

                // instance.__defineSetter__("Position", function(pos) {
                //     instance.PositionValue = pos

                //     InputService.CameraMove(instance)
                // })

                instance.Class = "Camera2d";

                Instance.giveinstancefunctions(instance);

                if(data.Parent == undefined) {
                    instance.Parent = Nowhere;
                }

                instance.ParentValue[instance.Id] = instance;

                return instance.Parent[instance.Id]
            },
        },

        "Service": {
            "new": function(data = {Id: Instance.id.new(), Parent: Nowhere}) {
                let instance = Instance.new(data.Id, data.Id, data.Parent);

                Instance.giveinstancefunctions(instance);

                if(data.Parent == undefined) {
                    instance.Parent = Nowhere;
                }
        
                instance.ParentValue[instance.Id] = instance;

                return instance
            },

            "turn": function(original, id, parent) {
                let instance = Instance.Service.new(id, parent);

                return {...instance, ...original}
            },
        },

        "turn": function(original, id, type, position, size, drawdata, parent) {
            let instance = Instance.new(id, type, position, size, drawdata, parent);
            
            return {...instance, ...original}
        },

        "isinstance": function(instance) {
            if(instance == null) {return false}

            return !(instance.Class == undefined) && !(instance.Id == undefined)
        },

        "giveinstance": function(instance, id, type, classname) {
            instance.Id = id;
            instance.Type = type;
            instance.Class = classname;
            instance.ParentValue = null;

            Instance.giveinstancefunctions(instance);
        },

        "giveinstancefunctions": function(instance) {
            instance.Move = function(parent) {
                let properparent = parent;

                if(parent == undefined) {
                    properparent = Nowhere;
                }

                properparent[instance.Id] = instance;

                if(instance.Parent) {
                    delete instance.ParentValue[instance.Id];
                }

                instance.ParentValue = parent;
            };

            instance.Destroy = function() {
                if(instance.Parent) {
                    delete instance.ParentValue[instance.Id];
                }
            };

            instance.GetChildren = function() {
                let children = {};

                for(const [key, value] of Object.entries(instance)) {
                    if(Instance.isinstance(value) && !(key == "Parent") && !(key == "ParentValue")) {
                        children[key] = value;
                    }
                }

                return children
            };

            instance.GetDescendents = function() {
                let descendents = {};

                for(const [key, value] of Object.entries(instance.GetChildren())) {
                    descendents[key] = value;

                    for(const [key2, value2] of Object.entries(value.GetDescendents())) {
                        descendents[key2] = value2;
                    }
                }

                return descendents
            };

            instance.IsA = function(instanceclass = Instance | "Instance") {
                if(typeof instanceclass == "object") {
                    return (Instance[instance.Class] == instanceclass) || (instance.Class == "Instance" && instanceclass == Instance)
                } else if(typeof instanceclass == "string") {
                    return instance.Class == instanceclass
                }
            };

            instance.Script = function(speed, instance) {

            };

            instance.__defineGetter__("Parent", function() {
                return instance.ParentValue
            });

            instance.__defineSetter__("Parent", function(parent) {
                instance.Move(parent);
            });
        },

        "id": {
            "new": function() {
                return Math.round(Math.random()*100000000)
            },
        },
    };

    const Screen = {
        "Camera": null,
        "Size": Vector2.new(window.innerWidth, window.innerHeight),
    };

    const RenderService = {
        "LoadImage": function(directory) {
            const image = document.createElement("img");
            image.src = directory;
            image.classname = "loadedimage";

            loadedimages.appendChild(image);
            ComputeStorage.RenderService.LoadedImages[directory] = image;

            return image
        },

        "Draw": function(drawframe) {
            const ctx = canvas.getContext("2d");

            if(Screen.Camera && !drawframe.Gui) {
                ctx.translate(((drawframe.Position.x - Screen.Camera.Position.x) * (Screen.Camera.Zoom / 100)) + Screen.Size.x / 2, ((drawframe.Position.y - Screen.Camera.Position.y) * (Screen.Camera.Zoom / 100)) + Screen.Size.y / 2);
            } else {
                ctx.translate(drawframe.Position.x + Screen.Size.x / 2, drawframe.Position.y + Screen.Size.y / 2);
            }

            ctx.rotate(drawframe.Rotation * Math.PI / 180);

            if(drawframe.DrawData.DrawType == Enum.DrawType.Rectangle) {
                ctx.fillStyle = Convert.RgbToHex(drawframe.DrawData.Type);

                if(Screen.Camera && !drawframe.Gui) {
                    ctx.fillRect((-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100));
                } else {
                    ctx.fillRect(-drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y);
                }
            }

            if(drawframe.DrawData.DrawType == Enum.DrawType.Image) {
                if(!ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]) {
                    RenderService.LoadImage(drawframe.DrawData.Type);
                }

                const image = ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type];

                ctx.fillStyle = drawframe.DrawData.Type;
                ctx.imageSmoothingEnabled = true;
                ctx.mozImageSmoothingEnabled = true;
                ctx.webkitImageSmoothingEnabled = true;

                if(Screen.Camera && !drawframe.Gui) {
                    ctx.drawImage(image, (-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100));
                } else {
                    ctx.drawImage(image, -drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y);
                }
            }

            if(drawframe.DrawData.DrawType == Enum.DrawType.PixelImage) {
                if(!ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type]) {
                    RenderService.LoadImage(drawframe.DrawData.Type);
                }

                const image = ComputeStorage.RenderService.LoadedImages[drawframe.DrawData.Type];

                ctx.fillStyle = drawframe.DrawData.Type;
                ctx.imageSmoothingEnabled = false;
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;

                if(Screen.Camera && !drawframe.Gui) {
                    ctx.drawImage(image, (-drawframe.Size.x / 2) * (Screen.Camera.Zoom / 100), (-drawframe.Size.y / 2) * (Screen.Camera.Zoom / 100), drawframe.Size.x * (Screen.Camera.Zoom / 100), drawframe.Size.y * (Screen.Camera.Zoom / 100));
                } else {
                    ctx.drawImage(image, -drawframe.Size.x / 2, -drawframe.Size.y / 2, drawframe.Size.x, drawframe.Size.y);
                }
            }

            //ctx.rotate(-drawframe.Rotation * Math.PI / 180)
            ctx.resetTransform();

            // if(Screen.Camera && !drawframe.Gui) {
            //     ctx.translate(-drawframe.Position.x - Screen.Camera.Position.x, -drawframe.Position.y - Screen.Camera.Position.y)
            // } else {
            //     ctx.translate(-drawframe.Position.x, -drawframe.Position.y)
            // }
        }
    };

    // import { Instance } from 'https://nikaxe-dev.github.io/Instance2d/Instance2d.js';

    var lastupdate = Date.now();

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
                instance.Position.x += instance.Velocity.x;
                instance.Position.y += instance.Velocity.y;
                instance.Rotation += instance.RotVelocity;

                if(instance.Rotation >= 360) {
                    instance.Rotation -= 360;
                }

                if(instance.Rotation <= 0) {
                    instance.Rotation += 360;
                }
            },

            "Camera2d": function(speed, instance) {
                instance.Position.x += instance.Velocity.x;
                instance.Position.y += instance.Velocity.y;
                instance.Rotation += instance.RotVelocity;

                if(instance.Rotation >= 360) {
                    instance.Rotation -= 360;
                }

                if(instance.Rotation <= 0) {
                    instance.Rotation += 360;
                }
            },

            "Cooldown": function(speed, instance) {
                if(instance.Playing) {
                    instance.Time -= speed;

                    if(instance.Time <= 0) {
                        instance.OnEnd();

                        if(instance.Loop) {
                            instance.Time = instance.MaxTime;
                        } else {
                            instance.Stop();
                        }
                    }
                }
            },
        },

        "instancedrawframe": function(instance) {
            if(instance.Class == "Sprite2d") {
                RenderService.Draw(DrawFrame.new(instance.DrawData, instance.Position, instance.Rotation, instance.Size));
            }
        },

        "instancelogicframe": function(speed, instance) {
            if(RunService.classlogicframes[instance.Class]) {
                RunService.classlogicframes[instance.Class](speed, instance);
            }

            instance.Script(speed, instance);
        },
        
        "logicframe": function(speed, instances) {
            // const instanceorder = Object.values(instances)

            // instanceorder.sort(function(a, b) {
            //     return a.ZIndex - b.ZIndex
            // })

            // // console.log(instanceorder)

            // // for(const [key, value] of Object.entries(instances)) {
            // //     RunService.instancedrawframe(value)
            // // }

            // instanceorder.forEach(function(value) {
            //     RunService.instancelogicframe(1, value)
            // })

            for(const [key, value] of Object.entries(instances)) {
                RunService.instancelogicframe(speed, value);
            }
        },

        "drawframe": function(instances) {
            canvas.width = Screen.Size.x;
            canvas.height = Screen.Size.y;

            RenderService.Draw(DrawFrame.new(DrawData.new(Enum.DrawType.Rectangle, Game.BackgroundColor3), Vector2.new(), 0, Vector2.new(canvas.width, canvas.height), true));

            const instanceorder = Object.values(instances);

            instanceorder.sort(function(a, b) {
                return a.ZIndex - b.ZIndex
            });

            instanceorder.forEach(function(value) {
                RunService.instancedrawframe(value);
            });
        },

        "frame": function() {
            const now = Date.now();
            const deltatime = now - lastupdate;
            lastupdate = now;

            RunService.DeltaTime = deltatime / 1000;

            try {
                const instances = Game.GetDescendents();
                const drawinstances = Screen.GetDescendents();
                RunService.logicframe(RunService.DeltaTime * RunService.GameSpeed, instances);
                RunService.drawframe(drawinstances);
            }

            catch(error) {
                console.error(error + "\n\n" + error.stack + "\n" + "Instance2D: Did you forget to call Game.Init(canvas)?");
            }
        },

        "GameSpeed": 1,
        "TargetFrameRate": 60,
        "DeltaTime": 16,
    };

    let canvas = document.getElementById("canvas");

    if(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    const loadedimages$1 = document.createElement("div");
    loadedimages$1.style.display = "none";
    loadedimages$1.id = "loadedimages";

    document.body.appendChild(loadedimages$1);

    const Game = {
        "BackgroundColor3": Color3.new(0, 0, 0),
        "DoDisableRightClickMenu": true,

        "Screen": Screen,
        "Instance": Instance,
        "Nowhere": Nowhere,
        "RunService": RunService,
        "RenderService": RenderService,
        "InputService": InputService,
        "Init": function(newcanvas) {
            // Initializes the game

            if(newcanvas) {
                canvas = newcanvas;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            Instance.giveinstance(Screen, "Screen", "Screen", "Service");
            Instance.giveinstance(Instance, "Instance", "Instance", "Service");
            Instance.giveinstance(Nowhere, "Nowhere", "Nowhere", "Service");
            Instance.giveinstance(RunService, "RunService", "RunService", "Service");
            Instance.giveinstance(RenderService, "RenderService", "RenderService", "Service");
            Instance.giveinstance(InputService, "InputService", "InputService", "Service");

            Instance.giveinstance(Game, "Game", "Game", "Service");

            if(Game.DoDisableRightClickMenu) {
                document.addEventListener("contextmenu", function(e) {
                    e.preventDefault();
                });
            }

            //Draw background to avoid flashes when reloading the page.

            RenderService.Draw(DrawFrame.new(DrawData.new(Enum.DrawType.Rectangle, Game.BackgroundColor3), Vector2.new(0), 0, Vector2.new(canvas.width, canvas.height), true));

            //Begin listening for input

            InputService.BeginListen();
        },

        "Start": function(gameloop = function() { RunService.frame(); }) {
            setInterval(gameloop, 1000 / RunService.TargetFrameRate);
        },

        set Canvas(canvas) {
        },

        get Canvas() {
            return canvas
        },
    };