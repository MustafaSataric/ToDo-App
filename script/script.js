var bed = false;

function Init(){
   document.getElementById('con-sub').style.display = "";
   document.getElementById('con-sub').style.display = "none";
}

function change(){
    if(bed){
    document.getElementById('side').style.animation = 'showMenu 500ms none';
    setTimeout(hide, 500)
    bed = false;
    }
    else{
        document.getElementById('side').style.animation = 'hideMenu 500ms none';
        document.getElementById('side').style.display = "block";
        bed=true;
    }
}

function hide(){
    document.getElementById('side').style.display = "none";
}