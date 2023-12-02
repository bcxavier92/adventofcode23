const fs = require('fs')
const readline = require('readline');

async function process() {
    const fileStream = fs.createReadStream(`${__dirname}/puzzle.txt`)

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    })

    let sum = 0
    let game = 0
    maxes = []
    const maxRed = 12
    const maxGreen = 13
    const maxBlue = 14
    for await (let line of rl) {
        begin = line.indexOf(':')
        line = line.substring(begin + 2, line.length)

        // console.log(line)

        // Iterate rounds
        maxes.push({red: 0, green: 0, blue: 0})
        for(const round of line.split('; ')) {
            for(const set of round.split(', ')) {

                const parts = set.split(' ')
                const color = parts[1]
                const val = Number.parseInt(parts[0])
                if(maxes[game][color] < val) {
                    maxes[game][color] = val
                }
            }
        }

        game++

        const values = maxes[game - 1]
        sum += (values['red'] * values['blue'] * values['green'])
    }

    console.log(sum)
}

process()