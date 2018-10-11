const promises = global.CONSTANT.configBasicChecks.map((value) => {
    const promise = this.db.select('check_type', {
        where: {
            id: value,
        },
    })
    return promise
})

const requiredChecks = await Promise.all(promises).then(value => value)