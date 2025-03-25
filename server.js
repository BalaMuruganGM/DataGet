const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
// const port =4800;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// const db = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "",
//     database : "bala"
// });

// db.connect((error)=>{
//     if(error){
//         console.log("Database cannot Connect");
//     }else{
//         console.log("databse connection success");
//     }
// });


// app.get('/curd/get' , function(req , res){
//     const dbQuer = "select * from curd";
//     db.query(dbQuer , (error , result)=>{
//         if(error){
//             res.send({message : "varalla" , data:error});
//         }else{
//             res.send({message : "vanthurussi" , data:result});
//         }
//     })
// });

// app.get('/api/data', (req, res) => {
//     const query = "SELECT id, name, age, created_at FROM curd ORDER BY created_at DESC";    
//     db.query(query, (err, results) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).json({ message: "Database error" });
//         }

//         res.json({
//             message: "vanthurussi",
//             data: results
//         });
//     });
// });



// app.listen(port , (error)=>{
//     if(error){
//         console.log("port not open" , error);
//     }else{
//         console.log("port is run" , port);
//     }
// });



// // app.get('/curd/get' , function(req , res){
// //     const dbQuery = "select * from curd";
// // })

// const mysql = require('mysql2');
// const express = require('express');
// const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bala"
});

// Function to calculate the time duration since the post was created
function getTimeDuration(postDate, postTime) {
    const postDateTime = new Date(`${postDate}T${postTime}`);
    const now = new Date();
    const diffMs = now - postDateTime;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days} day(s) ago`;
    if (hours > 0) return `${hours} hour(s) ago`;
    return `${minutes} minute(s) ago`;
}

// API to get data with separate date, time, and duration
app.get('/api/data', (req, res) => {
    const query = "SELECT id, name, age, created_date, created_time FROM curd ORDER BY created_date DESC, created_time DESC";

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }

        // Add duration calculation for each record
        const formattedResults = results.map(item => ({
            ...item,
            duration: getTimeDuration(item.created_date, item.created_time) // Calculate time since posted
        }));

        res.json({
            message: "vanthurussi",
            data: formattedResults
        });
    });
});

app.listen(4800, () => console.log("Server running on port 4800"));
