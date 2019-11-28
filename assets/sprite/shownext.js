cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },
init(date){
    cc.log('传递到的值：'+date)
            var url='/next/num'+date;
            var self = this;
            self.node.width=120;
            self.node.hight=120;
            cc.loader.loadRes(url,cc.SpriteFrame,function(err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            self.type(date); 
            });

        },
type(date){
    if(date===5){this.node.width=25;this.node.hight=25}
}
});
