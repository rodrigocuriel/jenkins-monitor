/*!
 * jenkins health monitor
 *
 * author: Rodrigo Curiel
 * Released under the MIT license
 *
 */

var intervaLID;

function getJSONfeed() {
  var url = 'http://founders:8080/api/json?tree=jobs[lastSuccessfulBuild[timestamp],color,buildable,displayName,healthReport[description,score]]';

  $.ajax({
    dataType: "json",
    url: url,
    success: jobsHandler
  });
}

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