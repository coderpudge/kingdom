
var utils = {
    addButtonToNode : function(node,target,component,hander,eventData){
        var button = node.addComponent(cc.Button);
        var clickEvent = new cc.Component.EventHandler()
        clickEvent.target = target;
        clickEvent.component = component
        clickEvent.handler = hander
        clickEvent.customEventData = eventData;
        button.clickEvents = [clickEvent];
        //设置缩放
        // button.target = node;
        button.transition = cc.Button.Transition.SCALE;
        button.duration = 0.05;
        button.zoomScale = 1.05

    },

    /**
     * node,父节点
     * name,新建图片节点名称
     * templateSpriteNode, 模板图片
     * position 图片节点位置
     * rms [] 要删除的子节点名称
     */
    addSpriteToNode:function(node,name,templateSpriteNode,position,rms){
        this.removeFrom(node,rms);
        // node.removeAllChildren();
        var spriteNode = node.getChildByName(name)
        if (spriteNode) {
            node.removeChild(spriteNode);
            // return;
        }
       
        spriteNode = new cc.Node(name);
        
         
        var tempSpriteFrame = templateSpriteNode.getComponent(cc.Sprite).spriteFrame;
        var sprite = spriteNode.addComponent(cc.Sprite);
        spriteNode.parent = node;
        sprite.spriteFrame = tempSpriteFrame;
        // com.spriteFrame.setTexture(cc.url.raw('resources/texture/roadmap/upgrade/star_bg.png')); 
        spriteNode.position = position; //cc.p(15,-18);
        // sprite._sgNode.setState(1) //置灰
        return spriteNode;
    },
    addLabelToNode:function(node,name,str,position) {
        this.removeFrom(node,["starLabel"]);
        var labelNode = node.getChildByName(name);
        if (labelNode) {
            node.removeChild(labelNode);
        }
        labelNode = new cc.Node(name)
        labelNode.parent = node;
        labelNode.position = position;
        labelNode.color =  new cc.Color(236,180,36,255);
        var label = labelNode.addComponent(cc.Label);
        label.string = str;
        label.fontSize = 12;
        label.lineHeight = 14;
    },
    
    removeFrom:function(node,rms) {
        if (rms && rms.length >= 0) {
            for (let i = 0; i < rms.length; i++) {
                var newNode = node.getChildByName(rms[i]);
                if (newNode) {
                    node.removeChild(newNode);
                }
            }
        }
    },

    playAnimReverse(animation,clipName,cb,self){
        var animState = animation.getAnimationState(clipName);
        animState.wrapMode = cc.WrapMode.Reverse;
        animState.play();
        // console.log(animState);
        var duration = animation.currentClip.duration;
        self.scheduleOnce(function() {
            animState.wrapMode = cc.WrapMode.Normal
            animState.stop();
            if (cb) {
                cb();
            }
        }.bind(self),duration)
    },
}
module.exports = utils;