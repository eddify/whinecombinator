App.Views.Whine = Backbone.View.extend({
  tagName: "li",
  events: {
    'click button.upvote': 'upvote'
  },

  upvote: function() {
    console.log("tesT");
  },

  initialize: function(options) {
    this.model = options.model;
    this.template = $('#whine').html();
  },

  render: function() {
    this.$el.html(_.template(this.template, this.model.attributes));
    return this;
  }
});
