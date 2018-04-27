

var soundMgr = require("common/soundManager")
var ugame = require("data/ugame")
cc.Class({
    extends: cc.Component,

    properties: {
        // label: {
        //     default: null,
        //     type: cc.Label
        // },
        // defaults, set visually when attaching this script to the Canvas
        // text: 'Hello, World!'
        
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
        this.loadingDoor = cc.find("Canvas/loadingDoor").getComponent("loadingDoor");
  
        
        // 播放动画  隐藏 menu按钮 , 显示玩家数据
        this.menu_anim = cc.find("Canvas/anim").getComponent(cc.Animation);
        this.menu_anim.play("home_anim_show");
        this.user_anim = cc.find("Canvas/menu/userInfo").getComponent(cc.Animation);
        // 事件监听                        
        this.node.on("onUserInfoStartGame",this.onUserInfoStartGame,this);
        this.node.on("onUserInfoCreate",this.onUserInfoCreate,this);
        this.node.on("onUserInfoClear",this.onUserInfoClear,this);
        
        // 
        this.reloadUserData();

    },
    start:function() {
        soundMgr.playMainMusic(true);
    },

    startGame:function() {
        this.showUserInfo();
    },
    //显示用户存档
    showUserInfo(){
        this.menu_anim.play("home_btn_to_up")
        this.scheduleOnce(function() {
            this.user_anim.play("home_userinfo_to_up");
            
        }.bind(this), this.menu_anim.currentClip.duration);
    },
    about:function(){
        this.loadingDoor.close(function() {
            cc.director.loadScene("about",function(){
                var loadingDoor = cc.find("Canvas/loadingDoor").getComponent("loadingDoor");
                loadingDoor.open();
            });
        });
    },

    // called every frame
    enterGame(){

    },

    close(){
        var self = this;
        this.playAnimReverse2(this.user_anim,"home_userinfo_to_up",function() {
            self.playAnimReverse2(self.menu_anim,"home_btn_to_up")
        })
    },


    clear(){

    },
    clearConfirm(event,data){

    },
    //翻转播放动画
    playAnimReverse(animation,newClipName,path){
        console.log("name ",animation.getClips().length);
        if (typeof path == "string") {
            cc.loader.loadRes(path,cc.AnimationClip, function(err,clip){
                clip.wrapMode = cc.WrapMode.Reverse
                animation.addClip(clip,newClipName);
                animation.play(newClipName);
                clip.wrapMode = cc.WrapMode.Normal;
            })
            
        }else if (path instanceof cc.AnimationClip) {
            var clip = path;
            clip.wrapMode = cc.WrapMode.Reverse;
            animation.addClip(clip,newClipName);
            animation.play(newClipName);
            clip.wrapMode = cc.WrapMode.Normal;
        }
        
    },
    playAnimReverse2(animation,clipName,cb){
        var animState = animation.getAnimationState(clipName);
        animState.wrapMode = cc.WrapMode.Reverse;
        animState.play();
        // console.log(animState);
        var duration = animation.currentClip.duration;
        this.scheduleOnce(function() {
            animState.wrapMode = cc.WrapMode.Normal
            animState.stop();
            if (cb) {
                cb();
            }
        }.bind(this),duration)
    },

/**
 *  eventListener start
 */
    onUserInfoStartGame(event){
        console.log("onUserInfoStartGame ",event);
        var userId = event.detail.userId;
        ugame.chooseUser(userId);
        // this.animLoadScene("about")
        this.loadingDoor.loadScene("roadmap")
    },
    onUserInfoCreate(event){
        console.log("onUserInfoCreate ",event);
        var userId = ugame.createUser();
        ugame.chooseUser(userId);
        // this.animLoadScene("about")
        this.loadingDoor.loadScene("roadmap")
    },
    
    onUserInfoClear(event){
        console.log("onUserInfoClear ",event);
        var data = event.detail;
        if (data.userId > -1) {
            ugame.deleteUser(data.userId);
        }
        this.reloadUserData();
    },

/**
 *  eventListener end
 */
    reloadUserData(){
        // 显示 存档界面
        var players = ugame.getUserData();
        for (let i = 0; i < 3; i++) {
            const player = players[i];
            var userInfoJs = cc.find("Canvas/menu/userInfo/userDataInfo"+i).getComponent("userDataInfo");
            if (player != null) {
                userInfoJs.init(i,"user"+i,ugame.getSumStar(i),ugame.getHeroicStar(i),ugame.getIronStar(i));
            }else{
                userInfoJs.setNewGame(true);
            }        
        }
    },

    update: function (dt) {

    },
});
