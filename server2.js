const http = require('http');
const url =require('url');

const hostname = '127.0.0.1';
const port = 3000;

const ApiKey = "73f9b0dac47004556036f77d1b2c743e";
const authenticateServiceKey = "e697c1f7255fa71bbebd28aaa61c7b94";
const callbackUrl = "http://127.0.0.1:3000/";
//put  here your personnummer
const pnr = "";


const server = http.createServer((req, res) => {
    var query = require('url').parse(req.url,true).query;
    if (query.grandidsession) {
        console.log(query.grandidsession);  
        const GetSessionUrl = "https://client-test.grandid.com/json1.1//GetSession?sessionid="+query.grandidsession+"&apiKey="+ApiKey+"&authenticateServiceKey="+authenticateServiceKey;
                var GetSessionRequest = require('request');
                GetSessionRequest(GetSessionUrl,function (error, response, body) {
                if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                console.log(obj);
                res.end();   
            }});
    }
    else{
        const FederatedLoginUrl = "https://client-test.grandid.com/json1.1/FederatedLogin?apiKey="+ApiKey+"&authenticateServiceKey="+authenticateServiceKey+"&callbackUrl="+callbackUrl+"&pnr="+pnr;
         var FederatedLoginRequest = require('request');
         FederatedLoginRequest(FederatedLoginUrl,function (error, response, body) {
         if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
               // if you want to try the redirect comment this 4 lines and uncomment the redirectRequest function
               res.statusCode = 301;
               res.setHeader('Content-Type', 'text/plain');
               res.setHeader('Location', obj.redirectUrl);
               res.end(); 
            /*var  redirectRequest = require('request');
                redirectRequest(obj.redirectUrl,function (error, response, body) {
                    console.log('ok')
                        //res.end();    
                });*/           
           }});

    }
    

    
         });
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
