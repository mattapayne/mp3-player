$(function () {
  var player = new AudioPlayer($(".player"));

  var promise = $.ajax({
    url: "/api/v1/music",
    dataType: "json"
  });

  promise.
    done(function(song) {
      player.initialize(song);
    }).
    fail(function(jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    });
});
