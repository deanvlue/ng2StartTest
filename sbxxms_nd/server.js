// BASE SETUP
// ===========================
'use strict';

var express = require('express'),
    bodyParser = require('body-parser');
    
var app = express();
app.use(bodyParser());

var env = app.get('env') === 'development' ? 'dev': app.get('env');



var port = process.env.PORT || 8080;

// IMPORTA MODELOS
// ===================================

var Sequelize = require('sequelize');

// db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;


// inicializa la conexión a bd
var sequelize = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    dialect: config.driver,
    loggin: console.log,
    define:{
      timestamps: false
    }
  }
);

var crypto = require('crypto');
var DataTypes = require('sequelize');

var User = sequelize.define('users',{
  username: DataTypes.STRING,
  password: DataTypes.STRING
},{
  instanceMethods:{
    retrieveAll: function(onSuccess, onError){
      User.findAll({}, {raw: true})
        .success(onSuccess)
        .error(onError);
    },
    retrieveById: function(user_id, onSuccess, onError){
      User.find({where:{id: user_id}},{raw:true})
        .success(onSuccess)
        .error(onError);
    },
    add: function(onSuccess, onError){
      var username = this.username;
      var password = this.password;
      
      var shasum = crypto.createHash('sha1');
      shasum.update(password);
      password = shasum.digest('hex');
      
      User.build({username: username, password: password})
        .save()
        .success(onSuccess)
        .error(onError);
    },
    
    updateById: function(user_id, onSuccess, onError){
      var id = user_id;
      var username = this.username;
      var password = this.password;
      
      var shasum = crypto.createHash('sha1');
      shasum.update(password);
      password = shasum.digest('hex');
      
      User.update({username:username, password:password},{ where: { id:id } })
        .success(onSuccess)
        .error(onError);
    },
    
    removeById: function(user_id, onSuccess, onError){
      User.destroy({where: {id: user_id}})
        .success(onSuccess)
        .error(onError);
    }
  }
});

// IMPORT ROUTES
//===========================

var router = express.Router();

// para las rutas de /users
// --------------------------
router.route('/users')

  // agrega un usuario
  .post(function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    var user = User.build({ 
      username: username, 
      password: password
    });
    
    user.add(function(success){
      res.json({message: 'Usuario creado'});
    }, function(err){
      res.send(err);
    });
  })
  // obtiene todos los usuarios
  .get(function(req, res){
    var user = User.build();
    
    user.retrieveAll(function(users){
      if(users){
        res.json(users);
      }else{
        res.send(401, "User not found");
      }
    }, function(error){
       res.send("User Not Found " + error);
    });
  });
  
// para rutas con /users/:user_id
// ---------------------------------
router.route('/users/:user_id')

  // actualiza usuario
  .put(function(req, res) {
    var user = User.build();

    user.username = req.body.username;
    user.password = req.body.password;

    user.updateById(req.params.user_id, function(success) {
      console.log(success);
      if (success) {
        res.json({ message: 'User updated!' });
      } else {
        res.send(401, "User not found");
      }
      }, function(error) {
      res.send("User not found");
      });
  })
  
  // get user by id
  .get(function(req, res) {
    var user = User.build();

    user.retrieveById(req.params.user_id, function(users) {
      if (users) {
        res.json(users);
      } else {
        res.send(401, "User not found");
      }
      }, function(error) {
      res.send("User not found");
      });
  })
  // delete user by id
  .delete(function(req, res) {
    var user = User.build();

    user.removeById(req.params.user_id, function(users) {
      if (users) {
        res.json({ message: 'User removed!' });
      } else {
        res.send(401, "User not found");
      }
      }, function(error) {
      res.send("User not found");
      });
  });
  
// Middleware to use for all requests
router.use(function(req,res, next){
  //do logging
  console.log('Something is happening');
  next();
});


// todas las rutas se prefijan con /api
app.use('/api', router);

//Start the server
app.listen(port);
console.log("Magic happens on port "+ port);