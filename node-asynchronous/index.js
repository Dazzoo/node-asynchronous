const fs = require('fs')
const superagent = require('superagent')

const ReadFilePromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err)
            resolve(data)
        })
    })
}

const writeFilePromise = (file, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, (err) => {
            if (err) reject(err)
            resolve('Wile has been written successfully')
        })
    })
}


ReadFilePromise(`${__dirname}/dog.txt`)
.then((data) => {
    console.log(`Breed: ${data}`)

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
})
.then(res => {
    return writeFilePromise('dog-img.txt', res.body.message)
})
.then(
    console.log('Random dog img has been written to the file')
).catch((err) => {
    console.log(err)
})


// fs.readFile(`${__dirname}/dog.txt`, (err, data) =>{
//     console.log(`Breed: ${data}`)
//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//         fs.writeFile('dog-img.txt', res.body.message, (err) => {
//             if (err) return console.log(err.message)
//             console.log(res.body.message)
//         })
//     }).catch(err => {
//         console.log(err)
//     })
// })