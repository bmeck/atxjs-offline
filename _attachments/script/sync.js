// TODO
// Backbone.sync
// http://documentcloud.github.com/backbone/#Sync

// Should always write to lawnchair.js
// Should remove from lawnchair once verified to have been put on server
// for now just hard code being on/offline for testing
window.app = {online : true};

Backbone.sync = function(method, model, options){
  model.url = "this is a url";
    
    var store = new Lawnchair({ name : "atxjsoffline" }, function (store) {
    if(method == "create" || method =="update"){
        //save to lawnchair
        store.save(model, function() {
          options && options.success && options.success();
        });
        if(window.app.online){
          $.couch.db('atxjsoffline').saveDoc(model, {
            success: function(data){
                store.remove(model.key, function(){ console.log('Model deleted from lawnchair- saved to couch!'); });
              },
            failure: function(data){
                console.log('model failed to save to couch- retaining in lawnchair!');
              }
          });
        }
      }
      else if(method == "read"){
        //get the record
        store.get(model.key, function() {
          options && options.success && options.success();
        });
      }
      else if(method=="delete"){
        //delete the record from couch, wait for success call
        store.destroy(model.key, function() {
          options && options.success && options.success();
        });
      }  
  });

}
