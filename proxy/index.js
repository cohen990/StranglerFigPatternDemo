var http = require('http');

// Start our proxy running on `localhost:3002`
http.createServer(onRequest).listen(3002);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url);

  /* The "new" version of the site is hosted on port 3000
   * We set up the proxy options for it here
  */
  var new_options = {
    hostname: 'localhost',
    port: 3000,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };
  // Similarly, we set up the proxy to the "old" site here
  var old_options = {
    hostname: 'localhost',
    port: 3001,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

  var proxy_options = new_options

  // We can direct each path to go to a different server by switching up the proxy based on the path of the rquest
  if (client_req.url == "/features") {
    proxy_options = old_options
  }

  /* Here we just pass the response of our own http request `res` 
   * into the response of the client request `client_res`.
   * Once all the data has been sent, the pipe is closed and we can end the response
  */
  var proxy = http.request(proxy_options, function (res) {
    client_res.writeHead(res.statusCode, res.headers)
    res.pipe(client_res, {
      end: true
    });
  });

  // i don't know what this does :D
  client_req.pipe(proxy, {
    end: true
  });
}
