var ugame = require("../data/ugame")
var soundMgr = require("common/soundManager")

cc.Class({
    extends: cc.Component,

    properties: {
    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.doorLoading = cc.find("Canvas/loadingDoor").getComponent("loadingDoor");
        this.user = ugame.curUser;
        this.bloodLabel = cc.find("Canvas/resize/LT/gui_top_bk/blood").getComponent(cc.Label);
        this.goldLabel = cc.find("Canvas/resize/LT/gui_top_bk/gold").getComponent(cc.Label);
        this.roundLabel = cc.find("Canvas/resize/LT/gui_top_bk/round").getComponent(cc.Label);
    },

    start () {
        ugame.initCurUserFromStage();
        this.bloodLabel.string = this.user.blood;
        this.goldLabel.string = this.user.gold;
        this.roundLabel.string = "round:"+this.user.wave +"/" + "10";
        
        soundMgr.playMusic("resources/sound/music/game_bg1.mp3",true)
    },
    initStageData(){

    },
    back(){
        this.doorLoading.loadScene("roadmap")
    },
    onBtnSkill5(event,data){
        
    },
    onBtnSkill6(event,data){

    },
    onBtnHelp(event,data){

    },
    onBtnStop(event,data){

    },
    onBtnSetting(event,data){

    },
    
    // update (dt) {},
});
