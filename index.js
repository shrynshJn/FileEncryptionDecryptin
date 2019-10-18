const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const port = 3000;

app.use(fileUpload());
app.get('/', function(req, res){
    res.send('Welcome to File Encryption and Decryption System');
})

app.post('/encryptfile', function(req, res){
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
    }
    let file = req.files.file;
    if (!file.name.endsWith('.txt')) {
        return res.status(400).send("File should be of text format");
    }


    fileName = "./encrypt/" + file.name.split('.')[0] + new Date() + '.' + file.name.split('.')[1];
    req.files.file.mv(fileName, function(err){
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log("File Uploaded for Encryption");
    });
    var script = require("child_process").spawn;
    var process = script('python3', ['./scripts/encrypt.py', fileName, file.name.split('.')[0]]);
    process.stdout.on('data', function(data) {
        res.redirect('/encrypted?path=' + data);
    });
});

app.post('/decryptfile', function(req, res){
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded");
    }
    let file = req.files.file;
    if (!file.name.endsWith('.enc1')) {
        return res.status(400).send("File should be of CyberOne Encoding");
    }


    fileName = "./decrypt/" + file.name.split('.')[0] + new Date() + '.' + file.name.split('.')[1];
    req.files.file.mv(fileName, function(err){
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log("File Uploaded for Decoding");
    });
    var script = require("child_process").spawn;
    var process = script('python3', ['./scripts/decrypt.py', fileName, file.name.split('.')[0]]);
    process.stdout.on('data', function(data) {
        res.redirect('/decrypted?path=' + data);
    });
});

app.get('/encrypted', function(req, res){
    res.sendFile(__dirname + "/html/encrypted.html");
});

app.get('/encrypt', function(req, res) {
    res.sendFile(__dirname + '/html/encryptForm.html');
});

app.get('/decrypt', function(req, res) {
    res.sendFile(__dirname + "/html/decryptForm.html");
});

app.get('/decrypted', function(req, res) {
    res.sendFile(__dirname + "/html/decrypted.html");
});

app.get('/download', function(req, res){
    res.download(req.query.path);
});

app.get('/back.jpg', function(req, res) {
    res.sendFile(__dirname + "/html/back.jpg");
})
app.listen(port, function() {
    console.log('File Encryption Decryption Interface');
});
