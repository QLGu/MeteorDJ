Util = {
  extractUrlCode: function(url) {
    //TODO test very basically if is youtube or soundcloud domain at all first?
    //TODO to save processing time

    var extracted;

    var patternYoutube = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var matchYoutube = url.match(patternYoutube);
    if (matchYoutube) {
      extracted = {
        code: matchYoutube[1],
        platform: "youtube"
      };
    }

    //TODO modify regex to make sure it's actually a track
    var patternSoundcloud = /(^https?:\/\/soundcloud\.com\/.*)$/;
    var matchSoundcloud = url.match(patternSoundcloud);
    if (matchSoundcloud) {
      extracted = {
        code: matchSoundcloud[1],
        platform: "soundcloud"
      };
    }

    return extracted;
  }
};
