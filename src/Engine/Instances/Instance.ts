// Base of all instances

interface InstanceInstance {
    Name: string,
    Id: string,
    ParentValue: InstanceInstance | null,
    Parent?: InstanceInstance | null,

    Children: { [key: string]: InstanceInstance },

    GetChildren?: Function,
    Move: Function,
}

const Instance = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        let instance: InstanceInstance = {
            Name: Name,
            Id: Id,
            ParentValue: null,

            Children: {},

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
            }
        }

        // Functions

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