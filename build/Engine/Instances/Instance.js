// Base of all instances
const Instance = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        let instance = {
            Name: Name,
            Id: Id,
            ParentValue: null,
            Children: {},
            // Parent Child
            Move: function (parent) {
                if (parent === undefined || parent === null) {
                    return;
                }
                parent.Children[instance.Name] = instance;
                Object.defineProperty(parent, instance.Name, {
                    get: function () {
                        return parent.Children[instance.Name];
                    },
                    set: function (value) {
                        parent.Children[instance.Name] = value;
                    },
                    enumerable: true,
                    configurable: true,
                });
                if (instance.ParentValue != null) {
                    delete instance.ParentValue.Children[instance.Name];
                }
                instance.ParentValue = parent;
            },
            // Attributes
            Attributes: {},
            SetAttribute: function (name, value) {
                instance.Attributes[name] = value;
            },
            GetAttribute: function (name) {
                return instance.Attributes[name];
            },
            GetAttributes: function () {
                return instance.Attributes;
            },
            // Tags
            Tags: [],
            HasTag: function (name) {
                return instance.Tags.includes(name);
            },
            AddTag: function (name) {
                instance.Tags.push(name);
            },
            GetTags: function () {
                return instance.Tags;
            },
        };
        // Parent Child
        Object.defineProperty(instance, "Parent", {
            get: function () {
                return instance.ParentValue;
            },
            set: function (parent) {
                instance.Move(parent);
            },
            enumerable: true,
            configurable: true,
        });
        instance.Parent = Parent;
        return instance;
    }
};
export { Instance };
