let titles = [];
let texts = [];
let times = [];
let closeds = [];

function showAvailableOptions(childchoose){
    var nodes = document.getElementsByClassName('available-option')[childchoose];
    nodes.style.display = "block";
    document.getElementsByClassName('choose')[childchoose].style.display = "none";
    document.getElementsByClassName('close')[childchoose].style.display = "grid";

}
function closeAvailableOptions(childchoose){
    var nodes = document.getElementsByClassName('available-option')[childchoose];
    nodes.style.display = "none";
    document.getElementsByClassName('choose')[childchoose].style.display = "grid";
    document.getElementsByClassName('close')[childchoose].style.display = "none";
}
function openEditor(){
    document.getElementById('home').style.display = "none";
    document.getElementById('con-sub').style.display = "block";
}

function openTask(nr){
    openEditor();

    document.getElementById('ueber').value = titles[nr];
    document.getElementById('eing').value = texts[nr];

    titles.splice(nr, 1);
    texts.splice(nr, 1);
    times.splice(nr, 1);
    closeds.splice(nr, 1);

    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("texts", JSON.stringify(texts));
    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("closeds", JSON.stringify(closeds));    
}

function closeTask(nr){
    if(closeds[nr] == "false"){
        closeds.splice(nr, 1, "true");
    }
    else{
        closeds.splice(nr, 1, "false");
    }

    localStorage.removeItem("titles");
    localStorage.removeItem("texts");
    localStorage.removeItem("times");
    localStorage.removeItem("closeds");
    
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("texts", JSON.stringify(texts));
    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("closeds", JSON.stringify(closeds));    

    location.reload();
    renderAllTasks();
}

function deleteTask(nr){

    titles.splice(nr, 1);
    texts.splice(nr, 1);
    times.splice(nr, 1);
    closeds.splice(nr, 1);

    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("texts", JSON.stringify(texts));
    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("closeds", JSON.stringify(closeds));    

    location.reload();
    renderAllTasks();
}

function addTask(){
    var title = document.getElementById('ueber').value;
    var text = document.getElementById('eing').value;
    let current = new Date();
    // By default US English uses 12hr time with AM/PM
    let time = current.toLocaleTimeString("en-US");
    titles.push(title);
    texts.push(text);
    times.push(time);
    closeds.push("false");
    if(localStorage.getItem('titles')){
        localStorage.removeItem("titles");
        localStorage.removeItem("texts");
        localStorage.removeItem("times");
        localStorage.removeItem("closeds");
        
        localStorage.setItem("titles", JSON.stringify(titles));
        localStorage.setItem("texts", JSON.stringify(texts));
        localStorage.setItem("times", JSON.stringify(times));
        localStorage.setItem("closeds", JSON.stringify(closeds));    
    }
    else{
        localStorage.setItem("titles", JSON.stringify(titles));
        localStorage.setItem("texts", JSON.stringify(texts));
        localStorage.setItem("times", JSON.stringify(times));
        localStorage.setItem("closeds", JSON.stringify(closeds));    
    }
    titles = JSON.parse(localStorage.getItem("titles"));
    texts = JSON.parse(localStorage.getItem("texts"));
    times = JSON.parse(localStorage.getItem("times"));
    closeds = JSON.parse(localStorage.getItem("closeds"));
    document.getElementById('home').style.display = "block";
    document.getElementById('con-sub').style.display = "none";
    location.reload();
    renderAllTasks();
}

function renderAllTasks(){
        if(localStorage.getItem('titles')){           
            titles = JSON.parse(localStorage.getItem("titles"));
            texts = JSON.parse(localStorage.getItem("texts"));
            times = JSON.parse(localStorage.getItem("times"));
            closeds = JSON.parse(localStorage.getItem("closeds"));

            /*
            console.log(titles);
            console.log(closeds);
            */

        for(var i = 0; i < titles.length; i++){
                if(titles[i] != null){
                document.getElementById("tasks").innerHTML = 
                document.getElementById("tasks").innerHTML
                +'<div id="task" class="task">'
                +'            <div class="title">'+titles[i]+'</div>'
                +'             <div class="tasktodo">'+texts[i]+'</div>'
                +'             <div class="date">Task Created: '+ times[i]+'</div>'
                +'             <div class="options">'
                +'                 <div class="choose" onclick="showAvailableOptions('+i+')">'
                +'                     <span>.</span>'
                +'                     <span>.</span>'
                +'                     <span>.</span>'
                +'                 </div>'
                +'                 <div class="close" onclick="closeAvailableOptions('+i+')">'
                +'                     X'
                +'                 </div>'
                +'                 <div class="available-option">'
                +'                     <div class="opts" onclick="openTask('+i+')">Edit</div>'
                +'                     <div class="opts closeTask" onclick="closeTask('+i+')">Close</div>'
                +'                     <div class="opts" onclick="deleteTask('+i+')">Delete</div>'
                +'                 </div>'
                +'             </div>'
                +'         </div>';
                if(closeds[i] == "true"){
                    document.getElementsByClassName('task')[i].style.backgroundColor = "rgba(212, 73, 73, 0.758)";
                    document.getElementsByClassName('closeTask')[i].innerText = "Open";
                }
            }
        }
    }
}
