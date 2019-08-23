const assert = require("power-assert")
const {allRight} = require("../bundle")
const {
    dump
} = require("dumper.js")

describe("TEST function allRight", () => {
    let data = {
        //比对结果，依据是相似度
        "auth_result": "T",
        //活体攻击风险。1表示有风险，0表示无风险
        "risk_tag": {
            "living_attack": "0"
        },
        //实名验证结果 1 姓名与号码一致，2 不一致，3，查询无结果
        "verify_status": "1",
    }

    let values = [data.auth_result, data.risk_tag.living_attack, data.verify_status]
    let checks = ["T", "0", "1"]
    let infos = ["证照活体相识度低", "疑似活体攻击", "实名验证不通过"]

    it("1 test right sisuation", () => {
        assert(true === allRight(values, checks, infos))
    })

    let data2 = {
        //比对结果，依据是相似度
        "auth_result": "T2",
        //活体攻击风险。1表示有风险，0表示无风险
        "risk_tag": {
            "living_attack": "02"
        },
        //实名验证结果 1 姓名与号码一致，2 不一致，3，查询无结果
        "verify_status": "12",
    }

    let values2 = [data2.auth_result, data2.risk_tag.living_attack, data2.verify_status]
    let worngWords = "证照活体相识度低;疑似活体攻击;实名验证不通过;"
    let result2 = allRight(values2, checks, infos)
    it("2 test wrong sisuation", () => {
        assert.equal(worngWords, result2)
    })
})