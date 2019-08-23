'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let allRight = (values, checks, infos) => {
    let result = true;
    let resultInfo = "";
    let eachfunc = (value, index) => {
        if (!(value === checks[index])) {
            result = false;
            resultInfo = resultInfo.concat(infos[index], ";");
        }
    };
    values.forEach(eachfunc);
    if (result === false) return resultInfo
    return result
};

// array 待处理的对象数组
// keyname 目标对象的键名
// valueName 目标对象的键值。一个值是字符串，多个值是字符串数组
function objectArrayToObject(array, keyName, valueName) {
    let reducer;
    if (Array.isArray(valueName)) {
        // 多个值，数组
        reducer = (total, value) => {
            let obj = {};
            // 遍历取值组成对象
            valueName.forEach(element => {
                obj[element] = value[element];
            });
            // 拿到键的值 
            let key = value[keyName];
            // 对象放在键上
            total[key] = obj;
            return total
        };
    } else {
        reducer = (total, value) => {
            // 拿到键的值
            let key = value[keyName];
            // 值放在键上
            total[key] = value[valueName];
            return total
        };
    }
    let final = array.reduce(reducer, {});
    return final
}

// 返回一个对象，对象中只有想要的键
function objectFilter(obj, array) {
    let final = {};
    array.forEach((v) => {
        final[v] = obj[v];
    });
    return final
}



// let data1 = [{
//     result: '朋友圈主要活跃在武汉地区(居住地)',
//     evidence: '武汉地区通话时间占比为77%',
//     score: 1,
//     check_point: 'regular_circle',
//     check_point_cn: '朋友圈在哪里'
// },
// {
//     result: '长期使用（24个月以上，包含24）',
//     evidence: '根据号码[184606]运营商提供的认证时间,推算该号码使用49个月',
//     score: 1,
//     check_point: 'phone_used_time',
//     check_point_cn: '号码使用时间'
// },
// {
//     result: '180天内有46天无通话记录',
//     evidence: '根据运营商通话详单数据，连续三天以上无通话记录6次：2018-01-27 - 2018-02-01, 4天；2018-02-03 - 2018-02-07, 3天；2018-03-24 - 2018-03-28, 3天；2018-04-18 - 2018-04-23, 4天；2018-05-26 - 2018-05-30, 3天；2018-06-29 - 2018-07-03, 3天',
//     score: 2,
//     check_point: 'phone_silent',
//     check_point_cn: '手机静默情况'
// },
// {
//     result: '关机共40天',
//     evidence: '根据运营商详单数据，180天内关机40天，连续三天以上关机2次',
//     score: 2,
//     check_point: 'phone_power_off',
//     check_point_cn: '关机情况'
// },
// {
//     result: '数量正常（10 - 100）',
//     evidence: '互通过电话的号码有22个，比例为21%，其中未被标记号码22个，被标记号码0个',
//     score: 1,
//     check_point: 'contact_each_other',
//     check_point_cn: '互通过电话的号码数量'
// },
// {
//     result: '无通话记录',
//     evidence: '未发现与澳门地区电话通话记录',
//     score: 1,
//     check_point: 'contact_macao',
//     check_point_cn: '与澳门地区电话通话情况'
// },
// {
//     result: '无通话记录',
//     evidence: '未发现与110电话通话记录',
//     score: 1,
//     check_point: 'contact_110',
//     check_point_cn: '与110电话通话情况'
// },
// {
//     result: '无通话记录',
//     evidence: '未发现与120电话通话记录',
//     score: 1,
//     check_point: 'contact_120',
//     check_point_cn: '与120电话通话情况'
// },
// {
//     result: '无通话记录',
//     evidence: '未发现与律师电话通话记录',
//     score: 1,
//     check_point: 'contact_lawyer',
//     check_point_cn: '与律师电话通话情况'
// },
// {
//     result: '无通话记录',
//     evidence: '未发现与法院电话通话记录',
//     score: 1,
//     check_point: 'contact_court',
//     check_point_cn: '与法院电话通话情况'
// },
// {
//     result: '无该类号码记录',
//     evidence: '[总计]主叫0次共0分钟；被叫0次共0分钟；号码数0个',
//     score: 1,
//     check_point: 'contact_loan',
//     check_point_cn: '与贷款类号码联系情况'
// },
// {
//     result: '很少被联系（有该号码记录，且不符合上述情况）',
//     evidence: '[总计]主叫0次共0分钟；被叫4次共8分钟；号码数3个，联系列表：[中信银行信用卡24小时服务热线]主叫0次共0分钟；被叫1次共1分钟，[广东发展银行]主叫0次共0分钟；被叫2次共5分钟，[民生银行]主叫0次共0分钟；被叫1次共1分钟',
//     score: 1,
//     check_point: 'contact_bank',
//     check_point_cn: '与银行类号码联系情况'
// },
// {
//     result: '很少被联系（有该号码记录，且不符合上述情况）',
//     evidence: '[总计]主叫0次共0分钟；被叫4次共8分钟；号码数3个，联系列表：[中信银行信用卡24小时服务热线]主叫0次共0分钟；被叫1次共1分钟，[广东发展银行]主叫0次共0分钟；被叫2次共5分钟，[民生银行]主叫0次共0分钟；被叫1次共1分钟',
//     score: 1,
//     check_point: 'contact_credit_card',
//     check_point_cn: '与信用卡类号码联系情况'
// },
// {
//     result: '无该类号码记录',
//     evidence: '[总计]主叫0次共0分钟；被叫0次共0分钟；号码数0个',
//     score: 1,
//     check_point: 'contact_collection',
//     check_point_cn: '与催收类号码联系情况'
// },
// {
//     result: '很少夜间活动（低于20%)',
//     evidence: '晚间活跃频率占全天的0.91%',
//     score: 1,
//     check_point: 'contact_night',
//     check_point_cn: '夜间活动情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'dwell_used_time',
//     check_point_cn: '居住地本地（省份）地址在电商中使用时长'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'ebusiness_info',
//     check_point_cn: '总体电商使用情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'person_ebusiness_info',
//     check_point_cn: '申请人本人电商使用情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'virtual_buying',
//     check_point_cn: '虚拟商品购买情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'lottery_buying',
//     check_point_cn: '彩票购买情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'person_addr_changed',
//     check_point_cn: '申请人本人地址变化情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供学信网数据',
//     score: 0,
//     check_point: 'school_status',
//     check_point_cn: '申请人的学籍状态是否为在校学生'
// },
// {
//     result: '无数据',
//     evidence: '未提供学历数据',
//     score: 0,
//     check_point: 'education_info',
//     check_point_cn: '申请人的学历情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'work_addr_info',
//     check_point_cn: '申请人本人最近使用工作地址情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'live_addr_info',
//     check_point_cn: '申请人本人最近使用居住地址情况'
// },
// {
//     result: '无数据',
//     evidence: '未提供电商数据',
//     score: 0,
//     check_point: 'school_addr_info',
//     check_point_cn: '申请人本人最近使用学校地址情况'
// },
// {
//     result: '数量众多（100以上，不含100）',
//     evidence: '[总计]号码数103个；主叫82次共120分钟；被叫301次共455分钟，联系列表：[银行类]号码数3个；主叫0次共0分钟；被叫4次共8分钟，[信用卡类]号码数3个；主叫0次共0分钟；被叫4次共8分钟，[特种服务]号码数1个；主叫3次共8分钟；被叫0次共0分钟，[快递公司]号码数6个；主叫1次共0分钟；被叫17次共5分钟，[通信服务机构]号码数1个；主叫1次共1分钟；被叫0次共0分钟',
//     score: 1,
//     check_point: 'phone_call',
//     check_point_cn: '号码通话情况'
// }
// ]

// data2 = [{
//     key: 'mobile',
//     value: '18827674606'
// },
// {
//     key: 'carrier_name',
//     value: '*义'
// },
// {
//     key: 'carrier_idcard',
//     value: '420117********007*'
// },
// {
//     key: 'reg_time',
//     value: '2014-07-21 00:00:00'
// },
// {
//     key: 'in_time',
//     value: '49'
// },
// {
//     key: 'email',
//     value: '运营商未提供邮箱'
// },
// {
//     key: 'address',
//     value: '运营商未提供通讯地址'
// },
// {
//     key: 'reliability',
//     value: '实名认证'
// },
// {
//     key: 'phone_attribution',
//     value: '湖北武汉'
// },
// {
//     key: 'live_address',
//     value: '湖北武汉'
// },
// {
//     key: 'available_balance',
//     value: '5818'
// },
// {
//     key: 'package_name',
//     value: '运营商未提供套餐信息'
// },
// {
//     key: 'bill_certification_day',
//     value: '2018-07-25'
// }
// ]

// let result1 = objectArrayToObject(data1, "check_point", ["result", "evidence", "score", "check_point_cn"])
// let result2 = objectArrayToObject(data2, "key", "value")

// console.log(result2)

// const {allRight} = require("./allRight")
// const {
//     objectFilter,
//     objectArrayToObject
// } = require("./objectaction")

// module.exports = {
//     allRight,
//     objectFilter,
//     objectArrayToObject
// }

exports.allRight = allRight;
exports.objectFilter = objectFilter;
exports.objectArrayToObject = objectArrayToObject;
