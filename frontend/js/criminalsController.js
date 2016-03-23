app.controller('CriminalsController', CriminalsController);


app.factory('Criminal', function($resource) {
  return $resource('http://localhost:3000/criminals/:id'); // Note the full endpoint address
});

function CriminalsController(Criminal){
  var self = this;
  self.all = [];
  self.addCriminal = addCriminal;
  self.newCriminal = {};
  self.deleteCriminal = deleteCriminal;

  var criminals = Criminal.query(function() {
    console.log(criminals);
    self.all = criminals
  });

  function addCriminal(){
    Criminal.save(self.newCriminal, function(){
      self.all.push(self.newCriminal)
      console.log('saved')
    });
  };
  function deleteCriminal(criminal){
    console.log(criminal);
    Criminal.delete({id: criminal._id}, function(){
      var index = self.all.indexOf(criminal);
      self.all.splice(index, 1);
      console.log('deleted')
    });
  }
}
