(function() {
  this.onHover = function(id) {
    switch (id) {
      case 'circle1':
        $('#github_img').attr('src', 'assets/github.png');
        document.getElementById('github').style.visibility = 'visible';
        break;
      case 'circle2':
        $('#mail_img').attr('src', 'assets/github.png');
        document.getElementById('mail').style.visibility = 'visible';
        break;
      case 'circle3':
        $('#linkedin_img').attr('src', 'assets/github.png');
        document.getElementById('linkedin').style.visibility = 'visible';
    }
  };

  this.onOut = function(id) {
    switch (id) {
      case 'circle1':
        $('#github_img').attr('src', 'assets/git1.png');
        document.getElementById('github').style.visibility = 'hidden';
        break;
      case 'circle2':
        $('#mail_img').attr('src', 'assets/mail.png');
        document.getElementById('mail').style.visibility = 'hidden';
        break;
      case 'circle3':
        $('#linkedin_img').attr('src', 'assets/linkedin.png');
        document.getElementById('linkedin').style.visibility = 'hidden';
    }
  };

}).call(this);
