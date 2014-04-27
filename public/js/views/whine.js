App.Views.Whine = Backbone.View.extend({
  tagName: "li",
  events: {
    'click button.upvote': 'upvote'
  },

  upvote: function() {
    this.model.upvote();
  },

  initialize: function(options) {
    this.model = options.model;
    this.template = $('#whine').html();
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(_.template(this.template, this.model.attributes));
    return this;
  }
});
