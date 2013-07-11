/*!
 * jenkins health monitor
 *
 * author: Rodrigo Curiel
 * Released under the MIT license
 *
 */
var socket = io.connect('http://localhost:3000');
var audio = document.getElementsByTagName("audio")[0];
var intervaLID;

socket.on('someone connected', function() {
  console.log('someone just connected!');
});

socket.on('job', function(data) {
  console.log('received event job');
  var li_name = "li[job_name='" + data.name + "']";
  $(li_name).html('');
  $(li_name).append($('<ul>').text(obj.name).attr('job_name', obj.name));
});

socket.on('jobs', function(data) {
  console.log('received event job list');
  window.clearInterval(intervaLID);
  //$("article").html('');
  var job_obj = JSON.parse(data).jobs;
  //Get the Template from above
  var Source = document.getElementById("jobsTemplate").textContent;

  //Compile the actual Template file
  var Template = Handlebars.compile(Source);

  //Generate some HTML code from the compiled Template
  var HTML = Template({
    jobs: job_obj
  });

  //Replace the body section with the new code.
  $("article").html(HTML);

  /*$('.content').each(function(){
    var cleanedHTML = $(this).html().replace(/\s+/g, " ");
    $(this).html(cleanedHTML);
  });*/

  bespoke.horizontal.from('article', {
    loop: true
  });

  bespoke.on('activate', function(event) {
    if (event.index >= (job_obj.length - 1)) {
      $('[class*="image"]').each(function() {
        var clsName = this.className.match(/\w*image\w*/)[0];
        $(this).removeClass(clsName);
      });
      $('section').addClass('image' + Math.floor(Math.random() * 17));
    }
    if (event.slide.classList.contains('failed')) {
      //  audio.play();
    }
    // Prevent default functionality (for user interaction events only)
    return false;
  });

  /*
  var $selected = $('.failed');
  var $parent = $selected.parent();
  $selected.remove();
  $selected.appendTo($parent);
  */
  intervaLID = window.setInterval(function() {
    bespoke.next();
  }, 5000);
});

socket.on('reload', function() {
  location.reload()
});

(function($) {
  bespoke.horizontal.from('article', {
    loop: true
  });
  window.setTimeout(function() {
    socket.emit('getJobs');
    document.webkitRequestFullscreen;
  }, 3000);
})(jQuery);