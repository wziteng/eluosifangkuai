cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },
    handup(date){
       var build= cc.find('Canvas/box').getComponent('build');
       build.getdate(date)
    }
});
