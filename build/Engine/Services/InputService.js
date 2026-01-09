import { Service } from "../Instances/Service.js";
const InputServiceFactory = {
    new: function (Parent) {
        let instance = Service.new("InputService", Parent);
        instance.Mouse = {
            PositionX: 0,
            PositionY: 0,
            Button1Down: false,
            Button2Down: false,
            Button3Down: false,
        };
        instance.Keyboard = {};
        instance.KeyDown = function (key) {
            return instance.Keyboard[key];
        };
        instance.Init = function () {
            addEventListener("keydown", function (event) {
                instance.Keyboard[event.key] = true;
                instance.Keyboard[event.key.toLowerCase()] = true;
            });
            addEventListener("keyup", function (event) {
                instance.Keyboard[event.key] = false;
                instance.Keyboard[event.key.toLowerCase()] = false;
            });
            addEventListener("mousemove", function (event) {
                instance.Mouse.PositionX = event.x;
                instance.Mouse.PositionY = event.y;
            });
            addEventListener("mousedown", function (event) {
            });
        };
        instance.Derived = this.Derived;
        instance.Base = this.Base;
        instance.Class = InputServiceFactory;
        instance.Init();
        return instance;
    },
    Derived: Service,
    Base: Service
};
export { InputServiceFactory };
