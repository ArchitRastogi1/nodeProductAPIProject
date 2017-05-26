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


| paths | params | methods | description  | response
|---|---|---|---|---|
| `/users/signup` | "userEmail":"archit@grr.la","password":"name","name":"archit"} | POST | register user | {"userId": 115,
  "userEmail": "aaaaa@grr.la","password": "123456","name": "Archit"} |
| `/users/login` | "userEmail":"archit@grr.la" | POST | register user | {"status":401,"message":"Invalid Login Credential"} |
| `/users/login` | "userEmail":"archit@grr.la","password":"name"} | POST | authenticate user | sets cookie |
| `/api/v1/product`  | {"name":"product1","price":100, "code":"BWNPR"} | POST | adds product with given data | {"status": 200, "msg": "Successfully added new product","productCode": "3"} |
| `/api/v1/product`  | {"name":"product1", "code":"BWNPR"} | POST | adds product with given data | {"status": 400, "msg": "Please provide Product Price" |
| `/api/v1/product` | {"price":101, "code":"BWNPR"} | PATCH | edit product | {"status": 200,"msg": "Successfully edited product details"} |
| `/api/v1/product` | {"price":101, "code":"BW"} | PATCH | edit product | {"status": 200,"msg": "Couldn't find product to update"} |
| `/api/v1/product` | code=2 | GET | view product with given product id | {"status": 200,"data": {"code": "2","name": "product1","price": 100}} |
| `/api/v1/product` | code=7 | GET | view product with given product id | {"status": 200,"msg": "Product does not exist"} |
| `/api/v1/viewAllProducts` |  | GET | view all products | {"status": 200,"data": [{"code": "2","name": "product1","price": 100}]} |
| `/api/v1/product` | {"code":"2"} | DELETE | deletes a specific item | {"status": 200,"msg": "Successfully deleted product details"} |
| `/api/v1/product` | {"code":"2"} | DELETE | deletes a specific item | {"status": 200,"msg": "Product does not exist"} |


### Models -

User - userId(auto increment), userEmail, password, name, username

Product - code , name, price

### Validations -

All apis - Request data should not be empty.

viewProduct / deleteProduct / editProduct -> product code should not be empty.

addProduct -> product code, price, name should not be empty.

In case of Wrong request data , error message will be sent.
