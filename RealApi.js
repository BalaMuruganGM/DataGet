const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const path = require('path');
const port = 4200;

const db = mysql.createConnection({
    host : "ba4g9mxkc6c9ufqgpeom-mysql.services.clever-cloud.com",
    user : "uc1snc5gwpkrktmq",
    password : "OyEnCdl50UllXKhzC6ie",
    database : "ba4g9mxkc6c9ufqgpeom"
});

db.connect((error)=>{
    if(error){
        console.log("Database cannot connect");
    }else{
        console.log("Database is connect");
    }
});

app.get('/curd/get' , function(req, res){
    const query = "select * from realdata";
    db.query(query , (error , result)=>{
        if(error){
            res.send({message : "varalla" , data:error});
        }else{
            res.send({message : "vanthurussi" , data : result});
        }
    })

});


app.post('/curd/post' , function(req ,res){
    const {id , name , age} = req.body;
    const dbQuer = "insert into realdata (id , name , age) values (? ,? ,?)";
    db.query(dbQuer , [id , name , age] , (error , result)=>{
        if(error){
            res.send({message : "varalla" , data : error});
        }else{
            res.send({message : "vanthurussi" , data : result});
        }
    })
});

app.put('/curd/put/:id' , function(req ,res){
    const {id} = req.params;
    const {name , age} = req.body;
    const dbQuer = "update realdata set name = ? , age = ? where id=?";
    db.query(dbQuer , [name , age , id] , (error , result)=>{
        if(error){
            res.send({message : "varalla" , data : error});
        }else{
            res.send({message : "vanthurussi" , data: result});
        }
    }) 
});

app.delete('/curd/delete/:id' , function(req ,res){
    const dbQuer = "delete from realdata where id=?";
    const id = req.params.id;
    db.query(dbQuer , [id] , (error , result)=>{
        if(error){
            res.send({message : "varalla" , data : error});
        }else{
            res.send({message : "vanturussi" , data : result});
        }
    })
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/index/page', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});




app.listen(port , (error)=>{
    if(error){
        console.log(error);    
    }else{
        console.log("working proberly");
    }
});

