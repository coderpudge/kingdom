// 1. 全局设置 button 音效
// cc.Button.prototype.touchEndClone = cc.Button.prototype._onTouchEnded;
// cc.Button.prototype._soundOn = true;
// cc.Button.prototype.setSoundEffect = function(on){
//     this._soundOn = on;
// }
// cc.Button.prototype._onTouchEnded = function(event){
//     if (this.interactable && this.enabledInHierarchy && this._pressed && this._soundOn == true) {
//         soundMgr.playButtonEffect();
//     }
//     this.touchEndClone(event);
// }

// 单独设置 button 不带音效
/**
 * 
 * effectSwitch:{
    default :null,
    type:cc.Toggle
    }
    this.effectSwitch.getComponent(cc.Button).setSoundEffect(false);
 */

//  2.  

// cc.AnimationState.prototype.playClone = cc.AnimationState.prototype.play;
// cc.AnimationState.prototype.playReverse = function (name,time,reverse) {
//     if (reverse) {
        
//     }
// } 