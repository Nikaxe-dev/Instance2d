import { DrawData, Enum, Vector2 } from "./Data.js"

import { Nowhere } from "./Nowhere.js"
import { InputService } from "./InputService.js"

const Instance = {
    "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere}) {
        let instance = {
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

            let instance = Instance.new(data)
            instance.Position = data.Position
            instance.Rotation = data.Rotation
            instance.RotVelocity = data.RotVelocity
            instance.Velocity = data.Velocity
            instance.Size = data.Size

            instance.Class = "Instance2d"

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
            }

            instance.ParentValue[instance.Id] = instance

            return instance.Parent[instance.Id]
        },
    },

    "Sprite2d": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Position: Vector2.new(), Rotation: 0, RotVelocity: 0, Velocity: Vector2.new(), Size: Vector2.new(), CollisionType: Enum.CollisionType.Rectangle, DrawData: DrawData.new(), ZIndex: 0}) {
            let instance = Instance.Instance2d.new(data)
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

    "Cooldown": {
        "new": function(data = {Id: Instance.id.new(), Type, Parent: Nowhere, Time: 1, Loop: false, OnEnd: function() {}}) {
            let instance = Instance.new(data)
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
            let instance = Instance.Instance2d.new(data)
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

    "Service": {
        "new": function(data = {Id: Instance.id.new(), Parent: Nowhere}) {
            let instance = Instance.new(data.Id, data.Id, data.Parent)

            Instance.giveinstancefunctions(instance)

            if(data.Parent == undefined) {
                instance.Parent = Nowhere
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

    "id": {
        "new": function() {
            return Math.round(Math.random()*100000000)
        },
    },
}

export {Instance}