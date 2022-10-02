const express = require("express")
const app = express()
const mysql = require('mysql')

app.use(express.json())

app.listen(3000,() => {
    console.log('port started on 3000')
})
 let con = mysql.createConnection({
     host:"localhost",
     user:"root",
     password:"root123",
     database:"testdb"
 })
 con.connect(function(err){
     if(err) throw new Error()
     console.log('connect with database') 
 })


app.get("/alltodo",(req,res) => {
    con.query('select * from todo',function(err,result){
        if(err) throw new Error
        res.json({
            todos:result
        })
    })
})
app.post("/addtodo",(req,res) => {
    const {title,description} = req.body
    con.query(`insert into todo(title,description) values("${title}","${description}")`,function(err,result){
        if(err) throw Error()
        res.json({
            newtodo:result,
            message:"added todo"
        })
    })
})

app.put("/updatetodo",(req,res) => {
    const {title,description,oldtitle} = req.body
    con.query(`update todo set title = "${title}",description = "${description}" where title = "${oldtitle}" `,function(err,result){
        if(err) throw Error()
        res.json({
            uptade_todo:result,
            message:"updated todo"
        })
    })
})

app.delete("/deletetodo",(req,res) => {
    const {title} = req.body
    con.query(`delete from todo where title = "${title}"`,function(err,reslut){
        if(err) throw new Error
        res.json({
            delete_todo:reslut,
            message:"deleted todo"
        })
    })
})

