# The Strangler Pattern

When we have a system that wants to present a unified face to the customer, but have multiple versions of the system to actuall host the pages, we can use a strangler pattern.

The idea is that we set up a simple proxy. This is what the users interact with. The proxy will then forward requests on to the old system or the new system as we choose. We can be as granular as we like with the selection. We can do it based on path, we can do it based on random chance if we want to split test something or canary release it. Etc.

It's quite powerful and not hard to set up.

This repo is a spike demonstrating the principle. To run it, you need to open 3 terminals. 

Terminal 1
`cd old && node index.js`
Terminal 2
`cd new && node index.js`
Terminal 3
`cd proxy && node index.js`

You'll now have 3 servers running on your machine.

Go to `localhost:3000` to check if the "new" system is working properly.

You should see a blue web page called "Main - new"
Click the link to `Features` and you should see a blue page called "Features - new"
Clicking the link back to `Main` will take you back to the blue web page


Go to `localhost:3001` to check if the "old" system is working properly.
You should see a green web page called "Main - old"
Click the link to `Features` and you should see a green page called "Features - old"
Clicking the link back to `Main` will take you back to the green web page

If all that works, next step is to test the proxy.

Go to `localhost:3002` to hit the proxy.
You should see a blue web page called "Main - new"
Click the link to `Features` and you should see a green page called "Features - old"
Clicking the link back to `Main` will take you back to the blue web page

The `./proxy/index.js` file has comments in it explaining how this is done
