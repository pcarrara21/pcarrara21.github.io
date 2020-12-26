class TxtAnimate{

    constructor(el, toAnimate, period){
        this.toAnimate = toAnimate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1000;
        this.txt = '';
        this.isDeleting = false;
    }

    tick(){

        let i = this.loopNum % this.toAnimate.length;

        let fullTxt = this.toAnimate[i];

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

        let stop = (this.loopNum == (this.toAnimate.length -1));

        if(!(stop && this.isDeleting)){
            setTimeout(function(){that.tick();}, delta);
        }
    }
}

function init(){

    var element = document.getElementsByClassName('txt-animate')[0];

    var toAnimate = element.getAttribute('data-animate');
    var period = element.getAttribute('data-period');

    txtAnimation = new TxtAnimate(element, JSON.parse(toAnimate), period);
    txtAnimation.tick();

}

function loadQuoteOfTheDay(){

    fetch('./assets/files/quotes.txt')
    .then(response => response.text().then(data => {

        let quote;
        let nowDate = new Date();
        let startOfYear = new Date(nowDate.getFullYear(), 0 ,0);
        let quoteNum = Math.trunc(((nowDate - startOfYear) / (1000*60*60*24)) % 50);

        if(quoteNum == 0)
            quote = data.substring(data.indexOf('#50') + 3);
        else
            quote = data.substring(data.indexOf('#' + quoteNum) + 1 + quoteNum.toString().length, data.indexOf('#' + (quoteNum + 1)));

        document.getElementById('quote').innerHTML = quote;
    }))
    .catch((error) => {
        console.error('Error retrieving quotes file:', error);
    });

}

window.onload = function() {

    init();

    loadQuoteOfTheDay();

};
