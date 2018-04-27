
var  ugame = require('data/ugame')
var uiutils = require("common/uiUtils")
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
        var user = ugame.curUser;
        var stagePosition = [{"x":-248,"y":-188},{"x":-242,"y":-126.4},{"x":-180.3,"y":-124.5},{"x":-152.8,"y":-80.8},{"x":-199.1,"y":-36.2},{"x":-195.7,"y":31.5},{"x":-220,"y":97},{"x":-289,"y":126},{"x":-223.1,"y":184.6},{"x":-121,"y":242},{"x":-56,"y":216},{"x":-93,"y":164},{"x":-54,"y":90},{"x":-30,"y":7},{"x":-25,"y":-61},{"x":23,"y":-126},{"x":125,"y":-54},{"x":155,"y":30},{"x":184,"y":116},{"x":252,"y":226}]
    
        var chapters = [
            {
                name:"第一章",
                map:"resources/texture/roadmap/roadmap_bg",
                stages:stagePosition,
            },
            {
                name:"第二章",
                map:"resources/texture/roadmap/roadmap_bg",
                stages:stagePosition,
            },
            {
                name:"第三章",
                map:"resources/texture/roadmap/roadmap_bg",
                stages:stagePosition,
            },
        ];
        this.cur_chapter = 0;
        this.cur_stageId = user.curStage;
        this.cur_stages = chapters[this.cur_chapter].stages;
        this.chapterNode = cc.find("Canvas/ar-center/chapter")
        this.cur_flag = cc.find("Canvas/ar-center/newStage")
        var self = this;


        // 初始化 关卡旗帜
        for(let i = 0;i<this.cur_stages.length;i++){
            cc.loader.loadRes("prefabs/stage0",function(err,res){
                if(err){
                    console.log("error",err);
                    return
                }
                var stage = cc.instantiate(res);
                var stageCom = stage.getComponent("stageFlag");
                stage.position = self.cur_stages[i]
                stage.parent = self.chapterNode;
                stage.name = "stage"+i;
                stageCom.setStageId(i);
                var star = user.stageRecord[i].normalStar;
                stageCom.showStar(star);

                // if (i == self.cur_stageId && i!= self.cur_stages.length) {
                    self.cur_flag.active = true;
                    self.cur_flag.position = self.cur_stages[self.cur_stageId];
                // }else{
                //     self.cur_flag.active = false;
                // }
                if (i >= self.cur_stageId) {
                    stage.active = false;
                }
            })
        }

        // 注册监听事件
        this.node.on("onEnterStage",this.onEnterStage ,this);


        var sprite = this.node.getChildByName("about").getComponent(cc.Sprite);
        sprite._sgNode.setState(1);
        // sprite._sgNode.setState(cc.Scale9Sprite.state.Gray);

        this.leftStarLabel = cc.find("Canvas/ar-center/upgradeConfig/leftStar").getComponent(cc.Label);
    },

    start () {
        soundMgr.playMusic("resources/sound/music/roadmap_scene_bg.mp3",true)
        // this.sortSkill();
        this.loadSkillConfig();
    },
    onEnterStage(event){
        var data = event.detail;
        this.doorLoading.loadScene("game");
    },

    onEnterNewStage()
    {
        this.doorLoading.loadScene("game");
    },
    printStagePosition(){
        var stage_data =[];
        var maps = cc.find("Canvas/ar-center/mapStages");
        for (let i = 0; i < maps.childrenCount; i++) {
            const child = maps.children[i];
            // console.log(child.name,child.x,child.y);    
            stage_data.push({x:child.x,y:child.y}); 
        }
        console.log(JSON.stringify(stage_data));
    },

    back(){
        this.doorLoading.loadScene("home");
    },


    //0:置灰 不可点击, 1:可点击, 2:不可点击,不置灰
    /**
     * 
     * @param {*} btn 
     * @param {*} state 
     *  .interactable  按钮事件是否被响应
        .enableAutoGrayEffect  如果这个标记为 true，当 button 的 interactable 属性为 false 的时候，会使用内置 shader 让 button 的 target 节点的 sprite 组件变灰
     */
    setButtonState(btn,state){
        if (state == 0) {
            btn.interactable = false;
            btn.enableAutoGrayEffect = true;

        } else if (state == 1) {
            btn.interactable = true;
            btn.enableAutoGrayEffect = false;
        } else if (state == 2) {
            btn.interactable = false;
            btn.enableAutoGrayEffect = false;
        }
    },

    setStarState(sprite,label,state){
        if (state == 0) {
            sprite._sgNode.setState(1);
            label.color =  new cc.Color(128,128,128,255);
        } else if (state == 1) {
            sprite._sgNode.setState(0);
            label.color =  new cc.Color(236,180,36,255);
        } else if (state == 2) {
            sprite.node.active = false;
            label.active = false;
            // sprite._sgNode.setState(0);
            // label.color =  new cc.Color(236,180,36,255);
        }
    },

    loadSkillConfig(){
        var user = ugame.curUser;
        var star = user.star;
        
        //剩余 star
        var usedStar = 0;
        for (let i = 0; i < user.towerSkillLevel.length; i++) {
            var lvl =  user.towerSkillLevel[i];
            for (let j = 0; j < lvl; j++) {
                usedStar += ugame.towerSkillUpgradeConfig[i][j];  
            }
        }
        this.leftStarLabel.string = star - usedStar;

        for (let i = 0; i < ugame.towerSkillUpgradeConfig.length; i++) {
            var skills = cc.find("Canvas/ar-center/upgradeConfig/skill"+(i+1));
            var skillUpgradeCost = ugame.towerSkillUpgradeConfig[i];
            var curSkillLevel = ugame.curUser.towerSkillLevel[i];
            
            
            
            for(let j=0;j<5;j++){
                var skill = skills.getChildByName((i+1)+""+(j+1))
                var btn = skill.addComponent(cc.Button);
                var starbg = skill.getChildByName("starBg").getComponent(cc.Sprite)
                var starLabel = skill.getChildByName("starLabel");
                var event = new cc.Component.EventHandler();
                event.target=this;
                event.handler = "onUpgrade"
                event.component="roadmap"
                event.customEventData = (i+1) +""+ (j+1);
                btn.clickEvents=[event];
                var cost = skillUpgradeCost[j]
                starLabel.getComponent(cc.Label).string = cost;
                var confLvl = j+1;
                var state = 0;
                if (curSkillLevel + 1 < confLvl){
                    state = 0;
                }else if (curSkillLevel + 1  == confLvl && parseInt(cost) <= (star - usedStar)) {
                    state = 1
                }else if (curSkillLevel + 1  == confLvl) {
                    state = 0
                }else{
                    state = 2;
                    // break;
                }

                this.setButtonState(btn,state);
                this.setStarState(starbg,starLabel,state);

                
            }    
        }
    },

    reLoadSkillConfig(){

        var user = ugame.curUser;
        var star = user.star;
        
        //剩余 star
        var usedStar = 0;
        for (let i = 0; i < user.towerSkillLevel.length; i++) {
            var lvl =  user.towerSkillLevel[i];
            for (let j = 0; j < lvl; j++) {
                usedStar += ugame.towerSkillUpgradeConfig[i][j];  
            }
        }
        this.leftStarLabel.string = star - usedStar;

        for (let i = 0; i < ugame.towerSkillUpgradeConfig.length; i++) {
            var skills = cc.find("Canvas/ar-center/upgradeConfig/skill"+(i+1));
            var skillUpgradeCost = ugame.towerSkillUpgradeConfig[i];
            var curSkillLevel = ugame.curUser.towerSkillLevel[i];

            for(let j=0;j<5;j++){
                var skill = skills.getChildByName((i+1)+""+(j+1))
                var btn = skill.getComponent(cc.Button);
                var starbg = skill.getChildByName("starBg").getComponent(cc.Sprite)
                var starLabel = skill.getChildByName("starLabel");
                
                var cost = skillUpgradeCost[j]
                starLabel.getComponent(cc.Label).string = cost;
                var confLvl = j+1;
                var state = 0;
                if (curSkillLevel + 1  == confLvl && parseInt(cost) <= (star - usedStar)) {
                    state = 1
                }else if (curSkillLevel + 1 < confLvl){
                    state = 0;
                }else if (curSkillLevel + 1  == confLvl) {
                    state = 0
                }else{
                    state = 2;
                    // break;
                }

                this.setButtonState(btn,state);
                this.setStarState(starbg,starLabel,state);

                
            }    
        }
    },

    onUpgrade(event,data){
        console.log("onclick",data);
        var skillNo = parseInt(data.charAt(0)) - 1;
        var ret = ugame.upgradeSkill(skillNo);
        if (ret == 1) {
            this.reLoadSkillConfig();
        }
    },

    initSkillConfigStar(){
        var starCount = 10;
        ugame.towerSkillUpgradeConfig;
        ugame.curUser.towerSkillLevel

    },

    onUpgradeWinShow(event,data){
        var anim = cc.find("Canvas/ar-center/upgradeConfig").getComponent(cc.Animation);
        
        if (data == '1') {
            anim.play("roadmap_upgrade_down");
        }else{
            uiutils.playAnimReverse(anim,"roadmap_upgrade_down",null,this)
        }
    },
    
    resetTowerSkill(){
        ugame.curUser.towerSkillLevel = [0,0,0,0,0,0]
        this.reLoadSkillConfig();
    },
    done(){
        this.onUpgradeWinShow();
    }

    // update (dt) {},
});
