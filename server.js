var http = require('http')
var url = require('url')
var querystring = require('querystring')

var server = http.createServer(function(req, res){
    var page =  url.parse(req.url).pathname
    var params = querystring.parse(url.parse(req.url).query)

    res.writeHead(200, {"Content-Type": "text/plain"})
    if(page == '/')
        res.write('vous etes a la page d\'acceuil')
    else if(page == '/contact')
        res.write('vous etes a la page de contact')

    else if(page == '/login'){
        if('id' in params && 'login' in params)
            res.write('votre id = '+ params['id'])
        else{
            res.write('Veuillez saisir votre id et login')
        }
    }
    else{
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.write('404 not found')
    }
        
    res.end()
})
server.listen(8080)