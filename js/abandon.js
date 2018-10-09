// 外省手机通话次数
// 先拿到本号码归属地字符串，
// 再遍历联系人列表，统计外省 手机号 次数
let {
    province: localString,
    area_code: localCode,
} = find(phone)
localCode = localCode.slice(0, 3)
// 外省通话次数
const nonlocalMobileCallTimes = {
    oneWeek: 0,
    oneMonth: 0,
    threeMonth: 0,
    sixMonth: 0,
}
// 外省固话通话次数
// 地区码，前三位
const nonlocalFixCallTimes = {
    oneWeek: 0,
    oneMonth: 0,
    threeMonth: 0,
    sixMonth: 0,
}
// 统计次数
await contactList.forEach(async (element) => {
    const {
        province: string,
    } = await find(element.peer_num)
    // 手机号，且是外省
    if (element.peer_num.length === 11 && string !== localString) {
        nonlocalMobileCallTimes.oneWeek += element.call_cnt_1w
        nonlocalMobileCallTimes.oneMonth += element.call_cnt_1m
        nonlocalMobileCallTimes.threeMonth += element.call_cnt_3m
        nonlocalMobileCallTimes.sixMonth += element.call_cnt_6m
    } else if (element.peer_num.length === 12 && element.peer_num.slice(0, 3) !== localCode) {
        // 固话，且是外省
        nonlocalFixCallTimes.oneWeek += element.call_cnt_1w
        nonlocalFixCallTimes.oneMonth += element.call_cnt_1m
        nonlocalFixCallTimes.threeMonth += element.call_cnt_3m
        nonlocalFixCallTimes.sixMonth += element.call_cnt_6m
    }
})
// 校验 外省通话
if ((nonlocalMobileCallTimes.oneMonth <= CONSTANT.minNonlocalMobileCall) && (nonlocalFixCallTimes.oneMonth <= CONSTANT.minNonlocalFixCall)) {
    result.nonlocalPhoneCallCheck = true
}