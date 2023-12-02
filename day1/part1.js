const fs = require('fs')
const readline = require('readline');

async function process() {
    const fileStream = fs.createReadStream(`${__dirname}/puzzle.txt`)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let sum = 0
    for await (const line of rl) {
        let first = null
        let last = null
        for(let i = 0; i < line.length; i++) {
            const c = line[i]
            if(/^-?\d+$/.test(c)) {
                const n = Number.parseInt(c)
                if(first === null) first = n
                last = n
            }
        }

        sum += (first * 10) + last
    }
    console.log(sum)
}

process()