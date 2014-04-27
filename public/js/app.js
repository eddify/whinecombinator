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

var WhineView = Backbone.View.extend({
  template: "<li><%= username %> -- <%= tweet %></li>",
  render: function() {
    this.$el.html(this.template({
      whines: sample_whines
    }))
  }
});

var view = new WhinesView();

view.setElement('#whines');

view.render();

