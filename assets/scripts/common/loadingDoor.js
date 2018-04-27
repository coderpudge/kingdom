// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var soundMgr = require("soundManager")
cc.Class({
    extends: cc.Component,

    properties: {
        doorState:0, //0:close, 1:open
        animDuration:0.5,
    },


    onLoad () {
        this.leftDoor = this.node.getChildByName("l_door");
        this.rightDoor = this.node.getChildByName("r_door");
        this.setDoorState(this.doorState);
    },

    start () {
        // this.open();
    },
    // 开门
    open(endFunc){
        if (this.doorState === 1) {
            return;
        }
        this.doorState = 1;
        var m1 = cc.moveBy(this.animDuration, -cc.winSize.width * 0.5 - 4, 0);
        this.leftDoor.runAction(m1);
        var m2 = cc.moveBy(this.animDuration, cc.winSize.width * 0.5 + 4, 0);
      
        var cb = cc.callFunc(function() {
            if (endFunc) {
                endFunc();
            }
        }.bind(this),this.rightDoor);
        var seq = cc.sequence(m2,cb);
        this.rightDoor.runAction(seq);
    },
    //关门
    close:function(endFunc){
        console.log("close");
        if (this.doorState === 0) {
            return;
        }
        this.doorState = 0;
        var m1 = cc.moveBy(this.animDuration, cc.winSize.width * 0.5 + 4, 0);
        this.leftDoor.runAction(m1);
        var m2 = cc.moveBy(this.animDuration, -cc.winSize.width * 0.5 - 4, 0);
      
        var cb = cc.callFunc(function() {
            soundMgr.playEffect("resources/sound/close_door.mp3")
            if (endFunc) {
                var shadule = this.scheduleOnce(function(){
                    endFunc();
                }.bind(this),0.5);
            }
        }.bind(this),this.rightDoor);
        var seq = cc.sequence(m2,cb);
        this.rightDoor.runAction(seq);
    },
    //设置状态
    setDoorState(state){
        // if (this.doorState == state) {
        //     return;
        // }
        this.doorState = state;
        if (state == 0) {
            this.leftDoor.x = 2;
            this.rightDoor.x = -2;
        }else if(state == 1){
            this.leftDoor.x = -cc.winSize.width * 0.5 - 2;
            this.rightDoor.x = cc.winSize.width * 0.5 + 2
        }
    },
    loadScene(scene,cb){
        this.close(function(){
            cc.director.loadScene(scene,function(){
                var loadingDoor = cc.find("Canvas/loadingDoor").getComponent("loadingDoor");
                loadingDoor.open();
                if (cb) {
                    cb();
                }
            });
        })
    }
    // update (dt) {},
});
