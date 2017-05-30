var express = require('express')
var router = express.Router()

var selectedArea = function (req, area) {
    var areas = req.session.data['areas'] || [];
    
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
   else if (selectedArea(req, 'area-health')) {
       res.redirect('/health/homeless');
   }
   else if (selectedArea(req, 'area-housing')) {
       res.redirect('/housing/homeless');
   }
   else if (selectedArea(req, 'area-money')) {
       res.redirect('/money/');
   }
   else if (selectedArea(req, 'area-networks')) {
       res.redirect('/networks/homeless');
   }
   else if (selectedArea(req, 'area-well-being')) {
       res.redirect('/well-being/homeless');
   }
   else {
       req.session.data['areas'] = [];
       res.redirect('/age');
   }
});

router.post('/employment/in-work', function (req, res) {
  var inWork = req.session.data['employment-in-work'];
   
   if (inWork == 'Yes') {
       res.redirect('/employment/new-skills');
   }
   else {
       res.redirect('/employment/duration');
   }
});

router.post('/employment/end', function (req, res) {
   if (selectedArea(req, 'area-housing')) {
       res.redirect('/housing/homeless');
   }
   else {
       res.redirect('/age');
   }
});

router.post('/housing/homeless', function (req, res) {
  var homeless = req.session.data['housing-homeless'];
   
   if (homeless == 'Yes') {
       res.redirect('/housing/contact');
   }
   else {
       res.redirect('/housing/property-status');
   }
});

router.post('/housing/property-status', function (req, res) {
  var property = req.session.data['housing-property'];
   
   if (property == 'Other' || property == "I am living with family or friends") {
       res.redirect('/housing/move');
   }
   else {
       res.redirect('/housing/arrears');
   }
});

router.post('/housing/advice', function (req, res) {
   if (selectedArea(req, 'area-money')) {
       res.redirect('/money/');
   }
   else {
       res.redirect('/age');
   }
});

router.get('/money/', function (req, res) {
   res.redirect('/age');
});

module.exports = router
