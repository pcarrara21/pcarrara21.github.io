var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 1000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {

    let i = this.loopNum % this.toRotate.length;

    let fullTxt = this.toRotate[i];

    if (this.isDeleting)
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    else
        this.txt = fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 180 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {

        delta = this.period;
        this.isDeleting = true;

    } else if (this.isDeleting && this.txt === '') {

        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    let stop = (this.loopNum == (this.toRotate.length -1));

    if(!(stop && this.isDeleting)){
        setTimeout(function(){that.tick();}, delta);
    }
  };

  window.onload = function() {

    var elements = document.getElementsByClassName('txt-rotate');

    for (var i = 0; i < elements.length; i++){

        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');

        if(toRotate)
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }

    //Would have used Fetch API b
    fetch('./assets/files/quotes.txt')
        .then(data => console.log(data));

  };

function onHover(id){
    switch(id){
        case "circle1":
            $("#github_img").attr('src', 'assets/git1.png');
            document.getElementById("github").style.visibility = 'visible';
            break;
        case "circle2":
            $("#salesforce_img").attr('src', 'assets/salesforce1.png');
            document.getElementById("salesforce").style.visibility = 'visible';
            break;
        case "circle3":
            $("#linkedin_img").attr('src', 'assets/linkedin1.png');
            document.getElementById("linkedin").style.visibility = 'visible';
            break;
    }
}

function onOut(id){
    switch(id){
        case "circle1":
            $("#github_img").attr('src', 'assets/git.png');
            document.getElementById("github").style.visibility = 'hidden';
            break;
        case "circle2":
            $("#salesforce_img").attr('src', 'assets/salesforce.png');
            document.getElementById("salesforce").style.visibility = 'hidden';
            break;
        case "circle3":
            $("#linkedin_img").attr('src', 'assets/linkedin.png');
            document.getElementById("linkedin").style.visibility = 'hidden';
            break;
    }
}
