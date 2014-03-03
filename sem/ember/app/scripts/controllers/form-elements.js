//module.exports.register = function (Handlebars, options) {

  Handlebars.registerHelper("inputText", function(uniqueName, value, label, domClass) {
    
    var _label = '',
        _string = '';
    
    if(label){
      _label += '<label for="'+uniqueName+'">';
      _label += label;
      _label += '</label>';
    }

    _string += '<input type="text" ';
    _string += domClass ? 'class="'+domClass+'"' : '';
    _string += 'id="'+uniqueName+'" name="'+uniqueName+'" ';
    _string += 'value="'+value+'" ';
    _string += '/>';

    return new Handlebars.SafeString(_label + _string);
    
  });

  Handlebars.registerHelper("staticText", function(uniqueName, value, label, domClass) {
    
    var _label = '',
        _string = '';
    
    if(label){
      _label += '<label for="'+uniqueName+'">';
      _label += label;
      _label += '</label>';
    }

    _string += '<input type="text" ';
    _string += domClass ? 'class="'+domClass+'" ' : '';
    _string += 'id="'+uniqueName+'" name="'+uniqueName+'" ';
    _string += 'value="'+value+'" disabled';
    _string += '/>';

    return new Handlebars.SafeString(_label + _string);
    
  });

  Handlebars.registerHelper("selectOption", function(uniqueName, value, label, domClass) {
    
    var _string = '';

    _string += '<option ';
    _string += domClass ? 'class="'+domClass+'" ' : '';
    _string += 'name="'+uniqueName+'" ';
    _string += 'value="'+value+'"';
    _string += '>';
    _string += label ? label : value;
    _string += '</option>';


    return new Handlebars.SafeString(_string);
    
  });

  Handlebars.registerHelper("selectBoxSingle", function(uniqueName,  label, domClass, fn) {
    
    var _label = '',
        _string = '';
    
    if(label){
      _label += '<label for="'+uniqueName+'">';
      _label += label;
      _label += '</label>';
    }

    _string += '<select ';
    _string += domClass ? 'class="'+domClass+'" ' : '';
    _string += 'id="'+uniqueName+'" name="'+uniqueName+'" ';
    _string += '>';
    _string += fn;
    _string += '</select>';

    return new Handlebars.SafeString(_label + _string);
    
  });

  Handlebars.registerHelper("selectBoxMulti", function(uniqueName,  label, domClass) {
    
    var _label = '',
        _string = '';
    
    if(label){
      _label += '<label for="'+uniqueName+'">';
      _label += label;
      _label += '</label>';
    }

    _string += '<select ';
    _string += domClass ? 'class="'+domClass+'" ' : '';
    _string += 'id="'+uniqueName+'" name="'+uniqueName+'" ';
    _string += 'multiple ';
    _string += '>';
    _string += fn;
    _string += '</select>';

    return new Handlebars.SafeString(_label + _string);
    
  });

  Handlebars.registerHelper("inputTextArea", function(uniqueName, value, label, domClass) {
    
    var _label = '',
        _string = '';
    
    if(label){
      _label += '<label for="'+uniqueName+'">';
      _label += label;
      _label += '</label>';
    }

    _string += '<textarea type="text" ';
    _string += domClass ? 'class="'+domClass+'"' : '';
    _string += 'id="'+uniqueName+'" name="'+uniqueName+'" >';
    _string += value;
    _string += '</textarea>';

    return new Handlebars.SafeString(_label + _string);
    
  });

//}