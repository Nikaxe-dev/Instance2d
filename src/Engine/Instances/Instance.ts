// Base of all instances

interface InstanceInstance {
    Name: string
    Id: string
    ParentValue: InstanceInstance | null
    Parent: InstanceInstance | null

    Children: { [key: string]: InstanceInstance }

    // Parent Child

    GetChildren(): InstanceInstance[]
    GetDescendents(): InstanceInstance[]

    FindFirstChild(name: string): InstanceInstance | null
    FindFirstDescendent(name: string): InstanceInstance | null

    FindFirstChildOfId(id: string): InstanceInstance | null
    FindFirstDescendentOfId(id: string): InstanceInstance | null

    Move(parent: InstanceInstance): undefined

    // Attributes / Tags

    SetAttribute(name: string, value: any): undefined
    GetAttribute(name: string): any
    GetAttributes(): object

    Attributes: { [key: string]: any }

    HasTag(name: string): boolean
    AddTag(name: string): undefined
    GetTags(): object

    Tags: string[]

    // FrameTasks

    FrameTasks: { [key: string]: Function }

    AddFrameTask(name: string, func: Function): undefined

    // Types

    Derived: object | null
    Base: object | null
    Class: object

    IsA(type: object): boolean
    IsExactlyA(type: object): boolean
}

const Instance = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        let instance: InstanceInstance = {
            Name: Name,
            Id: Id,
            ParentValue: null,
            Parent: null,
            Class: Instance,

            Derived: null,
            Base: null,

            Children: {},

            // FrameTasks

            FrameTasks: {

            },

            AddFrameTask: function(name, func) {
                instance.FrameTasks[name] = func
            },

            // Parent Child

            Move: function(parent: InstanceInstance) {
                if(parent === undefined || parent === null) {
                    return
                }

                parent.Children[instance.Name] = instance

                Object.defineProperty(parent, instance.Name, {
                    get: function() {
                        return parent.Children[instance.Name]
                    },
        
                    set: function(value) {
                        parent.Children[instance.Name] = value
                    },
        
                    enumerable: true,
                    configurable: true,
                })

                if(instance.ParentValue != null) {
                    delete instance.ParentValue.Children[instance.Name]
                }

                instance.ParentValue = parent
            },

            GetChildren: function() {
                const children: InstanceInstance[] = Object.values(instance.Children)
                return children
            },

            GetDescendents: function() {
                let descendents: InstanceInstance[] = []

                instance.GetChildren().forEach((value, index) => {
                    descendents.push(value)

                    value.GetChildren().forEach((value2, index2) => {
                        descendents.push(value2)
                    })
                })

                return descendents
            },

            FindFirstChild: function(name) {
                instance.GetChildren().forEach((value, index) => {
                    if(value.Name == name) {
                        return value
                    }
                })

                return null
            },

            FindFirstDescendent: function(name) {
                instance.GetDescendents().forEach((value, index) => {
                    if(value.Name == name) {
                        return value
                    }
                })

                return null
            },

            FindFirstChildOfId: function(name) {
                instance.GetChildren().forEach((value, index) => {
                    if(value.Id == name) {
                        return value
                    }
                })

                return null
            },

            FindFirstDescendentOfId: function(name) {
                instance.GetDescendents().forEach((value, index) => {
                    if(value.Id == name) {
                        return value
                    }
                })

                return null
            },

            // Attributes

            Attributes: {},

            SetAttribute: function(name: string, value: any) {
                instance.Attributes[name] = value
            },

            GetAttribute: function(name: string) {
                return instance.Attributes[name]
            },

            GetAttributes: function() {
                return instance.Attributes
            },

            // Tags

            Tags: [],

            HasTag: function(name: string) {
                return instance.Tags.includes(name)
            },

            AddTag: function(name: string) {
                instance.Tags.push(name)
            },

            GetTags: function() {
                return instance.Tags
            },

            // Types

            IsA: function(type) {
                return instance.Class == type || instance.Derived == type || instance.Base == type
            },

            IsExactlyA: function(type) {
                return instance.Class == type
            }
        }

        // Parent Child

        Object.defineProperty(instance, "Parent", {
            get: function() {
                return instance.ParentValue
            },

            set: function(parent) {
                instance.Move(parent)
            },

            enumerable: true,
            configurable: true,
        })

        instance.Parent = Parent

        return instance
    },

    Derived: null,
    Base: null,
}

export {InstanceInstance, Instance}