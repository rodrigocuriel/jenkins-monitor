String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
};

Handlebars.getTemplate = function(name, callback) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
    $.ajax({
      url: 'scripts/templates/' + name + '.html',
      success: function(data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        }
        Handlebars.templates[name] = Handlebars.compile(data);
      },
      async: false
    });
  }
  return Handlebars.templates[name];
};

Handlebars.registerHelper('ifItemSelected', function(item, block) {
  // lots of logic that determines if item is selected
  var str = item.toLowerCase();
  if ( (str.indexOf("blackberry") && str.indexOf('windows')) >= 0 )  {
    return block.fn(this);
  }
});

Handlebars.registerHelper('changeWord', function() {
  var array_success = [
    'working like a charm',
    'okey dokey',
    'Excelsior!',
    'New Hotness',
    'Rock Solid',
    'Well Done',
    'Excellent',
    'Fantastic',
    'Good Work',
    'Nice!'
  ];
  var array_failure = [
    'not working',
    'fix me !!',
    'failing miserably',
    "It's Jacked",
    'Busted!',
    'No beer for you.',
    'Doh',
    "Help, I'm Broken!",
    "I'm dying over here",
    'This Sucks.',
    'Boooooo',
    'Blame [insert name here]'
  ];
  var array_unknown = ['never executed'];

  var result = array_unknown[Math.floor(Math.random() * array_unknown.length)];

  switch (arguments[0]) {
    case 'blue':
      result = array_success[Math.floor(Math.random() * array_success.length)];
      break;
    case 'red':
      result = array_failure[Math.floor(Math.random() * array_failure.length)];
      break;
    case 'notbuilt':
      result = array_unknown[Math.floor(Math.random() * array_unknown.length)];
      break;
  }
  return result;
});

Handlebars.registerHelper('getStatus', function() {
  var result = 'failed';
  switch (arguments[0]) {
    case 'blue':
      var result = 'success';
      break;
    case 'red':
      var result = 'failed';
      break;
    case 'notbuilt':
      var result = 'failed';
      break;
  }
  return result;
});

Handlebars.registerHelper('trim', function() {
  return arguments[0].trim();
});