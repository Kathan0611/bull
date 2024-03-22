// const { log } = require('console');
// const { Console } = require('console');
const slugify =require('slugify');
const dataObej=require('./product.json');
const event =require('./module')
const fs=require('fs');
const http=require('http');
//non blocking data-----------------------
fs.readFile('index.txt','utf-8',(data)=>{
    console.log("*********"+data);
});
const obj=dataObej.map(e=>slugify(e.title,{lower:true}))

console.log(obj);

// blocking data --------------------------
const a=fs.readFileSync('index.txt','utf-8')
console.log(a);
const textOut =`${a}`
console.log(textOut);

fs.writeFile('about.txt',`${a}`,'utf-8',err=>{
    console.log("you name also kathan")
})
const server=http.createServer((req,res)=>{
       console.log(req.url)
       const pathName=req.url;
       if(pathName==='/overview'){
           res.writeHead(200,{'Content-Type':'text/html'})
           res.end('<h1>overview</h1>');
        }
       else if(pathName==='/product'){
           res.setHeader('Content-Type','text/html')
           
           res.end('<h2>product</h2>')
        }
        
    res.end('hello world');
})

server.listen('8080',(req,res)=>{
    console.log('server runnig port 8080');
})
