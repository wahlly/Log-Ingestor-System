const { once } = require("events")
const fs = require("fs")
const readLine = require("readline")

// const rl = readLine.createInterface({input: process.stdin, output: process.stdout})

// module.exports.streamLogs = () => {
      // rl.question("Please, provide the logs", (data) => {
      //       let logs = ""
      // data.on('data', (buffs) => {
      //       logs += buffs.toString()
      // })

      // data.on("end", async() => {
      //       const logData = JSON.parse(logs)
      //       console.log(logData)
      // })
      // console.log(logs)
      // })
// }

// const readline = require('node:readline');
// const { stdin: input, stdout: output } = require('node:process');

// const rl = readline.createInterface({ input, output });

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });




const readLogs = async () => {
      return new Promise((resolve, reject) => {
            const rl = readLine.createInterface({input: process.stdin})

            function readToFile(logs) {
                  const writeStream = fs.createWriteStream(__dirname + '/output_logs.json')
                  logs.forEach((log, index) => {
                        console.log(index)
                        index == 0 ? writeStream.write(JSON.stringify(log)) : index == logs.length ? writeStream.write(`\n ${JSON.stringify(log)}`) : writeStream.write(`\n ${JSON.stringify(log)},`)
                  })
                  writeStream.on('error', (e) => {console.log(e)})
                  console.log("successfully saved batch to file")
                  writeStream.end()
            }

            let logs = []
            let time = 10000

            rl.on("line", (line) => {
                  setTimeout(() => {
                        rl.close()
                  }, time)
                  if(line.trim() == "exit") {
                        rl.close()
                  }

                  logs.push(JSON.parse(line))
                  // console.log(logs)
                  if(logs.length > 4) {
                        // readToFile().then(res => {
                        //       logs = []
                        // })
                        readToFile(logs)
                        logs = []
                  }

                  time += 10000
            })

            rl.on('close', async () => {
                  //save to db
                  // readToFile().then(res => {
                  //       logs = []
                  //       console.log("successfully logged batch to file")
                  // })
                  // console.log(logs)
                  resolve(logs)
                  readToFile(logs)
                  process.exit(0)
            })

            // once(rl, 'close')
      })
}

readLogs().then(res => {console.log(res)})