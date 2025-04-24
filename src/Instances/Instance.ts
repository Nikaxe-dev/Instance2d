// Base of all instances

interface InstanceInstance {
    Name: string,
    Id: string,
    Parent: InstanceInstance | null,
    GetChildren?: Function,
}

const Instance = {
    new: function(Name: string = "Instance", Id: string = "Instance", Parent: InstanceInstance | null = null) {
        let instance: InstanceInstance = {
            Name: Name,
            Id: Id,
            Parent: Parent
        }

        return instance
    }
}

export {InstanceInstance, Instance}