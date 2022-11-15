var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")
const port = process.env.PORT || 3000;



function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, { "Content-type": "text/css" });
        var fileContents = fs.readFileSync("./style.css", { encoding: "utf8" });
        response.write(fileContents);
        response.end();
    }
}

var news = fs.readFileSync("./news.html");
var collection = fs.readFileSync("./collection.html");

var server = http.createServer(function(request,response){
    css(request, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            // response.write("<h2>Pencarian</h2>");
            // response.write("<p>Anda Mencari : <b>" + keyword + "</b> </p>");
            // response.write("<h3><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
            response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>cari</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <div class="navigasi">
                    <ul>
                        <li><a class="active" href="/">Home</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/collection">Collection</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </div>
                <div class="content" style="background-color: white; background-image: url('https://res.cloudinary.com/dbwxlgscq/image/upload/v1668431325/img_kjwbw2.jpg');">
                    <div class="baris">
                        <div class="kolom-5" align="center">
                            <h1>Halaman ini Sedang Dalam Tahap Pengembangan</h1>
                            <a href='/'>Klik Untuk Kembali</a>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            `);
            response.end();
            
            }
        else{
            fs.readFile("index.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Conten-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data)
            response.end();    
            });
        }
    }
    else if (request.url == '/news'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(news);
        response.end();
    }

    else if (request.url == '/collection'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(collection);
        response.end();
    }
 
 
    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("login.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data)
                return response.end()
            }
        });
    }
    else if (request.url==="/login" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "mahasiswa" && formData.password === "admin"){
                response.writeHead(200,{"Content-Type":"text/html"});
                // response.write("<h2>Selamat Datang Mahasiswa SP 3.2</h2>");
                // response.write("<p>username : "+formData.username+"</p>");
                // response.write("<p>password : "+formData.password+"</p>");
                // response.write("<a href='/'>Kembali</a>");

                response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Profil Diri</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <style>
                            .penampung{
                                background-color: brown;
                                color : white;
                            }
                        </style>
                <body>
                    <div class="navigasi">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/news">News</a></li>
                            <li><a href="/collection">Collection</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a class="active" href="/login">Login</a></li>

                        </ul>
                    <div class="penampung" align="center">
                        
                        <div class="baris"></div>
                            <div class="kolom-8">
                                <h1>Selamat Datang di Halaman Data Diri Anda</h1>
                                <p>Nama Saya Putri Nuria saya Mahasiswa Teknik Informatika di <strong>Banyuwangi</strong> Alamat Rumah Desa Jelun, Kec. Licin Kab Banyuwangi.
                                    Tempat Lahir di Banyuwangi 02 Juni 2002, Hobi Menonton Drama Korea dan Memasak. Cita-Cita Ingin jadi pengusaha yang baik hati dan murah senyum
                                    Menjadi orang yang Tidak Pelit Suka Menolong. Suka marah-marah kepada pacar melihat TIKTOK overthinking akhirnya bertengkar. Nasihat Jangan suka nonton tiktok </p>
                            </div>
                            <div class="kolom-4">
                                <h1>Foto Cantik</h1>
                                <a href="">
                                    <img src="https://res.cloudinary.com/dbwxlgscq/image/upload/v1668479792/pp_j6jluq.png" alt="fotocantik">
                                </a>  
                                <h2>PUTRI NURIA CANTIK JELITA</h2>
                                <p>Happy Birthday Too You</p> 
                                <a href='/'>Kembali Ke Halaman Utama</a>
                            </div>
                    </div>
                    <div class="footer">
                        <i class="cp">
                            <h2>Contact</h2>
                            <p class="cp1">Email : pelukissatusama@gmail.com</p>
                            <p class="cp1">No HP : 081857485008</p>
                        </i>
                    </div>
                    
                </body>
                </html>
                `);
                response.end();
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.end();
            }
        });

    }
});

server.listen(port);
console.log("server Berjalan");
