const express = require('express')
app = express();
const mysql = require('mysql')
const multer = require('multer');
const path = require('path')
var bodyParser = require('body-parser')
const cors = require('cors');
const e = require('express');



app.use(express.static("./public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


const db = mysql.createPool({
    connectionLimit:100,
    host:'localhost',
    user:'root',
    password:"",
    database:"hostelroomallotment"
})

db.getConnection((err)=>{
    if(err) console.log(err)
    else console.log('connected successfully...')
})



//Sravya's code
app.post("/accept",(req,res)=>{
    console.log("deleting")
    console.log(req.body.data)
      const {hostel,room,bed,id} = req.body.data
    console.log(hostel)
    console.log(room)
    console.log(bed)
    console.log(id)
     const sql1 ='UPDATE students SET HostelName= ? , RoomNo= ?, BedNo= ? WHERE RegdNo = ? ;'
    // // // var sql2 = `delete from request where id = ?`
    db.query(sql1,[hostel,room,bed,id],(err,result,fields)=>{
        if(err) console.log(err)
        else {
            // res.send("Inserted successfully...")
            console.log("updated");
            res.end()
        }
    })
})


app.post("/accept2",(req,res)=>{
    console.log("in accepted2")
    console.log(req.body.data)
    const {hostel,room,bed,id} = req.body.data;
    console.log(id)
    var sql2 = 'delete from request where id = ?;'
    db.query(sql2,[id],(err,result,fields)=>{
        if(err) console.log(err)
        else{
            console.log("deleted")
            res.end()
        }
    })
})


app.post("/reject/:id",(req,res)=>{
    const id = req.params.id
    console.log(id);
    var sql = `update request set hostel = ?, room = ?, bed = ? where id = ?`
    db.query(sql,[id],(err,result,fields)=>{
        if(err) console.log(err)
        else {
            // res.send("Inserted successfully...")
            res.end()
        }
    })
})

app.get("/requests",(req,res)=>{
    console.log("getting data from db....")
    db.query('select * from request',(err,result)=>{
        if(err) console.log(err)
        else{
            console.log(result)
            res.send(result)
            res.end()
        }
    })
})


// Teju's code
app.get('/accommon',(req,res)=>{
    const sql = 'select count(hostelname) as count from hostelcategories where type="AC-Common"'
    db.query(sql,(err,result)=>{
        if(err)  
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


app.get('/nonaccommon',(req,res)=>{
    const sql = 'select count(hostelname) as count from hostelcategories where type="Non AC-Common"'
    db.query(sql,(err,result)=>{
        if(err)  
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


app.get('/hostelsdisplay',(req,res)=>{
    const sql = 'select * from hostelcategories'
    db.query(sql,(err,result)=>{
        if(err)  
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
    
})

app.get('/nonacattached',(req,res)=>{
    const sql = 'select count(hostelname) as count from hostelcategories where type="Non AC-Attached"'
    db.query(sql,(err,result)=>{
        if(err)  
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


app.get('/acattached',(req,res)=>{
    const sql = 'select count(hostelname) as count from hostelcategories where type="AC-Attached"'
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.get("/hostelwisestudent",(req,res)=>{
    const sql = 'select * from students'
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


//Navaneetha's code

app.get("/",(req,res)=>{
    console.log("server started ...")
    res.send("in homepage..")
})


app.get("/Studentslist",(req,res)=>{
    console.log("In Studentlist route...")
    db.query("select * from students",(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.post("/studentlogin",(req,res)=>{
   const {username1,password1} = req.body.Studentinput;
    console.log("in student login")
    const sql = 'SELECT * FROM `students` WHERE RegdNo = ?;'
    db.query(sql,[username1],(err,result)=>{
        if(err){
            console.log(result.length)
        }else{
            if(result.length === 0){
                res.send('Invalid')
            }else{
                res.send('valid')
            }
        }
    })
})

app.post("/adminlogin",(req,res)=>{
    const {username2,password2} = req.body.Admininput;
     console.log("in admin login")
     const sql = 'SELECT * FROM `admin` WHERE username = ? and password = ?;'
     db.query(sql,[username2,password2],(err,result)=>{
         if(err){
             console.log(result.length)
         }else{
             if(result.length === 0){
                 res.send('Invalid')
             }else{
                 res.send('valid')
             }
         }
     })
 })

//Renuka's code
app.post("/booking",(req,res)=>{
    const {name,username,branch,mobile,fname,foccup,fmobile,hostel,room,bed} = req.body.inputs;
    console.log(req.body.inputs)
    const query = 'INSERT INTO `stddetails`(`Name`, `Regdno`, `Mobileno`, `Fathername`, `Fatheroccupation`, `Fathermobile`, `Hostel`, `Room`, `Bed`) VALUES (?,?,?,?,?,?,?,?,?);'
    db.query(query,[name,username,branch,mobile,fname,foccup,fmobile,hostel,room,bed],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.end()
        }
    })
})

app.post('/requests',(req,res)=>{
    const {name,username,branch,mobile,fname,foccup,fmobile,hostel,room,bed} = req.body.inputs;
    console.log(req.body.inputs)
    const query = 'INSERT INTO `request`(`id`, `name`, `branch`, `phoneno`, `hostel`, `room`, `bed`) VALUES (?,?,?,?,?,?,?);';
    db.query(query,[username,name,branch,mobile,hostel,room,bed],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.end()
        }
    })
})

app.post("/status",(req,res)=>{
    console.log("in status..")
    const {username} = req.body.input
    console.log(req.body.input)
    const query = 'SELECT * FROM `students` WHERE RegdNo = ?;';
    db.query(query,[username],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.end(result)
        }
    })
})

app.get("/status1", (req,res)=>{
    console.log("get status")
    const query = `SELECT * FROM students WHERE RegdNo = '20B01A0597'`;;
    db.query(query,(err,result)=>{
        if(err) console.log(err)
        else{
            console.log(result)
            
            res.send(result)
        }
    })
})

app.get("/hostelroomdetails",(req,res)=>{
    const sql = 'select * from studentsidehosteldetails'
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })

})




app.get('/hostels1',(req,res)=>{
    const sql = 'select * from hostelcategories'
    db.query(sql,(err,result)=>{
        if(err)  
        {
            console.log(err)
        }
        else{
            
            res.send(result)
        }
    })
    
})

// app.post("/insert1",(req,res)=>{
//     console.log("Login....")
//     const {username1,password1} = req.body.Studentinput
//     // const {username2,password2} = req.body.Admininput
//     console.log(username1)
//     console.log(password1)
//     // console.log(username2)
//     // console.log(password2)
//     const sql = "select * from students where RegdNo = ?"
//     db.query(sql,[username1],(err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             console.log(result)
//         }
//     })
// })

// app.get("/insert1",(req,res)=>{
//     console.log("Login....")
//     var sql = "select * from students"
//     db.query(sql,(err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         else{
//             res.send(result)
//         }
//     })
// })

app.listen(8080,()=>{
    console.log('server is listening...!')
})