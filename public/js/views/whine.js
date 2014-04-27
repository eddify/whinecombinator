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
