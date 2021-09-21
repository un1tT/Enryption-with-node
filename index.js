const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const app = express()
const port = 3000

const KEY = 'ciw7p02f70000ysjon7gztjn7c2x7GfJ';
const INPUT_ENCODING = 'utf8';
const OUTPUT_ENCODING = 'latin1';
let keyBuffer = Buffer.from(KEY,'utf8');
const ALGORITHM = 'aes-256-ecb';
let IV = Buffer.alloc(0);

app.use(express.json());
app.use(cors());

app.post('/encrypt', (req, res) => {
    
    const text = req.body.text;

    const cipher = crypto.createCipheriv(ALGORITHM, keyBuffer, IV);
    let ciphered = cipher.update(text, INPUT_ENCODING, OUTPUT_ENCODING);
    ciphered += cipher.final(OUTPUT_ENCODING);
    res.send({ result: ciphered })
})

app.post('/decrypt', (req, res) => {
    const text = req.body.text;

    const decipher = crypto.createDecipheriv(ALGORITHM, keyBuffer, IV);
    let deciphered = decipher.update(text, OUTPUT_ENCODING, INPUT_ENCODING);
    deciphered += decipher.final(INPUT_ENCODING);
    res.send({ result: deciphered })
  })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})