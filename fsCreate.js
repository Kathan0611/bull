const http = require("http");
const fs = require("fs");
// const { isUtf8 } = require("buffer");
http.createServer((req, res) => {
    fs.unlink('t2.txt',(err) => {
     if(err) console.log(err);
     console.log("saved");
      res.write("save")  
    //   res.end("save");
    });
}).listen(3000);
