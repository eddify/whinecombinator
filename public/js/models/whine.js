App.Models.Whine = Backbone.Model.extend({
  defaults: {
    score: 0
  },
  upvote: function() {
    var score = parseInt(this.get('score'));
    $.getJSON('/whines/'+this.get('_id')+'/upvote', function(data){
      this.set('score', score+1);

      // quick hack
      app.whinesView.collection.sort();
      app.whinesView.render();
    }.bind(this));
  }
});
