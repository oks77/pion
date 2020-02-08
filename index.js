var express = require('express');
var mysql = require('mysql');
var app = express();
var con = mysql.createConnection({
    host: "localhost",
    user: "oksana",
    password: "321678",
    database: "oksana",
    port: 3306
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

var sql = `select name, is_spy from flowers where id = '1'`;
con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});

app.get('/', function (req, res) {
    res.sendFile('C:\\Users\\User\\WebstormProjects\\oksana\\index.html');
});

app.get('/click', async(req, res) => {
    console.log(req.query);
    var form_front = req.query.flower;
    var sql = `select name, is_spy from flowers where name = '${form_front}'`;
    await con.query(sql, function (err, result) {
        if (err){
            throw err
        };
        console.log(JSON.parse(JSON.stringify(result)))
        return res.send({flower: JSON.parse(JSON.stringify(result))[0].is_spy? 'шпион!': 'не шпион!'})
    });
    // for(let i = 0; i < mysqlArray.length; i++){
    //     if (req.query.flower === mysqlArray[i].name){
    //         return res.send({flower: mysqlArray[i].isSpy? 'шпион!': 'не шпион!'})
    //     }
    // }
    console.log(data);
    res.send({flower: 'под подозрением!'})
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});