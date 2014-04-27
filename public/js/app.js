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

App = {
  Collections: {},
  Models: {},
  Views: {}
}

App.Models.Whine = Backbone.Model.extend({
  upvote: function() {
    
  }
});

App.Collections.Whines = Backbone.Collection.extend({
  model: App.Models.Whine,
  url: '/whines'
});

App.Views.Whine = Backbone.View.extend({
  tagName: "li",

  template: "<%= username %> -- <%= tweet %>",

  initialize: function(options) {
    this.model = options.model;
  },

  render: function() {
    this.$el.html(_.template(this.template, this.model.attributes));
    return this;
  }
});

App.Views.Whines = Backbone.View.extend({
  tagName: "ul",

  initialize: function() {
    this.collection = new App.Collections.Whines();
    this.listenTo(this.collection, 'reset', this.render);
    this.collection.fetch({reset:true});
  },

  render: function() {
    this.$el.html("");
    this.collection.each(function(whine){
      var whineView = new App.Views.Whine({ model: whine });
      this.$el.append(whineView.render().$el);
    }.bind(this));
    return this;
  }
});

$(function() {
  var app = {};
  app.whinesView = new App.Views.Whines();
  $('#container').html(app.whinesView.render().$el);
  window.app = app;
});
