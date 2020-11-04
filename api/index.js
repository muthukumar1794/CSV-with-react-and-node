const express = require('express')
const app = express()
const cors = require('cors')
const fs = require('fs')
const path = require('path')

app.use(cors())

app.get('/get/csvfile/data', async (req, res, next) => {
    try {

        const csvFilename = "url.csv"
        const rootPath = path.dirname(process.mainModule.filename);

        const file = fs.readFileSync(path.join(rootPath, csvFilename), 'utf8', (err, filecontent) => {
            if (err) {
                return err
            }
            return filecontent
        })
        const dataArray = file.split(/\r?\n/);
        console.log("ffffffff")

        let mainArray = [];
        for (let index = 0; index < dataArray.length; index++) {
            const element = dataArray[index];
            const filterData = element.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            mainArray.push(filterData);

        }

        res.status(200).json({
            data: mainArray
        })
    } catch (err) {
        console.log("errrrrrrr,", err);
    }
});

app.listen(8080, (req, res, next) => {
    console.log("server started")
})