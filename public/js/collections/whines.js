App.Collections.Whines = Backbone.Collection.extend({
  model: App.Models.Whine,
  url: '/whines',
  comparator: function(model) {
    return -model.get('score');
  }
});

