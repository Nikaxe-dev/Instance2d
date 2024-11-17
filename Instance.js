import { DrawData, Enum, Vector2 } from "./Data.js"

import { Nowhere } from "./Nowhere.js"
import { InputService } from "./InputService.js"

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
        "new": function(id, type, position = Vector2.new(), rotation = 0, rotationvelocity = 0, velocity = Vector2.new(), size = Vector2.new(50, 50), collisiontype = Enum.CollisionType.Rectangle, parent = Nowhere) {
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
        "new": function(id, type, position = Vector2.new(), rotation = 0, rotationvelocity = 0, velocity = Vector2.new(), size = Vector2.new(50, 50), drawdata = DrawData.new(), zindex = 0, collisiontype = Enum.CollisionType.Rectangle, parent = Nowhere) {
            let instance = Instance.Instance2d.new(id, type, position, rotation, rotationvelocity, velocity, size, parent)
            instance.DrawData = drawdata
            instance.ZIndex = zindex

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
        "new": function(id, type, time = 1, loop = false, onend = function() {}, parent = Nowhere) {
            let instance = Instance.new(id, type, parent)
            instance.MaxTime = time
            instance.Time = time
            instance.Loop = loop
            instance.OnEnd = onend
            instance.Playing = false

            instance.Play = function() {
                instance.Playing = true
            }

            instance.Stop = function() {
                instance.Playing = false
            }

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
            // instance.PositionValue = position
            instance.Zoom = zoom
            
            // instance.__defineGetter__("Position", function() {
            //     return instance.PositionValue
            // })

            // instance.__defineSetter__("Position", function(pos) {
            //     instance.PositionValue = pos

            //     InputService.CameraMove(instance)
            // })

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

export {Instance}