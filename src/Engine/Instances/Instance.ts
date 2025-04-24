// Base of all instances

interface InstanceInstance {
    Name: string,
    Id: string,
    ParentValue: InstanceInstance | null,
    Parent?: InstanceInstance | null,

    Children: { [key: string]: InstanceInstance },

    GetChildren?: Function,
    Move: Function,

    SetAttribute: Function,
    GetAttribute: Function,
    GetAttributes: Function,

    Attributes: { [key: string]: any },

    HasTag: Function,
    AddTag: Function,
    GetTags: Function,

    Tags: string[],
}

const Instance = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        let instance: InstanceInstance = {
            Name: Name,
            Id: Id,
            ParentValue: null,

            Children: {},

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
    }
}

export {InstanceInstance, Instance}