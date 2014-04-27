$(function() {
  var app = {};
  app.whinesView = new App.Views.Whines();
  $('#container').html(app.whinesView.render().$el);
  window.app = app;
});
