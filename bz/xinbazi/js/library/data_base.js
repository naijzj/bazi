
生成二维码();

function 根数据() {
    return {
        命主信息: 命主信息,
        命盘: 命盘数据,
        健康: 命盘数据.健康分析.健康分析,
        设置: 设置,
        加载开关: false,
        反馈开关: false,
        反馈信息: "",
        反馈标题:"",
        /////////////////////////////////////////////
        ///用途：用于返回对应天干信息
        ///参数：柱位- 用于区分位置
        ///返回: 对象结构数据.
        /////////////////////////////////////////////
        获取_天干信息(柱位索引) {
            返回 = this.命盘.命柱表[柱位索引].天干;
            return 返回;
        },


        获取_藏干信息(柱位索引, 藏干索引) {
            返回 = this.命盘.命柱表[柱位索引].地支.藏干[藏干索引];

            return 返回;
        },


        岁运_信息() {
            let 晚子时设置 = this.命主信息.晚子时设置;
            let 起运设置 = this.命主信息.起运设置;
            let 性别 = this.命主信息.性别;
            let 年 = this.命主信息.太阳年;
            let 月 = this.命主信息.太阳月;
            let 日 = this.命主信息.太阳日;
            let 时 = this.命主信息.太阳时;
            let 分 = this.命主信息.太阳分;
            let 已选择大运 = '';
            let 已选择流年 = '';
            let 已选择流月 = '';
            let 日干 = this.命主信息.日干;
            //获得干支
            let 阳历生辰对象 = Solar.fromYmdHms(年, 月, 日, 时, 分, 0);
            let 农历生辰对象 = 阳历生辰对象.getLunar();
            let 干支生辰对象 = 农历生辰对象.getEightChar();
            干支生辰对象.setSect(晚子时设置);
            let 总运表 = 干支生辰对象.getYun(性别, 起运设置);
            let [胎元干, 胎元支] = 干支生辰对象.getTaiYuan();
            let [命宫干, 命宫支] = 干支生辰对象.getMingGong();
            let [身宫干, 身宫支] = 干支生辰对象.getShenGong();
            let 胎元十神 = 返回十神(日干, 胎元干) + 返回十神(日干, 返回藏干主气(胎元支));
            let 命宫十神 = 返回十神(日干, 命宫干) + 返回十神(日干, 返回藏干主气(命宫支));
            let 身宫十神 = 返回十神(日干, 身宫干) + 返回十神(日干, 返回藏干主气(身宫支));
            var 大运表 = 总运表.getDaYun();
            var 流年表 = [];
            var 流月表 = [];
            var 前台大运列表 = [];

            for (var i = 0, j = 大运表.length; i < j; i++) {
                var 大运 = 大运表[i];
                let 干支字符 = 大运.getGanZhi();
                let [干, 支] = 干支字符;
                let 干十神 = 返回十神(日干, 干);
                let 支十神 = 返回十神(日干, 返回藏干主气(支));
                干 = (干 === undefined) ? '-' : 干;
                支 = (支 === undefined) ? '-' : 支;
                大运对象 = {
                    时间: 大运.getStartYear(),
                    年龄: 大运.getStartAge() + '岁',
                    干: 干,
                    支: 支,
                    十神: 干十神 + '/' + 支十神,
                }
                前台大运列表.push(大运对象);
            }

            return {
                大运列表: 前台大运列表,
                流年列表: {},
                流月列表: {},
                激活: { 大运: null, 流年: null, 流月: null, },
                胎元干: 胎元干,
                胎元支: 胎元支,
                胎元十神: 胎元十神,
                命宫干: 命宫干,
                命宫支: 命宫支,
                命宫十神: 命宫十神,
                身宫干: 身宫干,
                身宫支: 身宫支,
                身宫十神: 身宫十神,
                已选择: '尚未选择岁运',

                获取流年列表(大运编号) {
                    var 前台流年列表 = [];
                    前台流年列表.length = 0;//清空
                    流年表 = 大运表[大运编号].getLiuNian();
                    for (var i = 0, j = 流年表.length; i < j; i++) {
                        var 流年 = 流年表[i];
                        // console.log('流年[' + i + '] = ' + 流年.getYear() + '年 ' + 流年.getAge() + '岁 ' + 流年.getGanZhi());
                        let 干支字符 = 流年.getGanZhi();
                        let [干, 支] = 干支字符;
                        let 干十神 = 返回十神(日干, 干);
                        let 支十神 = 返回十神(日干, 返回藏干主气(支));
                        流年对象 = {
                            时间: 流年.getYear(),
                            年龄: 流年.getAge() + '岁',
                            干: 干,
                            支: 支,
                            十神: 干十神 + '/' + 支十神,
                        }
                        前台流年列表.push(流年对象);
                    }
                    this.流年列表 = 前台流年列表;
                    this.激活.流年 = null;
                    this.激活.流月 = null;
                    this.流月列表 = {};

                    已选择大运 = 大运表[大运编号].getGanZhi() == '' ? '空空' : 大运表[大运编号].getGanZhi();
                    已选择流年 = '';
                    已选择流月 = '';
                    this.已选择 = '已选择 【' + 已选择大运 + '大运】 ';
                    //console.log(已选择大运);

                },
                获取流月列表(流年编号,) {
                    let 流年 = 流年表[流年编号].getYear();
                    var 前台流月列表 = [];
                    已选择流年编号 = 流年编号
                    前台流月列表.length = 0;//清空
                    流月表 = 流年表[流年编号].getLiuYue();

                    for (var i = 0, j = 流月表.length; i < j; i++) {
                        let 流月 = 流月表[i];
                        var lunarMonth = LunarMonth.fromYm(流年, i + 1);
                        var firstJulianDay = lunarMonth.getFirstJulianDay();
                        // 儒略日转阳历
                        var solar = Solar.fromJulianDay(firstJulianDay);

                        var 干支字符 = 流月.getGanZhi();
                        let [干, 支] = 干支字符;
                        let 干十神 = 返回十神(日干, 干);
                        let 支十神 = 返回十神(日干, 返回藏干主气(支));

                        流月对象 = {
                            农历: 流月.getMonthInChinese() + '月',
                            阳历: solar.getMonth() + '.' + solar.getDay(),
                            干: 干,
                            支: 支,
                            十神: 干十神 + '/' + 支十神,
                        }
                        前台流月列表.push(流月对象);
                    }
                    this.流月列表 = 前台流月列表;
                    this.激活.流月 = null;
                    已选择流年 = 流年表[流年编号].getGanZhi();;
                    已选择流月 = '';
                    this.已选择 = '已选择 【' + 已选择大运 + '大运】  / 【' + 已选择流年 + '流年】';
                },
                选择流月(流月编号) {

                    let 流月 = 流月表[流月编号];
                    let 干支字符 = 流月.getGanZhi();
                    let [干, 支] = 干支字符;
                    已选择流月 = 干支字符
                    this.已选择 = '已选择 【' + 已选择大运 + '大运】  / 【' + 已选择流年 + '流年】 / 【' + 已选择流月 + '流月】';




                },
                发送大运数据() {
                    发出数据 = {
                        八字: this.命主信息.干支,
                        岁运表: [],
                        定位干: this.命主信息.日干,
                        男女: this.命主信息.性别,
                    }

                    if (已选择大运 != '') {
                        let [干, 支] = 已选择大运;
                        发出数据.岁运表.push({ 柱ID: 4, 柱位: '大运', 干: 干, 支: 支 });
                    }
                    if (已选择流年 != '') {
                        let [干, 支] = 已选择流年;
                        发出数据.岁运表.push({ 柱ID: 5, 柱位: '流年', 干: 干, 支: 支 });
                    }
                    if (已选择流月 != '') {
                        let [干, 支] = 已选择流月;
                        发出数据.岁运表.push({ 柱ID: 6, 柱位: '流月', 干: 干, 支: 支 });
                    }

                    // console.log(发出数据);

                    if (发出数据 === '') {
                        this.已选择 = '<strong style=" color: red;">请先选择岁运</strong>';
                    } else {

                        //打开加载弹窗
                        this.加载开关 = true;

                        const 口令输入框 = document.querySelector('input[name="__RequestVerificationToken"]');
                        const 口令 = 口令输入框 ? 口令输入框.value : null;
                        fetch('/bazi?handler=GetGanZhi', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                // 'RequestVerificationToken': $('input:hidden[name="__RequestVerificationToken"]').val()
                                'RequestVerificationToken': 口令
                            },
                            body: JSON.stringify(发出数据)
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('网络响应错误');
                                }
                                return response.json();
                            })
                            .then(data => {

                                this.命盘 = JSON.parse(data);
                                this.健康=this.命盘.健康分析.健康分析,
                                console.log(JSON.parse(data));
                                console.log('数据接收完毕');
                                //关闭加载弹窗
                                this.加载开关 = false;


                            })
                            .catch(error => {
                                console.error('发生错误：', error);
                                console.error('请求头：', headers);
                                console.error('请求体：', JSON.stringify(JsonData));
                            });
                    }

                }



            }
        }
    };


}





function 命主_信息() {
    return 命主信息;
}





function 返回十神(日干, 干) {
    let 返回;
    const 十神表 = {
        '甲': { '甲': '比', '乙': '劫', '丙': '食', '丁': '伤', '戊': '才', '己': '财', '庚': '杀', '辛': '官', '壬': '枭', '癸': '印' },
        '乙': { '甲': '劫', '乙': '比', '丙': '伤', '丁': '食', '戊': '财', '己': '才', '庚': '官', '辛': '杀', '壬': '印', '癸': '枭' },
        '丙': { '甲': '枭', '乙': '印', '丙': '比', '丁': '劫', '戊': '食', '己': '伤', '庚': '才', '辛': '财', '壬': '杀', '癸': '官' },
        '丁': { '甲': '印', '乙': '枭', '丙': '劫', '丁': '比', '戊': '伤', '己': '食', '庚': '财', '辛': '才', '壬': '官', '癸': '杀' },
        '戊': { '甲': '杀', '乙': '官', '丙': '枭', '丁': '印', '戊': '比', '己': '劫', '庚': '食', '辛': '伤', '壬': '才', '癸': '财' },
        '己': { '甲': '官', '乙': '杀', '丙': '印', '丁': '枭', '戊': '劫', '己': '比', '庚': '伤', '辛': '食', '壬': '财', '癸': '才' },
        '庚': { '甲': '才', '乙': '财', '丙': '杀', '丁': '官', '戊': '枭', '己': '印', '庚': '比', '辛': '劫', '壬': '食', '癸': '伤' },
        '辛': { '甲': '财', '乙': '才', '丙': '官', '丁': '杀', '戊': '印', '己': '枭', '庚': '劫', '辛': '比', '壬': '伤', '癸': '食' },
        '壬': { '甲': '食', '乙': '伤', '丙': '才', '丁': '财', '戊': '杀', '己': '官', '庚': '枭', '辛': '印', '壬': '比', '癸': '劫' },
        '癸': { '甲': '伤', '乙': '食', '丙': '财', '丁': '才', '戊': '官', '己': '杀', '庚': '印', '辛': '枭', '壬': '劫', '癸': '比' }
    };
    if (干 === undefined || 干 === '-') {
        返回 = '-'
    } else {
        返回 = 十神表[日干][干];
    }
    return 返回;
}

function 返回藏干主气(支) {
    let 返回;
    const 藏干主气表 = {
        '寅': '甲', '卯': '乙', '辰': '戊', '巳': '丙', '午': '丁', '未': '己', '申': '庚', '酉': '辛', '戌': '戊', '亥': '壬', '子': '癸', '丑': '己',
    }
    if (支 === undefined || 支 === '-') {
        返回 = '-'
    } else {
        返回 = 藏干主气表[支];
    }
    return 返回;
}



var 消息反馈 = {
    状态: true,
    类型: '',
    标题: '',
    信息: '1',
}



function 命例操作() {
    return {

        保存_命例() {
            发出数据 = {
                姓名: 命主信息.姓名,
                性别: 命主信息.性别,
                历法: 命主信息.历法,
                晚子时设置: 命主信息.晚子时设置,
                起运设置: 命主信息.起运设置,
                年: 命主信息.年,
                月: 命主信息.月,
                日: 命主信息.日,
                时: 命主信息.时,
                分: 命主信息.分,
                省份编号: 命主信息.省份编号,
                城市编号: 命主信息.城市编号,
                区县编号: 命主信息.区县编号,
                经度: 命主信息.经度,
                出生地: 命主信息.出生地,
                农历: 命主信息.农历,
                日干: 命主信息.日干,
                干支: 命主信息.干支,
            }

            const 口令输入框 = document.querySelector('input[name="__RequestVerificationToken"]');
            const 口令 = 口令输入框 ? 口令输入框.value : null;
            fetch('/bazi?handler=GetSaveFate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'RequestVerificationToken': 口令
                },
                body: JSON.stringify(发出数据)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('网络响应错误');
                    }
                    return response.json();
                })
                .then(data => {

                    console.log('数据接收完毕');
                    var 返回消息 = JSON.parse(data).Result;
                    //打开信息反馈弹窗
                    this.反馈开关 = true;//打开弹窗
                    this.反馈标题 = 返回消息.结果;
                    this.反馈信息 = 返回消息.描述;
                    setTimeout(() => {
                        this.反馈开关 = false; // 1秒后设置为false,关闭弹窗
                    }, 1000); // 延迟1000毫秒（即1秒）



                })
                .catch(error => {
                    console.error('发生错误：', error);
                    console.error('请求头：', headers);
                    console.error('请求体：', JSON.stringify(JsonData));
                });
        },

        删除_命例() {
            发出数据 = {
                姓名: 命主信息.姓名,
                性别: 命主信息.性别,
                历法: 命主信息.历法,
                晚子时设置: 命主信息.晚子时设置,
                起运设置: 命主信息.起运设置,
                年: 命主信息.年,
                月: 命主信息.月,
                日: 命主信息.日,
                时: 命主信息.时,
                分: 命主信息.分,
                省份编号: 命主信息.省份编号,
                城市编号: 命主信息.城市编号,
                区县编号: 命主信息.区县编号,
                经度: 命主信息.经度,
                出生地: 命主信息.出生地,
                农历: 命主信息.农历,
            }

            const 口令输入框 = document.querySelector('input[name="__RequestVerificationToken"]');
            const 口令 = 口令输入框 ? 口令输入框.value : null;
            fetch('/bazi?handler=GetDelFate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'RequestVerificationToken': 口令
                },
                body: JSON.stringify(发出数据)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('网络响应错误');
                    }
                    return response.json();
                })
                .then(data => {
                    
                    console.log('数据接收完毕');
                    var 返回消息 = JSON.parse(data).Result;
                    //打开信息反馈弹窗
                    this.反馈开关 = true;//打开弹窗
                    this.反馈标题 = 返回消息.结果;
                    this.反馈信息 = 返回消息.描述;
                    setTimeout(() => {
                        this.反馈开关 = false; // 1秒后设置为false,关闭弹窗

                        if(this.反馈标题=="成功"){
                            window.location.href = 'ming';
                        }
                        // window.location.href = '/ming';
                    }, 1000); // 延迟1000毫秒（即1秒）



                })
                .catch(error => {
                    console.error('发生错误：', error);
                    console.error('请求头：', headers);
                    console.error('请求体：', JSON.stringify(JsonData));
                });
        },

    }

}




function 生成二维码() {
    //定义为：http://example.com/?kl=1&xm=高老庄&xb=1&lf=1&wzs=1&qy=1&n=1981&y=12&r=15&s=7&f=35&sf=1827&cs=1955&qx=1958&jd=109.60

    var baseUrl = "http://www.xinbazi.com/";
    // 生成二维码
    var params = {
        kl: 1,
        xm: 命主信息.姓名,
        xb: 命主信息.性别,
        lf: 命主信息.历法,
        wzs: 命主信息.晚子时设置,
        qy: 命主信息.起运设置,
        n: 命主信息.年,
        y: 命主信息.月,
        r: 命主信息.日,
        s: 命主信息.时,
        f: 命主信息.分,
        sf: 命主信息.省份编号,
        cs: 命主信息.城市编号,
        qx: 命主信息.区县编号,
        jd: 命主信息.经度
    };

    // 拼接参数并尝试进行URL编码
    var queryParams = Object.keys(params).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&');

    var url = baseUrl + '?' + queryParams;
    // 生成二维码
    new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 512,
        height: 512,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M // 可以尝试降低纠错级别到 M 或 L
    });


}



