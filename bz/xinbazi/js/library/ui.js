// 增加弹窗全局变量控制
document.addEventListener('alpine:init', () => {
    Alpine.store('弹窗控制器', {
        状态: false,
        弹窗类型: '空',//设置_命盘,天干_信息,地支_信息,神煞_信息
        弹窗标题: '空',
        状态切换() {
            this.状态 = !this.状态;
        },
        弹窗设置(弹窗类型, 弹窗标题) {
            this.弹窗类型 = 弹窗类型;
            this.弹窗标题 = 弹窗标题;
        }
    });

    Alpine.store('弹窗_天干', {
        能量: '',
        概述: '',
        性格: '',
        宫位: '',
        关系: '',
        身体: '',

        设置(能量信息, 宫位, 干, 支, 十神) {

            this.概述 = 获取_概述信息(宫位, 干, 十神);
            this.性格 = 获取_性格信息(宫位, 干, 十神);
            this.身体 = 获取_身体信息(宫位, 干, 支, 十神);
            this.关系 = 获取_关系信息(宫位, 干, 十神);
            this.能量 = 能量信息;

        }
    });



    Alpine.store('弹窗_神煞', {
        信息: '',
        设置(神煞) {
            this.信息 = 获取_神煞信息(神煞);
        }
    });


    Alpine.store('弹窗_地支', {
        信息: '',
        设置(地支) {
            this.信息 = 获取_地支信息(地支);
        }
    });

    Alpine.store('弹窗_合化', {
        结果: '',
        设置(合化结果) {
            this.结果 = 合化结果;
        }
    });

    Alpine.store('弹窗_支付', {
        支付地址: '',
        设置(支付地址) {
            this.支付地址 = 支付地址;
        }
    });


});





function 天干选项卡() {
    return {
        激活选项卡: '概述',
        选项卡列表: [
            {
                标题: '概述',
            },
            {
                标题: '性格',
            },
            {
                标题: '身体',
            },
            {
                标题: '关系',
            },
            {
                标题: '能量',
            },
        ],
    }
}






function 获取_概述信息(宫位, 干, 十神) {
    返回 =
        [{
            标题: '天干',
            列表: 天干表[干]['综合'],
        },
        {
            标题: '性',
            列表: 天干表[干]['性'],
        },
        {
            标题: '象',
            列表: 天干表[干]['象'],
        },
        {
            标题: '宫定位时空',
            列表: 宫位表[宫位]['时空'],
        },
        ]
    return 返回;
}




function 获取_关系信息(宫位, 干, 十神) {
    返回 =
        [
            {
                标题: '神定位六亲(男)',
                列表: 十神表[十神]['男六亲'],
            },
            {
                标题: '神定位六亲(女)',
                列表: 十神表[十神]['女六亲'],
            },
            {
                标题: '宫定位六亲',
                列表: 宫位表[宫位]['六亲'],
            },
            {
                标题: '宫定位人际关系',
                列表: 宫位表[宫位]['人际'],
            },
            {
                标题: '社会关系',
                列表: 十神表[十神]['社会关系'],
            },
        ]
    return 返回;
}



function 获取_性格信息(宫位, 干, 十神) {
    返回 =
        [
            {
                标题: '性格',
                列表: 十神表[十神]['性格'],
            },
            {
                标题: '追求',
                列表: 十神表[十神]['追求'],
            },
            {
                标题: '喜',
                列表: 十神表[十神]['喜'],
            },
            {
                标题: '忌',
                列表: 十神表[十神]['忌'],
            },
            {
                标题: '其他',
                列表: 十神表[十神]['其他'],
            },
        ]
    return 返回;
}








function 获取_神煞信息(神煞) {
    返回 = 神煞表[神煞];
    return 返回;
}



function 获取_地支信息(地支) {
    返回 = 地支表[地支];
    return 返回;
}



// function 返回_宫位(宫位) {

//     let 宫位名称表 = new Map([
//         ['年干', '年干'],
//         ['月干', '月干'],
//         ['日干', '日干'],
//         ['时干', '时干'],
//         ['大运干', '大运干'],
//         ['流年干', '流年干'],
//         ['流月干', '流月干'],
//         ['年支', '年支'],
//         ['月支', '月支'],
//         ['日支', '日支'],
//         ['时支', '时支'],
//         ['大运支', '大运支'],
//         ['流年支', '流年支'],
//         ['流月支', '流月支'],
        
//     ]);
//     return 宫位名称表.get(宫位);
// }




function 获取_身体信息(宫位, 干, 支, 十神) {
    let 宫位名称表 = new Map([
        ['年干', '年'],
        ['月干', '月'],
        ['日干', '日'],
        ['时干', '时'],
        ['大运干', '大运'],
        ['流年干', '流年'],
        ['流月干', '流月'],
        ['年支', '年'],
        ['月支', '月'],
        ['日支', '日'],
        ['时支', '时'],
        ['大运支', '大运'],
        ['流年支', '流年'],
        ['流月支', '流月'],        
    ]);

    返回 =
        [{
            标题: '干对应',
            列表: 天干表[干]['身体'],
        },
        {
            标题: '干定位',
            列表: 天干表[干][宫位名称表.get(宫位)],
            //列表: 天干表[干][返回_柱位[宫位]],
        },
        {
            标题: '支定位',
            列表: 地支表[支]['身体'],
        },
        {
            标题: '宫定位',
            列表: 宫位表[宫位]['身体'],
        },
        ]
        
    return 返回;
}



function 返回_柱位(宫位) {

    let 宫位名称表 = new Map([
        ['年干', '年'],
        ['月干', '月'],
        ['日干', '日'],
        ['时干', '时'],
        ['大运干', '大运'],
        ['流年干', '流年'],
        ['流月干', '流月'],
        ['年支', '年'],
        ['月支', '月'],
        ['日支', '日'],
        ['时支', '时'],
        ['大运支', '大运'],
        ['流年支', '流年'],
        ['流月支', '流月'],        
    ]);
    return 宫位名称表.get('年干');
}
