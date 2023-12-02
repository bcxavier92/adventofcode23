const fs = require('fs')
const readline = require('readline');

const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

async function process() {
    const fileStream = fs.createReadStream(`${__dirname}/puzzle.txt`)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let its = 0
    let sum = 0
    for await (let line of rl) {
        let first = null
        let last = null
        let nums = {}
        for(i = 0; i < words.length; i++) {
            const matches = line.matchAll(new RegExp(words[i], 'g'))
            for(const match of matches) {
                nums[match.index] = i + 1
            }
        }

        for(let i = 0; i < line.length; i++) {
            const c = line[i]
            if(/^-?\d+$/.test(c)) {
                const n = Number.parseInt(c)
                nums[i] = n
            }
        }

        keys = Object.keys(nums)
        first = nums[keys[0]]
        last = nums[keys[keys.length - 1]]

        sum += (first * 10) + last
        its++
    }
    console.log(sum)
}

process()