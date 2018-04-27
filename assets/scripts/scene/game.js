
var soundMgr = require("common/soundManager")
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.doorLoading = cc.find("Canvas/loadingDoor").getComponent("loadingDoor");
    },

    start () {
        soundMgr.playMusic("resources/sound/music/game_bg1.mp3",true)
    },

    back(){
        this.doorLoading.loadScene("roadmap")
    },
    // update (dt) {},
});
