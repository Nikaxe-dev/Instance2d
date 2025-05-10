const Instance = {
    new: function (Name = "Instance", Id = "Instance", Parent = null) {
        let instance = {
            Name: Name,
            Id: Id,
            ParentValue: null,
            Parent: null,
            Class: Instance,
            Derived: null,
            Base: null,
            Children: {},
            FrameTasks: {},
            AddFrameTask: function (name, func) {
                instance.FrameTasks[name] = func;
            },
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
            GetChildren: function () {
                const children = Object.values(instance.Children);
                return children;
            },
            GetDescendents: function () {
                let descendents = [];
                instance.GetChildren().forEach((value, index) => {
                    descendents.push(value);
                    value.GetChildren().forEach((value2, index2) => {
                        descendents.push(value2);
                    });
                });
                return descendents;
            },
            FindFirstChild: function (name) {
                instance.GetChildren().forEach((value, index) => {
                    if (value.Name == name) {
                        return value;
                    }
                });
                return null;
            },
            FindFirstDescendent: function (name) {
                instance.GetDescendents().forEach((value, index) => {
                    if (value.Name == name) {
                        return value;
                    }
                });
                return null;
            },
            FindFirstChildOfId: function (name) {
                instance.GetChildren().forEach((value, index) => {
                    if (value.Id == name) {
                        return value;
                    }
                });
                return null;
            },
            FindFirstDescendentOfId: function (name) {
                instance.GetDescendents().forEach((value, index) => {
                    if (value.Id == name) {
                        return value;
                    }
                });
                return null;
            },
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
            IsA: function (type) {
                return instance.Class == type || instance.Derived == type || instance.Base == type;
            },
            IsExactlyA: function (type) {
                return instance.Class == type;
            }
        };
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
    },
    Derived: null,
    Base: null,
};
export { Instance };
