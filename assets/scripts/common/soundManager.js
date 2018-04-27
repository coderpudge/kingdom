
var e_music_mute = {
    no:0,
    yes:1,
}
var e_effect_mute = {
    no:0,
    yes:1,
}

// console.log(0==true);
// console.log(1==true); 只有1 时 才为 true
// console.log(2==true);
// console.log(null==true);
// console.log(""==true);
// console.log(true);
// console.log(false);
var button_effect_file = ""

var soundMgr = {
    music_mute : -1, //0:不静音 1:静音
    effect_mute : -1,
    music_file : null,
    music_audioId : null,
    effect_audioId : null,


    setMusicMute:function(mute) {
        if (mute == this.music_mute) {
            return
        }

        this.music_mute = mute? e_music_mute.yes:e_music_mute.no;
        if (this.music_mute == e_music_mute.no) {
            cc.audioEngine.setVolume(this.music_audioId,1);
        }else if (this.music_mute == e_music_mute.yes) {
            cc.audioEngine.setVolume(this.music_audioId,0);
        }
        cc.sys.localStorage.setItem("music_mute",this.music_mute);
    },
    setEffectMute:function(mute){
        if (mute == this.effect_mute) {
            return
        }

        this.effect_mute = mute? e_effect_mute.yes : e_effect_mute.no;
        // if (this.effect_mute == e_effect_mute.no) {
        //     cc.audioEngine.setVolume(this.effect_audioId,1);
        // }else if (this.effect_mute == e_effect_mute.yes) {
        //     cc.audioEngine.setVolume(this.effect_audioId,0);
        // }
        cc.sys.localStorage.setItem("effect_mute",this.effect_mute);
    },

    playMusic:function(file,pool){
        if (file) {
            this.music_file = file;
            cc.sys.localStorage.setItem("music_file",this.music_file);
            var url = cc.url.raw(file);
            cc.audioEngine.stopAll();
            // if (this.music_audioId) {
            //     cc.audioEngine.stop(this.music_audioId);
            // }
            if(this.music_mute == e_music_mute.no){
                this.music_audioId = cc.audioEngine.play(url, pool, 1);
            }
        }
    },
    //主背景音乐
    playMainMusic:function(pool){
        this.playMusic("resources/sound/music/home_scene_bg.mp3",true)
    },

    playEffect:function(file){
        if (file) {
            var url = cc.url.raw(file);
            // if (this.effect_audioId) {
            //     cc.audioEngine.stop(this.effect_audioId);
            // }
            if (this.effect_mute == e_effect_mute.no) {
                this.effect_audioId = cc.audioEngine.play(url, false, 1);
            }
        }
    },
    // 按钮音效
    playButtonEffect:function(){
        this.playEffect("resources/sound/click.wav");
    }
}

var init = function(){
    console.log("sound mgr init");
    var music_file = cc.sys.localStorage.getItem("music_file")
    var music_mute = cc.sys.localStorage.getItem("music_mute")
    var effect_mute = cc.sys.localStorage.getItem("effect_mute")

    if (music_file) {
        
    }
    soundMgr.music_mute =  music_mute ? parseInt(music_mute) : e_music_mute.no;
    soundMgr.effect_mute = effect_mute ? parseInt(effect_mute) : e_effect_mute.no;

}
init();

// 全局设置 button 音效
cc.Button.prototype.touchEndClone = cc.Button.prototype._onTouchEnded;
cc.Button.prototype._soundOn = true;
cc.Button.prototype.setSoundEffect = function(on){
    this._soundOn = on;
}
cc.Button.prototype._onTouchEnded = function(event){
    if (this.interactable && this.enabledInHierarchy && this._pressed && this._soundOn == true) {
        soundMgr.playButtonEffect();
    }
    this.touchEndClone(event);
}

// 单独设置 button 不带音效
/**
 * 
 * effectSwitch:{
    default :null,
    type:cc.Toggle
    }
    this.effectSwitch.getComponent(cc.Button).setSoundEffect(false);
 */


module.exports = soundMgr;