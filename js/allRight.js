let allRight = (values, checks, infos) => {
    let result = true
    let resultInfo = ""
    let eachfunc = (value, index) => {
        if (!(value === checks[index])) {
            result = false
            resultInfo = resultInfo.concat(infos[index], ";")
        }
    }
    values.forEach(eachfunc)
    if (result === false) return resultInfo
    return result
}

export {allRight}