// general code

let shapes;
let orig_shapes;
let game_script;

let animation_time = 500.0; // ms

fillGameList();
loadGameScript();

function fillGameList()
{
    var game_list = ["2_4_1","2_4_2","2_5_1","2_5_2","2_6_1","2_6_2"];

    game_list_div = document.getElementById("game_list");
    game_list_div.innerHTML = "";

    let list = document.createElement('ul');


    // Loop through the items array and create list items
    game_list.forEach(itemText => {
        let listItem = document.createElement('li');
        listItem.innerHTML="<a href=\"?script=" + itemText + "\">"+ itemText+ "</a>";
        list.appendChild(listItem);
    });

    game_list_div.appendChild(list);
}

function finishSetup()
{
    if(game_script == null)
    {
        return;
    }
    shapes = createShapes();
    orig_shapes = shapes;

    getGameDiv().innerHtml = "";

    createCanvas();
    createPlayButtons();
    restart();
}

function getGameDiv()
{
    return document.getElementById("game_div");
}

function loadGameScriptXXX(scriptSrc)
{
    if(game_script != null)
    {
        if(game_script.src === scriptSrc)
        {
            return false;
        }
        game_script.parentNode.removeChild(game_script);
        game_script = null;     
    }

    if(scriptSrc==="")
    {
        return;
    }

    // Load the script
    game_script = document.createElement('script');
    game_script.src = scriptSrc;
    game_script.onload = finishSetup;
    getGameDiv().appendChild(game_script);
}

function loadGameScript()
{
    // Get the parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    let scriptSrc ="";
    // Check if the "script" parameter exists
    if (urlParams.has('script')) {
        // Get the value of the "script" parameter
        scriptSrc = urlParams.get('script') + '.js';
        document.getElementById('subtitle').textContent = urlParams.get('script');
    }

    loadGameScriptXXX(scriptSrc);
}

function createPlayButtons()
{
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    getGameDiv().appendChild(buttonContainer);
    
    for(var button_index = 0; button_index < shapes.getNumberOfButtons(); button_index++)
    {
        let button = document.createElement("button");
        button.textContent = "Change " + (button_index + 1);
        button.setAttribute("onclick","buttonClick("+ button_index +")");
        buttonContainer.appendChild(button);
    }

}

function clearCanvas()
{
    let canvas = document.getElementById('game_canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createCanvas()
{
    let game_div = document.getElementById("game_div");
    let canvas_div = document.createElement("div");
    canvas_div.id = "canvas_div";
    game_div.appendChild(canvas_div);
    let game_canvas = document.createElement("canvas");
    game_canvas.id="game_canvas";
    canvas_div.appendChild(game_canvas);
}

function updateCanvas() {
 
    clearCanvas();
    var canvas = document.getElementById('game_canvas');
    var ctx = canvas.getContext('2d');
    shapes.draw(ctx,true);
    orig_shapes.draw(ctx,false)

}

function adaptShapesLikeForButtonClick(button_index)
{
    shapes.moveByButtonIndex(button_index, false);
}

function buttonClick(button_index) {
    shapes.moveByButtonIndex(button_index, true);
    updateCanvas(); 
}


function reset()
{
    shapes = createShapes();
    updateCanvas(); 
}


function restart()
{
    reset();
    // just do 500 random moves. should be enough to have a chance to be non-trivial
    // in if its trivial we can simply restart
    for(let i=0;i<500;i++)
    {
        let randomNumber = Math.floor(Math.random() *shapes.getNumberOfButtons());
        adaptShapesLikeForButtonClick(randomNumber);
    }

    updateCanvas(); 
}
