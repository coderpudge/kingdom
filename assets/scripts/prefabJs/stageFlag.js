
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.stageId = -1;
        this.enterStageBtn = this.node.addComponent(cc.Button);
        var clickEvent = new cc.Component.EventHandler()
        clickEvent.target = this.node;
        clickEvent.component = "stageFlag"
        clickEvent.handler = "onEnterStage"
        clickEvent.customEventData = "";
        this.enterStageBtn.clickEvents = [clickEvent];
        this.enterStageBtn.transition = cc.Button.Transition.SCALE;
        this.enterStageBtn.target = this.node;
        this.enterStageBtn.duration = 0.05;
        this.enterStageBtn.zoomScale = 1.05

        this.star = [];
        for(let i =0;i<3;i++){
            this.star[i] =  this.node.getChildByName("star_empty"+i).getChildByName("star")     
        }
        
    },

    start () {
        // this.setStageId(0);
        // this.showStar(0);
    },
    setStageId(id){
        this.stageId = id;
    },
    showStar(num){
        if(num >3 || num < 0){
            return;
        }
        var i = 0
        for (i = 0; i < num; i++) {
            this.star[i].active = true;
        }
        for(;i<3;i++){
            this.star[i].active = false;
        }
    },
    onEnterStage(level){
        console.log("onEnterStage ",this.stageId);
        var event = new cc.Event.EventCustom("onEnterStage",true)
        event.setUserData({stageId:this.stageId})
        this.node.dispatchEvent(event);
    },
    // update (dt) {},
});
