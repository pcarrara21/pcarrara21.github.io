class TxtAnimate{

    constructor(el, toAnimate, period, sequence){
        this.toAnimate = toAnimate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1000;
        this.txt = '';
        this.isDeleting = false;
        this.sequence = sequence;
    }

    tick(){

        let i = this.loopNum % this.toAnimate.length;

        let fullTxt = this.toAnimate[i];

        if (this.isDeleting)
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        else
            this.txt = fullTxt.substring(0, this.txt.length + 1);

        this.el.innerHTML = '<span id="typed" class="wrap">' + this.txt + '</span>';

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

    var sequence = (Math.random() + 1).toString(36).substring(5);
    document.title += ' - ' + sequence;

    var element = document.getElementsByClassName('txt-animate')[0];
    var toAnimate = element.getAttribute('data-animate');
    var period = element.getAttribute('data-period');

    txtAnimation = new TxtAnimate(element, JSON.parse(toAnimate), period, sequence);
    txtAnimation.tick();

    document.addEventListener("keypress", function(event){
        var typed = document.getElementById('typed');
        var charCode = event.keyCode || event.which;
        var charStr = String.fromCharCode(charCode);
        if(charCode != 13)
            typed.innerText += charStr;
    });

    document.addEventListener("keydown", function(event){
        var typed = document.getElementById('typed');
        var charCode = event.keyCode || event.which;
        if(charCode == 8)
            typed.innerText = typed.innerText.substring(0, typed.innerText.length - 1);
        if(charCode == 13 && typed.innerText === sequence)
            makeGithubFall();
    });


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

function makeGithubFall(){
    let github = document.getElementById('github');
    github.className += ' github_fall';
    setTimeout(revealAdditionalInfo, 4000);
}

function revealAdditionalInfo(){
    let additionalInfo = document.getElementById('additionalInfo');
    let info = 'Damn, this site is falling to pieces..</br></br> anyway, since you\'re here ' +
                'you might be interested in knowing something more about myself.';
    let info1 = 'As you can guess I love easter eggs, puzzles, and board games and ' +
                'I think that playing itself it\'s an essential activity in everyday life.';
    let info2 = 'Playing has been the start of human evolution and it\'s a notable feat even in animals: ' +
                'by playing we discover our strenghts and weaknesses and we learn coordination, logic and rational thinking.';
    let info3 = 'The best team is not the one made with the best players, but it\'s the one with the players ' +
                'that know best how to play together.';
    let info4 = 'So if you have arrived here congratulations, here\'s your flag!';
    additionalInfo.style.display = 'block';
    additionalInfo.style.position = 'absolute';
    additionalInfo.style.top = window.outerHeight + 'px';
    additionalInfo.innerHTML = '<p class="content">' + info + '</p><br/><br/>' +
    '<p class="content">' + info1 + '</p><br/><br/>' +
    '<p class="content">' + info2 + '</p><br/><br/>' +
    '<p class="content"><b/>' + info3 + '</b></p><br/><br/>' +
    '<p class="content">' + info4 + '</p><br/><br/>';
}

window.onload = function() {

    init();

    loadQuoteOfTheDay();
};
