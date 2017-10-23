var express = require('express');
var router = express.Router();
var db = require ('../models');


/*==================================EXPRESS ROUTES====================================*/

router.get('/', function(req, res){
    // retrieve all data from food_db
    db.item.findAll({
        where:{
            reserved: false
        }
    }).then(function(data){
        var hbsObject = { hbsObject : data};
        res.render('index', hbsObject)
    }).catch(function(err){
        console.log(err);
    });
});

router.get("/api/:item", function(req, res) {
    if (req.params.item) {
      Item.findAll({
        where: {
          name: req.params.item
        }
      }).then(function(results) {
        res.json(results);
      });
    }
  });

  router.post("/api/new", function(req, res) {
    console.log("Item:");
    console.log(req.body);
    Item.create({
      name: req.body.name,
      category: req.body.category,
      quantity: req.body.quantity,
      expiration: req.body.expiration,
    });
  });

  router.post("/api/delete", function(req, res) {
    console.log("Item:");
    console.log(req.body);
    Item.destroy({
      where: {
        id: req.body.id
      }
    });
  });

  router.post("/api/reserved", function(req, res) {
    console.log("Item:");
    console.log(req.body);
    db.item.update({
      reserved: true,
    },{
      where: {
        id: req.body.id
      }  
    });
  });

  router.get("/api/reserved", function(req, res) {
      db.item.findAll({
        where: {
          reserved: true,
        }
      }).then(function(results) {
        res.json(results);
      });
  });

  // search
  router.get("/search", function(req, res) {
    itemSearch = req.body.item_search;
    db.item.findAll({
      where: { 
        name: itemSearch,
        reserved: false
      }
    }).then(function(data){
        var hbsObject = { hbsObject : data};
        res.render('search', hbsObject)
    }).catch(function(err){
        console.log(err);
    });
});

router.get('/available', function(req, res){
    // retrieve all data from food_db
    db.item.findAll({
        where:{
            reserved: false
        }
    }).then(function(data){
        var hbsObject = { hbsObject : data};
        res.render('available', hbsObject)
    }).catch(function(err){
        console.log(err);
    });
});

router.get('/add', function(req, res){
    // retrieve all data from food_db
    db.item.findAll({
        where:{
            reserved: false
        }
    }).then(function(data){
        var hbsObject = { hbsObject : data};
        res.render('add', hbsObject)
    }).catch(function(err){
        console.log(err);
    });
});

// Export routes for server.js to use.
module.exports = router;