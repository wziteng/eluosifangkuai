let open_id=null;
cc.Class({
    extends: cc.Component,

    properties: {
     
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
            // this.beginGame();
    },

    start () {
       
    },
    startGame(){
        cc.director.loadScene('russsia');
    },
    beginGame() {
        console.log('weixin');
        let self = this;
        let sysInfo = window.wx.getSystemInfoSync();
        //获取微信界面大小
        let width = sysInfo.screenWidth;
        let height = sysInfo.screenHeight;
        window.wx.getSetting({
            success(res) { 
                if (res.authSetting["scope.userInfo"]) {
                    cc.log('用户已授权');
                    self.getAuth();
                } else {
                    cc.log('wwww');
                    let button = window.wx.createUserInfoButton({
                        type: 'text',
                        text: '',
                        style: {
                            left: 0,
                            top: 0,
                            width: width,
                            height: height,
                            backgroundColor: '#00000000',//最后两位为透明度
                            color: '#ffffff',
                            fontSize: 20,
                            textAlign: "center",
                            lineHeight: height,
                        }
                    });
                    button.onTap((res) => {
                        if (res.userInfo) {
                            console.log('授权');
                            self.getAuth();
                            button.destroy();

                        } else {
                            console.log("用户拒绝授权:", res);
                        }
                    });
                }
            }
        })
    },
    //获取用户信息
    getAuth() {
        let self=this;
        window.wx.login({
            success: function (res) {
                let code = res.code;
                console.log(code);
                self.sendCodePost(code, () => {
                    window.wx.getUserInfo({
                        success(res) {
                            console.log(res);
                            self.sendUserInfo(res, self.open_id);
                            cc.director.loadScene('start', () => {
                                console.log('加载完成！');
                            })
                        }
                    });
                });

            }
        });
    },
    sendCodePost(code,callback) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://49.233.171.200:8080/api/jscode2session';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {
                let response = request.responseText;
                response = JSON.parse(response);
                console.log(response);
                self.open_id = response.openid;
                // self.openid = openid;
                console.log(self.open_id);
                if (callback){
                    callback();
                }
            }
        };
        request.send('js_code=' + code);
    },
    sendUserInfo(userData,openid) {
        let self = this;
        let request = cc.loader.getXMLHttpRequest();
        let url = 'https://49.233.171.200:8080/user/save';
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status >= 200 && request.status < 300)) {

            }
        };
        console.log('发送用户信息');
        let getData = querystring.stringify({
            open_id:openid,
            // session_key: UserInfo.session_key,
            nick_name: userData.userInfo.nickName,
            avatar_url: userData.userInfo.avatarUrl,
            gender: userData.userInfo.gender,
            country: userData.userInfo.country,
            province: userData.userInfo.province,
            city: userData.userInfo.city,
        });
        console.log(getData);
        request.send(getData);
    }
});
