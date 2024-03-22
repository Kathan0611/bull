const fs = require("fs");
// const { dirname } = require('path');
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   let obj = data.toString().trim();
//   console.log(`https://dog.ceo/api/breed/${obj}/images/random`, obj);

//   superagent
//     .get(`https://dog.ceo/api/breed/${obj}/images/random`)
//     .then((res) => {
//       // .end((err,res)=>{
//       console.log(res.body.message);

//       fs.writeFile("dog-Img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message, "testerr");
//         console.log("good");
//       });
//     })
//     .catch((err) => {
//       console.log(err, "kkk");
//     });
// });

// fs.readFile(`${__dirname}`)

const readFilePro =file =>{
  return new Promise((resolve,reject)=>{
    fs.readFile('./dog.txt',(err,data)=>{
      if(err) reject('I could not find  that file')
      resolve(data)
    });
  })
}

const writeFilePro = (file,data) =>{
  return new Promise((resolve, reject)=>{
    fs.writeFile('./dog-img.txt',data,err=>{
      if(err) reject('could not write file')
      resolve('success')
    })
  })
}

readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    const obj=data.toString().trim()
    return superagent.get(`https://dog.ceo/api/breed/${obj}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err.message);
  });