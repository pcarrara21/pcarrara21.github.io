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

    loadQuoteOfTheDay();

  };

function loadQuoteOfTheDay(){

    fetch('./assets/files/quotes.txt')
    .then(response => response.text().then(data => {

        let quote;
        let nowDate = new Date();
        let startOfYear = new Date(nowDate.getFullYear(), 0 ,0);
        let quoteNum = Math.trunc(((nowDate - startOfYear) / (1000*60*60*24)) % 50);

        if(quoteNum == 50)
            quote = data.substring(data.indexOf('#50') + 3);
        else
            quote = data.substring(data.indexOf('#' + quoteNum) + 1 + quoteNum.toString().length, data.indexOf('#' + (quoteNum + 1)));

        document.getElementById('quote').innerHTML = quote;
    }))
    .catch((error) => {
        console.error('Error retrieving quotes file:', error);
    });

}
