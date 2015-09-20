(function(w) {
  var player = function(element) {
    var _player = this;
    this.wrapper = element;
    this.jQueryElement = element.find("audio");
    this.audioElement = this.jQueryElement.get(0);
    this.playButton = element.find(".play-btn");
    this.stopButton = element.find(".stop-btn");
    this.progressBar = element.find(".progress");

    this.audioElement.ontimeupdate = function() {
      _player.update_progress();
    };

    this.playButton.on("click", function(e) {
      e.preventDefault();
      _player.play();
    });

    this.stopButton.on("click", function(e) {
      e.preventDefault();
      _player.stop();
    });
  };

  player.prototype.initialize = function(song) {
    this.jQueryElement.attr("src", song.url);
    this.audioElement.load();
  };

  player.prototype.update_progress = function() {
    this.progressBar.text(this.audioElement.currentTime);
  };

  player.prototype.play = function() {
    this.audioElement.play();
  };

  player.prototype.stop = function() {
    this.audioElement.pause();
  };

  w.AudioPlayer = player;
})(window);

$(function () {
  var player = new AudioPlayer($(".audio-player"));

  var promise = $.ajax({
    url: "/api/v1/music",
    dataType: "json"
  });

  promise.then(function(song) {
    player.initialize(song);
  });
});
