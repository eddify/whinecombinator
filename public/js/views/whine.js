App.Views.Whine = Backbone.View.extend({
  tagName: "li",

  initialize: function(options) {
    this.model = options.model;
    this.template = document.querySelector('#whine').content.textContent;
  },

  render: function() {
    this.$el.html(_.template(this.template, this.model.attributes));
    return this;
  }
});
