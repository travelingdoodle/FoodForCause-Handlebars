/*==================================Dependencies====================================*/

var express = require('express');
var router = express.Router();
var db = require('../models');


/*==================================EXPRESS ROUTES====================================*/

// Populates index.hbs
router.get('/', function (req, res) {
    // retrieve all data from food_db
    db.item.findAll({
        where: {
            reserved: false
        }
    }).then(function (data) {
        var hbsObject = { hbsObject: data };
        res.render('index', hbsObject)
        console.log("`/` router working for index");
    }).catch(function (err) {
        console.log(err);
    });
});

// Takes id of reserved item and changes status in db.items
router.put("/api/:id", function (req, res) {
    console.log("reserved button got hit, dawg");
    if (req.params.id) {
        db.item.update({
            reserved: true
        }, {
            where : {
                id: req.params.id
            }
        }).then(function (results) {
            res.redirect('back');
        }).catch(function(err){
            console.log(err);
        });
    }
});

// creates a new item in the database table Item 
router.post("/api/new", function (req, res) {
    console.log("Item:");
    console.log(req.body);
    Item.create({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        expiration: req.body.expiration,
    });
});

// TESTED & Working to change items to reserved
router.post("/api/reserved", function (req, res) {
    console.log("Item:");
    console.log(req.body);
    db.item.update({
        reserved: true,
    }, {
            where: {
                id: req.body.id
            }
        });
});

// populates reserved.hbs. | used in the admin view
router.get("/api/reserved", function (req, res) {
    db.item.findAll({
        where: {
            reserved: true,
        }
    }).then(function (results) {
        res.json(results);
    });
});

// Populates search.hbs
router.get("/search", function (req, res) {
    res.render('search');
    console.log("search route working");
});

// Searches based on what is input into the form action=newSearch in search.hbs
router.post("/newSearch", function (req, res) {
    itemSearch = req.body.userSearch;
    console.log(itemSearch + "2");
    db.item.findAll({
        where: {
            name: itemSearch,
            reserved: false
        }
    }).then(function (data) {
        console.log(data);
        var hbsObject = { item: data };
        res.render('search', hbsObject)
    }).catch(function (err) {
        console.log(err);
    });
});

router.get('/available', function (req, res) {
    // retrieve all data from food_db
    db.item.findAll({
        where: {
            reserved: false
        }
    }).then(function (data) {
        console.log("available items" + data);
        var hbsObject = { item: data };
        res.render('available', hbsObject)
    }).catch(function (err) {
        console.log(err);
    });
});

// MIGHT BE ABLE TO SHORTEN THIS, because we don't NEED TO get that data...
// ********** LOOK @ /search **********
router.get('/add', function (req, res) {
    // retrieve all data from food_db
    db.item.findAll({
        where: {
            reserved: false
        }
    }).then(function (data) {
        var hbsObject = { hbsObject: data };
        res.render('add', hbsObject)
        console.log("`/add` router working");
    }).catch(function (err) {
        console.log(err);
    });
});

//router post for ./add
router.post("/add/new", function (req, res) {
    console.log("Item:");
    console.log(req.body);
    db.item.create({
        name: req.body.name,
        category: req.body.category,
        quantity: req.body.quantity,
        expiration: req.body.expiration,
    }).then(function (data) {
        res.redirect('/add');
    }).catch(function (err) {
        console.log(err);
    });
});

router.get("/about", function (req, res) {
    res.render('about');
    console.log("search route working");
});

// Creates /register route
router.get("/register", function(req, res) {
    res.render("register");
    console.log("register route working");
  });

// rout works, user table not yet made
router.post("/register", function(req, res) {
    db.User.register(new db.User({username: req.body.username}), req.body.password, function(err, user) {
      if(err) {
        req.flash("error", err.message);
        return res.redirect("/register");
      }
      passport.authenticate("local")(req, res, function() {
        req.flash("success", "Welcome to Food For Cause " + user.username);
        res.redirect("/search");
      });
    });
});

// Export routes for server.js to use.
module.exports = router;