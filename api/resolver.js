module.exports = function(req, res) {

  var data = JSON.parse(req.body.params);
  
  // Bad params
  if (!data) {
    res.status(400).send('Invalid params');
    return;
  }

  var html;
  var height = 600;
  var width = 680;

  if (data.twitchType === 'game') {

    html =
      '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> ' +
      '<div class="container">' +
          '<div class="row">' +
              '<a href="https://www.twitch.tv/directory/game/'+ data.name +'" role="button" class="btn btn-primary btn-lg">' +
                  '<img src="' + data.box.medium + '" alt="" height="80" width="80" class="img-rounded">' +
                  '<strong class="text-center"> ' + data.name + ' </strong>' +
                  '<span ' +
                      'class="badge">' +
                      'Popularity: ' + data.popularity +
                  '</span>' +
              '</a>' +
          '</div>' +
      '</div>'

  } else if (data.twitchType === 'channel') {

    html =
      '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"> ' +
      '<div class="container">' +
          '<div class="row">' +
              '<a href="https://www.twitch.tv/'+ data.name +'" role="button" class="btn btn-primary btn-lg">' +
                  '<img src="' + data.logo + '" alt="" height="80" width="80" class="img-rounded">' +
                  '<strong class="text-center"> ' + data.display_name + ' </strong>' +
                  '<span ' +
                      'class="badge">' +
                      'Followers: ' + data.followers +
                  '</span>' +
              '</a>' +
          '</div>' +
      '</div>'  

  } else { //stream

  html = 
    '<iframe ' +
  		  'src="https://player.twitch.tv/?channel=' + data.channel.name + '" ' +
        'height="' + height + '" ' +
        'width="' + width + '" ' +
        'frameborder="0" ' +
        'scrolling="no" ' +
        'allowfullscreen="true"> ' +
    '</iframe>'
  }

  res.json({
    body: html
  });
};