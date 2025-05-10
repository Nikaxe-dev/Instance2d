import * as Instance2d from "/Instance2d.js"

let instance = Instance2d.Instance

let sound = instance.Sound.new({
    Type: "",
    SoundUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
})

console.log(instance.Sprite2d.new({Type: ""}))

console.log(sound)

setInterval(sound.Play, 1000)