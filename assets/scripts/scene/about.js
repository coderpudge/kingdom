
var soundMgr = require("common/soundManager")

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.door = cc.find("Canvas/loadingDoor").getComponent("loadingDoor")
    },

    start () {

    },
    onBack(){
        this.door.close(function() {
            cc.director.loadScene("home",function(){
                var door = cc.find("Canvas/loadingDoor").getComponent("loadingDoor");
                door.setDoorState(0);
                door.open();
            })
        });

    },
    // update (dt) {},
});
