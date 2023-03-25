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

const fetchDogImg = async (numOfImgs = 1) => {
    try {
        let breed = await ReadFilePromise(`${__dirname}/dog.txt`)
        console.log(`Breed: ${breed}`)

        let numOfImgsArray = []

        for (let i = 1; i <= numOfImgs; i++) {
            numOfImgsArray.push(i)
         }

         console.log(numOfImgsArray)

        let promisesList = numOfImgsArray.map(n => superagent.get(`https://dog.ceo/api/breed/${breed}/images/random`))
    
        let res = await Promise.all(promisesList)
        
        let resLinksList = res.map(res => res.body.message)

        await writeFilePromise('dog-img.txt', resLinksList.join('\n'))

        console.log('Random dog image saved to file')

    } catch (err) {
        console.log(err)
        console.log('caught error')
    }
}

fetchDogImg(3)

// // Callback Then-Catch 

// ReadFilePromise(`${__dirname}/dog.txt`)
// .then((data) => {
//     console.log(`Breed: ${data}`)

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// })
// .then(res => {
//     return writeFilePromise('dog-img.txt', res.body.message)
// })
// .then(
//     console.log('Random dog img has been written to the file')
// ).catch((err) => {
//     console.log(err)
// })

// // Calback HELL

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