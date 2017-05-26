# nodeProductAPIProject

## Rest APIs for cart actions -

### Setup
1.Install git, heroku, node.js and postman.

2.Take clone of git repository - https://github.com/ArchitRastogi1/nodeProductAPIProject

3.Use command  -> npm run test
    This is for running test case

### Application -
1.The apis are designed using node.js and mongoose (hosted on mlab.com).

2.Mocha and Chai used for writing Integration Tests.

3.Used JWT for authentication (here I am setting cookie using jwt because we have apis without views , otherwise I would have included jwt token in authentication header).

4.Code is deployed on heroku. (https://afternoon-brook-10887.herokuapp.com/)

5.Setup of docker and docker-composer. (https://cloud.docker.com/swarm/architrastogi1/repository/docker/architrastogi1/productapis/general)

### Rest APIs -

login api will set a cookie with jwt token for authentication ( include this cookie in all product apis ).

For running on local - run command->  npm start
Otherwise add these path to heroku url.

1 - POST /users/signup (for registering users)
    requestBody -> {"userEmail":"archit@grr.la","password":"name","name":"archit"}
    headers -> Content-Type : application/json , Accept : application/json

2 - POST /users/login (for login users).
    requestBody -> {"userEmail":"archit@grr.la","password":"name"}
    headers -> Content-Type : application/json , Accept : application/json

3 - POST /api/v1/addProduct (for adding new product)
    requestBody -> {"name":"product1","price":100, "code":"BWNPR"}
    headers -> Content-Type : application/json , Accept : application/json
    cookie

4 - PATCH /api/v1/editProduct (for editing product)
    requestBody -> {"name":"product1x","price":100, "code":"BWNPR"}
    headers -> Content-Type : application/json , Accept : application/json
    cookie

5 - GET /api/v1/viewProduct?code=x  (for listing product)
    cookie

6 - GET /api/v1/viewAllProducts  (for listing all products)
    cookie

7 - DELETE /api/v1/deleteProduct  (for deleting product)
    requestBody -> {"name":"product1x","price":100, "code":"BWNPR"}
    headers -> Content-Type : application/json , Accept : application/json
    cookie


### Models -

User - userId(auto increment), userEmail, password, name, username

Product - code , name, price

### Validations -

All apis - Request data should not be empty.

viewProduct / deleteProduct / editProduct -> product code should not be empty.

addProduct -> product code, price, name should not be empty.

In case of Wrong request data , error message will be sent.
