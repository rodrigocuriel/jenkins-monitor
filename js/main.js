/*!
 * jenkins health monitor
 *
 * author: Rodrigo Curiel
 * Released under the MIT license
 *
 */

var socket = io.connect('http://localhost:3000');

$(function() {

  socket.on('reload', function() {
    location.reload()
  });

  socket.on('jobs', function(data) {
    $(".cb-slideshow").html('');
    $.each(JSON.parse(data).jobs, function(i, obj) {
      var img_obj = '<li><span>image ' + i + '</span>';
      $('.cb-slideshow').append(img_obj);

      var li_obj = '<li';
      if (obj.color == 'red') {
        li_obj += ' class="failed"';
      }
      li_obj += '><div><h3>' + obj.name + '</h3></div></li>';
      $('.cb-joblist').append(li_obj);
    });

    var $selected = $('.failed');
    var $parent = $selected.parent();
    $selected.remove();
    $selected.appendTo($parent);
  });

  socket.on('job', function(data) {
    var li_name = "li[job_name='" + data.name + "']";
    $(li_name).html('');
    $(li_name).append($('<ul>').text(obj.name).attr('job_name', obj.name));
  });

  socket.on('someone connected', function() {
    $('body').prepend('<p>someone just connected!</p>');
    socket.emit('getJobs');
  });

});