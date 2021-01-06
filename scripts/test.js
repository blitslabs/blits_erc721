const BigNumber = require('bignumber.js')

const balance = BigNumber(1e18)

let decimals = BigNumber(1)

decimals.exponentiatedBy(9)

// console.log(decimals.toString())

function pad(num, size) {
    let decimals = '1'
    while (decimals.length <= parseInt(size)) decimals = decimals + '0'
    return Number(BigNumber(num).multipliedBy(decimals).toString()).toLocaleString('fullwide', { useGrouping: false })
}

let divisor = pad(1, 0)

const result = balance.div(divisor)
console.log(divisor)
console.log(divisor.length)


