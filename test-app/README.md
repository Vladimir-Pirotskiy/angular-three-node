# Angular-mongo-express-three-node

###Setup local environment 

1. Install [Node.js](https://nodejs.org/en/download/). Project uses: Node: v14.18.1 and npm: v8.1.3;
2. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/). Project uses: v5.0.4;
3. Install [Angular](https://angular.io/cli) by running: ```npm install -g @angular/cli```. Project uses: v12.2.13.


Change directory to: ```~/angular-three-node/test-app``` and run:

```
run npm install 
```

## Start MongoDB:

### for Ubuntu
```
sudo systemctl start mongod
``` 

##Verify that MongoDB has started successfully:
for Ubuntu
```
sudo systemctl status mongod
```

##Start Node.js server

```
npm run start 
```

##Start Angular server

```
ng serve
```

##To change the Rotation speed use: 

Z-Speed+:
```shfit+```
Z-Speed-:
```shift_```
Y-Speed+:
```shift)```
Y-Speed-:
```shift(```
