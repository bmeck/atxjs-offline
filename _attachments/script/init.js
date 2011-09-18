$('#addNewItem').button().click(showNewItemDialog);

function onCancel() {
    $(this).dialog('close');
}

function onClose() {
    $('input, textarea', this).val('');
}

function onAdd() {
    //TODO ADD SOME SYNCING
    todoList.add({
        title: $('#newItemTitle',this).val(),
        description: $('#newItemDescription',this).val()
    });
    $(this).dialog('close');
}
$("#todoList").delegate('button', 'click', function() {
  todoList.getByCid(this.form.cid.value).finish();
});
$('#newItem').dialog({
    title: 'Add Item',
    autoOpen: false,
    modal: true,
    buttons: {
        Add: onAdd,
        Cancel: onCancel
    },
    close: onClose
});

function showNewItemDialog() {
    $('#newItem').dialog('open');
}
