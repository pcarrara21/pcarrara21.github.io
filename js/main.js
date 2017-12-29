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
