var soundMgr = require("common/soundManager")
cc.Class({
    extends: cc.Component,

    properties: {
        musicSwitch:{
            default :null,
            type:cc.Toggle
        },
        effectSwitch:{
            default :null,
            type:cc.Toggle
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.musicSwitch.isChecked = soundMgr.music_mute;
        this.effectSwitch.isChecked = soundMgr.effect_mute;
        this.effectSwitch.getComponent(cc.Button).setSoundEffect(false);
    },
    onEffectSwitch(toggle){
        soundMgr.setEffectMute(toggle.isChecked?1:0)
    },
    onMusicSwitch(toggle){
        soundMgr.setMusicMute(toggle.isChecked?1:0)
    },

    start () {

    },

    // update (dt) {},
});
