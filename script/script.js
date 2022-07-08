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
    document.getElementById('noproblems').style.display = "none";

    document.getElementById('home').style.display = "none";
    document.getElementById('con-sub').style.display = "block";
    document.getElementsByTagName('body')[0].style.overflow = "hidden"; 

}

function openTask(nr){
    openEditor();

    document.getElementById('ueber').value = titles[nr];
    document.getElementById('eing').value = texts[nr];

    titles.splice(nr, 1);
    texts.splice(nr, 1);
    times.splice(nr, 1);
    closeds.splice(nr, 1);

    setItems();  
}

function closeTask(nr){
    if(closeds[nr] == "false"){
        closeds.splice(nr, 1, "true");
    }
    else{
        closeds.splice(nr, 1, "false");
    }

    removeItems();
    
    setItems();

    location.reload();
    renderAllTasks();
}

function deleteTask(nr){

    titles.splice(nr, 1);
    texts.splice(nr, 1);
    times.splice(nr, 1);
    closeds.splice(nr, 1);

    setItems();  

    location.reload();
    renderAllTasks();
}

function addTask(){
    document.getElementById('noproblems').style.display = "none";
    var title = document.getElementById('ueber').value;
    var text = document.getElementById('eing').value;
    document.getElementsByTagName("body")[0].style.overflow = ""; 
    let current = new Date();
    // By default US English uses 12hr time with AM/PM
    let time = current.toLocaleTimeString("en-US");
    if(title.length > 0 ){
        if(text.length > 0 ){
        titles.push(title);
        texts.push(text);
        times.push(time);
        closeds.push("false");
        if(localStorage.getItem('titles')){
            removeItems();
            
            setItems();
        }
        else{
            setItems(); 
        }
        getItems();
        document.getElementById('home').style.display = "block";
        document.getElementById('con-sub').style.display = "none";
        location.reload();
        renderAllTasks();
        }
        else{
            document.getElementById('eing').placeholder = "Please enter an Note";
            document.getElementsByTagName('body')[0].style.overflow = "hidden"; 
        }
    }
    else{
        document.getElementById('ueber').placeholder = "Please enter an title";
        document.getElementsByTagName('body')[0].style.overflow = "hidden"; 
    }
}

function renderAllTasks(){
        let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if(!matched){
            document.documentElement.style.setProperty('--main-color', 'white');
            document.documentElement.style.setProperty('--main-font-color', 'rgba(128, 128, 128, 0.858)');
        }
        if(localStorage.getItem('titles')){           
            getItems();
            
        for(var i = 0; i < titles.length; i++){
            document.getElementById('noproblems').style.display = "none";
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
                    document.getElementsByClassName('task')[i].style.textDecoration = "line-through";
                    document.getElementsByClassName('closeTask')[i].innerText = "Open";
                }
            }
        }
    }
}

function setItems(){
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("texts", JSON.stringify(texts));
    localStorage.setItem("times", JSON.stringify(times));
    localStorage.setItem("closeds", JSON.stringify(closeds));  
}

function getItems(){
    titles = JSON.parse(localStorage.getItem("titles"));
    texts = JSON.parse(localStorage.getItem("texts"));
    times = JSON.parse(localStorage.getItem("times"));
    closeds = JSON.parse(localStorage.getItem("closeds"));
}

function removeItems(){
    localStorage.removeItem("titles");
    localStorage.removeItem("texts");
    localStorage.removeItem("times");
    localStorage.removeItem("closeds");
}