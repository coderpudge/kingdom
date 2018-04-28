
var ugame = {
    // _config 定义为配置数据, _data 定义为需要保存的用户数据
    user_data:[],
    curUserId:0,
    curUser:null,
    // 塔的技能升级 需要消耗星
    towerSkillUpgradeConfig:[
        [0,1,3,2,2,3], //步兵
        [1,1,2,3,2,3],   //弓箭兵
        [2,1,1,2,1,3], //术士
        [3,1,2,1,2,3],   //炮兵
        [4,1,2,2,2,3], //召唤士兵
        [5,1,2,2,2,3], //天火等级
    ],
    // towerSkillUpgradeConfigTable:{
    //     infantry:[0,1,3,2,2,3], //步兵
    //     arrow:[1,1,2,3,2,3],   //弓箭兵
    //     warlock:[2,1,1,2,1,3], //术士
    //     artillery:[3,1,2,1,2,3],   //炮兵
    //     skillInfantry:[4,1,2,2,2,3], //召唤士兵
    //     skillSkyfire:[5,1,2,2,2,3], //天火等级
    // },
    
    init:function(){
        this.readUserData();
        console.log(this.user_data);
    },
    // 初始化 "用户" 数据
    initUserData:function() {
        // 塔的技能等级
        // towerSkillLevelDataTable:{
        //     infantryLvl:0, //步兵
        //     arrowLvl:0,   //弓箭兵
        //     warlockLvl:0, //术士
        //     artilleryLvl:0,   //炮兵
        //     skillInfantryLvl:0, //召唤士兵
        //     skillSkyfireLvl:0, //天火等级
        // },
        var player = {
            blood:0,
            gold:0,
            role:0,
            wave:0, 
            star:0,
            starTotal:100,
            curStage:0,
            towerSkillLevelData:[0,0,2,0,0,0],
            stageData:[],
        };
        this.initUserStage(player);
        return player;
    },

    // 初始化 "用户-关卡" 数据
    initUserStage:function(player) {
        var stageData = player.stageData;
        var stageList = [];
        var stageCount = 20;
        var rdm = Math.random() * 10;
        rdm = Math.floor(rdm);
        for (let i = 0; i < stageCount; i++) {
            var stageModel = {
                normalStar:0,   // 0~3 个
                heroicStar:0,   // 1 个
                ironStar:0,     // 1 个
            }
            // test data
            if (rdm > i) {
                stageModel.normalStar = 3;
            }else if (rdm == i) {
                stageModel.normalStar = 1;
            }
            if (stageModel.normalStar > 0) {
                player.curStage = i + 1;
            }
            player.star += stageModel.normalStar + stageModel.heroicStar +  stageModel.heroicStar
            stageData.push(stageModel);         
        }
    },
    // 初始总星数
    getTotalStar:function(idx){
        return  5 * this.user_data[idx].stageData.length;
    },
    //获取当前星数
    getSumStar:function(idx){
        var star = 0;
        for (let i = 0; i < this.user_data[idx].stageData.length; i++) {
            const element = this.user_data[idx].stageData[i];
                star += element.normalStar + element.heroicStar + element.ironStar;
        }
        return star;
    },
    getCurSumStar:function(){
        this.getStar(this.curUserId);
    },
    //获取当前星数
    getHeroicStar:function(idx){
        var star = 0;
        for (let i = 0; i < this.user_data[idx].stageData.length; i++) {
            const element = this.user_data[idx].stageData[i];
            star +=  element.heroicStar;
        }
        return star;
    },
    //获取当前星数
    getIronStar:function(idx){
        var star = 0;
        for (let i = 0; i < this.user_data[idx].stageData.length; i++) {
            const element = this.user_data[idx].stageData[i];
            star +=  element.ironStar;
        }
        return star;
    },
    // 读档
    readUserData:function(){
        var data = cc.sys.localStorage.getItem("user_data1");
        if (data) {
            this.user_data = JSON.parse(data);
        }else{
            // this.initUserData();
        }
    },
    // 存档
    writeUserData:function(){
        var jsonStr = JSON.stringify(this.user_data);
        cc.sys.localStorage.setItem("user_data1",jsonStr);
    },
   
    // 选择玩家
    chooseUser:function(idx){
        this.curUserId = idx;
        this.curUser = this.user_data[idx];
    },
    // 创建 新的玩家
    createUser:function() {
        var num = this.user_data.length
        if (num >=3) {
            return;
        }    
        var player = this.initUserData();
        this.user_data.push(player);
        return num;
    },
    // 删除玩家
    deleteUser:function(idx){
        this.user_data.splice(idx,1)
    },
    // 获取玩家信息
    getUserData:function(idx){
        if (idx != null) {
            return this.user_data[idx] 
        } else {
            return this.user_data;
        }
    },
    upgradeSkill:function(skillNo){
        if (this.curUser) {
            var skillLvl = this.curUser.towerSkillLevelData[skillNo]
            var cost = this.towerSkillUpgradeConfig[skillNo][skillLvl];
            //剩余 star
           
            if (this.getLeftStar() >= cost) {
                // this.curUser.star -= cost;
                this.curUser.towerSkillLevelData[skillNo] += 1;
                return 1;
            }
            return 2;
        }
        return 0;
    },
    getUsedStar:function(){
        var usedStar = 0;
        for (let i = 0; i < this.curUser.towerSkillLevelData.length; i++) {
            var lvl = this.curUser.towerSkillLevelData[i];
            for (let j = 0; j < lvl; j++) {
                usedStar += ugame.towerSkillUpgradeConfig[i][j];  
            }
        }
        return usedStar;
    },
    getLeftStar:function() {
        return this.curUser.star - this.getUsedStar();
    },
   
    // 挑战关卡 结束 , 计算 star
    battleEnd:function(){

    },
    initCurUserFromStage(){
        this.curUser.blood = 1;
        this.curUser.gold = 1000;
        this.curUser.wave = 0;
    },

}

ugame.init();

module.exports = ugame;