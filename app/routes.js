var express = require('express')
var router = express.Router()

var selectedArea = function (req, area) {
    var areas = req.session.data['areas'];
    return (areas.indexOf(area) > -1);
};

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here

router.post('/areas', function (req, res) {
   if (selectedArea(req, 'area-employment')) {
       res.redirect('/employment/in-work');
   }
   else {
       res.redirect('/age');
   }
});

router.post('/employment/in-work', function (req, res) {
  var inWork = req.session.data['employment-in-work'];
   
   if (inWork == 'true') {
       res.redirect('/employment/new-skills');
   }
   else {
       res.redirect('/employment/duration');
   }
});

router.post('/employment/new-skills', function (req, res) {
   if (selectedArea(req, 'area-housing')) {
       res.redirect('/housing/homeless');
   }
   else {
       res.redirect('/age');
   }
});

module.exports = router
