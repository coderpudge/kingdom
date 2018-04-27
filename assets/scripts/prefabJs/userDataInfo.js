
var ugame = require("data/ugame")
cc.Class({
    extends: cc.Component,

    properties: {
        title:cc.Label,
        normalStar:cc.Label,
        heroStar:cc.Label,
        ironStar:cc.Label,
        confirmWin:cc.Node,
        newGameWin:cc.Node,
        userId:{
            type:cc.Integer,
            default:-1,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.newGameWin.active = (this.userId == -1)
    },
    setNewGame(isNewUser){
        this.newGameWin.active = isNewUser;
    },
    init(userId,name,normalStar,heroStar,ironStar){
        this.userId = userId;
        this.title.string = name;
        this.normalStar.string = normalStar;
        this.heroStar.string = heroStar;
        this.ironStar.string = ironStar;
        this.newGameWin.active = false;
    },
    start () {

    },
    onCreatePlayer(){
        console.log("onCreatePlayer");
        var event = new cc.Event.EventCustom("onUserInfoCreate",true);
        event.setUserData({msg:'start'});
        this.node.dispatchEvent(event)
    },
    onClear(){
        console.log("onclear");
        this.confirmWin.active = true;
    },
    onClearConfrim(event,data){
        console.log("onClearConfirm",data);
        if (data == '0') {
            
        }else if(data == '1'){
            this.node.emit("onUserInfoClear",{user:this.userId})
            var event = new cc.Event.EventCustom("onUserInfoClear",true);
            event.setUserData({msg:'clear',userId:this.userId});
            console.log("dispatch");
            this.node.dispatchEvent(event)
        }
        this.confirmWin.active = false;
    },
    onStartGame(){
        console.log("onStartGame");
        // this.node.emit("onUserInfoStartGame",{});
        var event = new cc.Event.EventCustom("onUserInfoStartGame",true);
        event.setUserData({msg:'start',userId:this.userId});
        this.node.dispatchEvent(event)
    }
    // update (dt) {},
});
