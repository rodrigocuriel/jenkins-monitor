/*!
 * jenkins health monitor
 *
 * author: Rodrigo Curiel
 * Released under the MIT license
 *
 */

var intervaLID;

function getJSONfeed() {
  var url = 'http://192.168.22.64:8080/api/json?tree=jobs[lastSuccessfulBuild[timestamp],color,buildable,displayName,healthReport[description,score]]';

  $.ajax({
    dataType: "json",
    url: url,
    timeout: 1000,
    success: jobsHandler,
    error: errorHandler
  });
}

function errorHandler(x, t, m) {
  if (t === "timeout") {
    $('.content .status').html("server timeout...");
  } else {
    $('.content .status').html(t);
  }
};

function jobsHandler(data) {
  window.clearInterval(intervaLID);

  var job_obj = data.jobs;
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

  intervaLID = window.setInterval(function() {
    getJSONfeed();
  }, 5000);
};

(function($) {
  window.setTimeout(function() {
    getJSONfeed();
    document.webkitRequestFullscreen;
  }, 300);
})(jQuery);