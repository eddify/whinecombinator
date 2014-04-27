var sample_whines = [{
  username: 'Kayvon Fatehi',
  tweet: 'whine, bitch, complain, and more whining!'
}, {
  username: 'Marcio Barbosa',
  tweet: 'whine, whine, bitch, whine!'
}, {
  username: 'Eddy Kim',
  tweet: 'whine, whine, I dont whine too much!'
}];

var WhinesCollection = Backbone.Collection.extend({
  
});

var WhinesView = Backbone.Collection.extend({
  
});

var view = new WhinesView();

view.setElement('#whines');
