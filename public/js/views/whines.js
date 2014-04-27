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
