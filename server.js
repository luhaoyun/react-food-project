const express =require('express');
const path = require('path');

const app =express();
const fpath = path.join(__dirname, '/build');

// console.log(__dirname)
// console.log(fpath)
app.use(express.static(fpath))


app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname, '/build/index.html'))
})

const port = process.env.PORT || 5005
app.listen(port, () =>{
    console.log(`LISTENING ON PORT ${port}!`)
})