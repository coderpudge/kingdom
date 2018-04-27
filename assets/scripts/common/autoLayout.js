var uiutils = require("common/uiUtils")
cc.Class({
    extends: cc.Component,
    // 这个属性是关键，而且要设置 executeInEditMode: true
    editor: CC_EDITOR && {
        executeInEditMode: true
    },
    properties:{
        // height:{
        //     type:cc.Integer,
        //     default:0,
        // },
        portrait:true,
        // horizontal:flase,
        startPosition:{
            type:cc.Integer,
            default:0,
        },
        prefix:"",
        // spriteFrames:[cc.SpriteFrame],

    },

    // use this for initialization
    onLoad: function () {
        if (CC_EDITOR) {
            this.reSort();
        }
    },
    update:function() {
        if (CC_EDITOR) {
            // var spriteNode = this.node.getChildByName("test")
            // if (spriteNode) {
            //     this.node.removeChild(spriteNode);
            //         // uiutils.addSpriteToNode(this.node,"test",starbg,cc.p(0,0))
            //         // return;
            // }
            // this.reSort();
        }
    },

    reSort(){
        var children = this.node.children;
        if (children.length<=0) {
            return
        }
        var childWidth = children[0].width;
        var childHeigh = children[0].height;

        var interval = 0;
        var size = 0;
        if(this.portrait){
            interval = (this.node.height - childHeigh * children.length) / (children.length + 1);
            size = childHeigh;
        }else{
            interval = (this.node.width - childWidth * children.length) / (children.length + 1);
            size = childWidth;
        }

        var starbg = this.node.parent.getChildByName("star_bg")
      
        for (var i = 0; i < children.length; i++) {
            var position = (interval + 0.5 * size) + i * (interval + size) + this.startPosition;
            var childNode = this.node.getChildByName(this.prefix + (i+1)) 
            
            //子节点添加图片
            uiutils.addSpriteToNode(childNode,"starBg",starbg,cc.p(15,-18),["starBG"]);
            
            uiutils.addLabelToNode(childNode,"starLabel","0",cc.p(20,-18))
            if (this.portrait) {
                childNode.x = 0;
                childNode.y = position;
            }else{
                childNode.x = position;
                childNode.y = 0;
            }
        }
    },
    
});