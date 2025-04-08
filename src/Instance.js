import { DrawData, Enum, Vector2 } from "./Data.js"

import { Nowhere } from "./Nowhere.js"
import { InputService } from "./InputService.js"
import { Utils } from "./Instance2d.js"
import { Screen } from "./Instance2d.js"

const Instance = {
    "new": function(data = {Id: Instance.id.new(), Type: "", Parent: Nowhere}) {
        const instance = {
            "Id": data.Id,
            "Type": data.Type,
            "Class": "Instance",
            "ParentValue": data.Parent,
        }

        Instance.giveinstancefunctions(instance)

        if(data.Parent == undefined) {
            instance.Parent = Nowhere
        }
    
        instance.ParentValue[instance.Id] = instance

        return instance
    },
    
    "Instance2d": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, RotVelocity: 0, Velocity: Vector2.new(), Size: Vector2.new(), CollisionType: Enum.CollisionType.Rectangle}) {
            // const instance = {
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

            const instance = Instance.new(data)
            instance.Position = data.Position
            instance.Rotation = data.Rotation
            instance.RotVelocity = data.RotVelocity
            instance.Velocity = data.Velocity
            instance.Size = data.Size

            instance.Class = "Instance2d"

            Instance.giveinstancefunctions(instance)

            instance.ApplyForce = function(force = Vector2.new()) {
                instance.Velocity = Vector2.new(instance.Velocity.x + force.x, instance.Velocity.y + force.y)
            }

            instance.Colliding = function(colliding = Instance.Sprite2d.new({})) {
                if(Instance.isinstance(colliding)) {
                    if(colliding.IsA("Instance2d")) {
                        if(instance.IsA("Instance2d")) {
                            return instance.Position == colliding
                        }
    
                        const left = instance.Position.x - instance.Size.x / 2
                        const right = instance.Position.x + instance.Size.x / 2
                        const up = instance.Position.y - instance.Size.y / 2
                        const down = instance.Position.y + instance.Size.y / 2
    
                        return (
                            colliding.Position.x > left && colliding.Position.x < right &&
                            colliding.Position.y > up && colliding.Position.y < down
                        )
                    }

                    if(colliding.IsA("Sprite2d")) {
                        if(instance.IsA("Instance2d")) {
                            return colliding.Colliding(instance)
                        }

                        const instanceleft = instance.Position.x - instance.Size.x / 2
                        const instanceright = instance.Position.x + instance.Size.x / 2
                        const instanceup = instance.Position.y - instance.Size.y / 2
                        const instancedown = instance.Position.y + instance.Size.y / 2

                        const collidingleft = colliding.Position.x - colliding.Size.x / 2
                        const collidingright = colliding.Position.x + colliding.Size.x / 2
                        const collidingup = colliding.Position.y - colliding.Size.y / 2
                        const collidingdown = colliding.Position.y + colliding.Size.y / 2

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

                    const left = instance.Position.x - instance.Size.x / 2
                    const right = instance.Position.x + instance.Size.x / 2
                    const up = instance.Position.y - instance.Size.y / 2
                    const down = instance.Position.y + instance.Size.y / 2

                    return (
                        colliding.x > left && colliding.x < right &&
                        colliding.y > up && colliding.y < down
                    )
                }
            }

            instance.GetAllCollidingInstances = function() {
                const checks = Utils.Table.Merge(Screen.GetAllOfClass("Sprite2d"), Screen.GetAllOfClass("Instance2d"))
                const colliding = {}

                for (const [key, value] of Object.entries(checks)) {
                    if(instance.Colliding(value)) {
                        colliding[key] = value
                    }
                }

                return colliding
            }

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Sprite2d": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, RotVelocity: 0, Velocity: Vector2.new(), Size: Vector2.new(), CollisionType: Enum.CollisionType.Rectangle, DrawData: DrawData.new(), ZIndex: 0}) {
            const instance = Instance.Instance2d.new(data)
            instance.DrawData = data.DrawData
            instance.ZIndex = data.ZIndex

            instance.Class = "Sprite2d"

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Text": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, Size: Vector2.new(), DrawData: DrawData.new(), ZIndex: 0, Text: "Undefined", Font: "48px Serif"}) {
            const instance = Instance.Instance2d.new(data)
            instance.ZIndex = data.ZIndex
            instance.DrawData = data.DrawData
            instance.Text = data.Text
            instance.Font = data.Font


            instance.Class = "Text"

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Cooldown": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Time: 1, Loop: false, OnEnd: function() {}}) {
            const instance = Instance.new(data)
            instance.MaxTime = data.Time
            instance.Time = data.Time
            instance.Loop = data.Loop
            instance.OnEnd = data.OnEnd
            instance.Playing = false

            instance.Play = function() {
                instance.Playing = true
            }

            instance.Stop = function() {
                instance.Playing = false
            }

            instance.Class = "Cooldown"

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Camera2d": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, RotVelocity: 0, Velocity: Vector2.new(), Zoom: 100}) {
            const instance = Instance.Instance2d.new(data)
            instance.Position = data.Position
            instance.Zoom = data.Zoom
            
            // instance.__defineGetter__("Position", function() {
            //     return instance.PositionValue
            // })

            // instance.__defineSetter__("Position", function(pos) {
            //     instance.PositionValue = pos

            //     InputService.CameraMove(instance)
            // })

            instance.Class = "Camera2d"

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Sound": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, SoundUrl, Volume: 1}) {
            const instance = Instance.new(data)
            instance.SoundUrl = data.SoundUrl
            instance.Volume = data.Volume

            instance.Class = "Sound"

            instance.Play = function() {
                let sound = new Sound(instance.SoundUrl)
                sound.Play()
            }

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }

            console.log("Instance", instance)

            return instance.Parent[instance.Id]
        }
    },

    "Service": {
        "new": function(data = {Id: Instance.id.new(), Parent: Nowhere}) {
            const instance = Instance.new(data.Id, data.Id, data.Parent)

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }
    
            instance.ParentValue[instance.Id] = instance

            return instance
        },

        "turn": function(original, id, parent) {
            const instance = Instance.Service.new(id, parent)

            return {...instance, ...original}
        },
    },

    "turn": function(original, id, type, position, size, drawdata, parent) {
        const instance = Instance.new(id, type, position, size, drawdata, parent)
        
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

        instance.Destroy = function() {
            if(instance.Parent) {
                delete instance.ParentValue[instance.Id]
            }
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

        instance.GetAncestors = function() {
            let ancestors = {}
            let current = instance

            while(current.Parent != null) {
                current = current.Parent
                ancestors[current.Id] = current
            }

            return ancestors
        }

        instance.GetInstancesOfClass = function(name) {
            let descendents = instance.GetDescendents()
            let elements = {}

            for (const [key, element] of Object.entries(descendents)) {
                if(element.IsA(name)) {
                    elements[key] = element
                }
            }

            return elements
        }

        instance.GetAllOfClass = instance.GetInstancesOfClass

        instance.GetInstancesOfType = function(name) {
            let descendents = instance.GetDescendents()
            let elements = {}

            for (const [key, element] of Object.entries(descendents)) {
                if(element.Type == name) {
                    elements[key] = element
                }
            }

            return elements
        }

        instance.FindFirstChild = function(id) {
            let descendents = instance.GetChildren()

            for (const [key, inst] of Object.entries(descendents)) {
                if(element.Id == id) {
                    return inst
                }
            }
        }

        instance.FindFirstDescendent = function(id) {
            let descendents = instance.GetDescendents()

            for (const [key, inst] of Object.entries(descendents)) {
                if(element.Id == id) {
                    return inst
                }
            }
        }

        instance.IsA = function(instanceclass = Instance | "Instance") {
            if(typeof instanceclass == "object") {
                return (Instance[instance.Class] == instanceclass) || (instance.Class == "Instance" && instanceclass == Instance)
            } else if(typeof instanceclass == "string") {
                return instance.Class == instanceclass
            }
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

    "id": {
        "new": function() {
            return Math.round(Math.random()*100000000)
        },
    },
}

export {Instance}