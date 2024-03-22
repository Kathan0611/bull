const fs=require('fs');
const server=require('http').createServer();

server.on('request',(req,res)=>{
//    fs.readFile('test.txt','utf-8',(err, data)=>{
//       if(err) 
//        console.log(err)
//       res.end(data)
//    })

const readable =fs.createReadStream('./test.txt','utf-8')
readable.pipe(res)
// console.log(reable.pipe(res))
    // res.write(chunk);
    // console.log(chunk)

// reable.on('end', ()=>{
//     res.end();
// })

// reable.on('error', err=>{
//     console.log(err)
//     res.statusCode=500
//     res.end('File is not found');
// })
})
// server.on('request',(err,data)=>{
//     fs.readFile('test.txt',(err,data)=>{
//         if(err) console.log(err)
//         console.log(data)
//     })
// })

// server.close('close',(err,data)=<{

// })

server.listen(8080,()=>{
    console.log('server is running ')
})