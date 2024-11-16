import { Game } from "./Instance2d.js"
import { RenderService, Screen } from "./Instance2d.js"
import { DrawFrame, DrawData, Enum, Vector2 } from "./Data.js"
import { Instance } from 'https://nikaxe-dev.github.io/Instance2d/Instance2d.js';

var lastupdate = Date.now()

const RunService = {
    "classlogicframes": {
        /*
        Example:

        "Sprite2d": function(instance) {
            instance.Position.x += instance.Velocity.x
            instance.Position.y += instance.velocity.y
        }
        */

        "Sprite2d": function(speed, instance) {
            instance.Position.x += instance.Velocity.x
            instance.Position.y += instance.Velocity.y
            instance.Rotation += instance.RotVelocity

            if(instance.Rotation >= 360) {
                instance.Rotation -= 360
            }

            if(instance.Rotation <= 0) {
                instance.Rotation += 360
            }
        },

        "Camera2d": function(speed, instance) {
            instance.Position.x += instance.Velocity.x
            instance.Position.y += instance.Velocity.y
            instance.Rotation += instance.RotVelocity

            if(instance.Rotation >= 360) {
                instance.Rotation -= 360
            }

            if(instance.Rotation <= 0) {
                instance.Rotation += 360
            }
        },

        "Cooldown": function(speed, instance) {
            if(instance.Playing) {
                instance.Time -= (1/RunService.TargetFrameRate) * speed

                if(instance.Time <= 0) {
                    instance.OnEnd()

                    if(instance.Loop) {
                        instance.Time = instance.MaxTime
                    } else {
                        instance.Stop()
                    }
                }
            }
        },
    },

    "instancedrawframe": function(instance) {
        if(instance.Class == "Sprite2d") {
            RenderService.Draw(DrawFrame.new(instance.DrawData, instance.Position, instance.Rotation, instance.Size))
        }
    },

    "instancelogicframe": function(speed, instance) {
        if(RunService.classlogicframes[instance.Class]) {
            RunService.classlogicframes[instance.Class](speed, instance)
        }

        instance.Script(speed, instance)
    },
    
    "logicframe": function(speed, instances) {
        for(const [key, value] of Object.entries(instances)) {
            RunService.instancelogicframe(speed, value)
        }
    },

    "drawframe": function(instances) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        RenderService.Draw(DrawFrame.new(DrawData.new(Enum.DrawType.Rectangle, Game.BackgroundColor3), Vector2.new(), 0, Vector2.new(canvas.width, canvas.height), true))

        const instanceorder = Object.values(instances)

        instanceorder.sort(function(a, b) {
            return a.ZIndex - b.ZIndex
        })

        // console.log(instanceorder)

        // for(const [key, value] of Object.entries(instances)) {
        //     RunService.instancedrawframe(value)
        // }

        instanceorder.forEach(function(value) {
            RunService.instancedrawframe(value)
        })
    },

    "frame": function(speed) {
        // const now = Date.now()
        // const deltatime = (now - lastupdate) / 30
        // const fps = now - lastupdate
        // lastupdate = now

        RunService.DeltaTime = speed
        // RunService.Fps = fps

        const instances = Game.GetDescendents()
        const drawinstances = Screen.GetDescendents()
        RunService.logicframe(RunService.DeltaTime * RunService.GameSpeed, instances)
        RunService.drawframe(drawinstances)
    },

    "GameSpeed": 1,
    "TargetFrameRate": 60,
}

export {RunService}