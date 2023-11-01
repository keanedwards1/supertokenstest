const http = require('http');
const SuperTokens = require('supertokens-web-js');
const Session = require('supertokens-web-js/recipe/session');
const ThirdPartyPasswordless = require('supertokens-web-js/recipe/thirdpartypasswordless');

const port = 3000;

// Initialize SuperTokens
SuperTokens.init({
    appInfo: {
        apiDomain: "http://127.0.0.1:3000",
        apiBasePath: "api/auth",
        appName: "1.1",
    },
    recipeList: [
        Session.init(),
        ThirdPartyPasswordless.init(),
    ],
});

const server = http.createServer(async (req, res) => {
  // Set the response header
  res.setHeader('Content-Type', 'application/json');

  // Handle SuperTokens routes
  if (await SuperTokens.middleware(req, res)) {
    return;
  }

  // Define a sample endpoint for /api/hello
  if (req.method === 'GET' && req.url === '/api/hello') {
    const responseJson = JSON.stringify({ message: 'Hello, world!' });

    // Send the JSON response
    res.writeHead(200);
    res.end(responseJson);
  } else if (req.method === 'GET' && req.url === '/api/auth') {
    // Define a sample endpoint for /api/auth
    const responseJson = JSON.stringify({ message: 'Authentication route!' });

    // Send the JSON response
    res.writeHead(200);
    res.end(responseJson);
  } else {
    // Handle other routes or methods with a 404 response
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
