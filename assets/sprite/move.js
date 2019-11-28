cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {
        this.xspeed=60;
        this.yspeed=60;
        this.schedule(this.move, 0.5);

    },
    move(){
        this.node.y-=this.yspeed;
        
    }
});
