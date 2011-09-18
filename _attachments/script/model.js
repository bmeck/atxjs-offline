TodoItem = Backbone.Model.extend({
    initialize: function initialize() {
      var created = this.get('created');
      this.set({
        created: typeof created !== 'undefined'
          ? created
          : +new Date()
      });
    },
    toJSON: function toJSON() {
      var finished = this.get('finished');
      return {
          id: this.id,
          created: this.get('created'),
          title: this.get('title'),
          description: this.get('description'),
          finished: typeof finished !== 'undefined'
              ? finished
              : undefined
      }
    },
    validate: function validate() {
        return typeof this.created !== 'undefined'
            && typeof this.title === 'string'
            && this.title.length > 0
            && typeof this.description === 'string'
            && this.description.length > 0
    },
    finish: function finish() {
      this.set({
        finished: +new Date()
      });
      //this.save();
    }
}, {
  title: String,
  description: String,
  created: Date,
  finished: Date,
});
TodoList = Backbone.Collection.extend({
  model: TodoItem,
  comparator: function TodoListComparator(todoItem) {
      return todoItem.created;
  }
});
var todoList = new TodoList;
var TodoUI = Backbone.View.extend({
  initialize: function initialize() {
    var self = this;
    this.model.bind('change', function() {
      self.render();
    });
  },
  tagName: 'li',
  template: _.template($('#todoListItemTemplate')[0].innerHTML),
  render: function render() {
    var model = this.model.toJSON();
    model.cid = this.model.cid;
    $(this.el).html(this.template(model));
    return this;
  }
});
var TodoListUI = Backbone.View.extend()
todoListUI = new TodoListUI({
  el: '#todoList'
});
todoList.bind('add', function onNewTodoItem(item) {
  var target = todoListUI.el;
  var view = new TodoUI({model:item});
  var el = view.render().el;
  $(target).append(el);
});
