// general code

var number_rows;
let game_script;

fillGameList();
loadGameScript();

function fillGameList()
{
    var game_list = ["1_1_1","2_1_1","2_2_1","2_2_2",,"2_2_3","2_3_1","2_3_2","2_3_3","2_4_1","2_4_2","2_6_1","2_10_1"];

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
    number_rows = createNumberRows(getRowCounts());

    getGameDiv().innerHtml = "";

    createTable();
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

    let scriptSrc ="";//= "1_1_1.js";
    // Check if the "script" parameter exists
    if (urlParams.has('script')) {
        // Get the value of the "script" parameter
        scriptSrc = urlParams.get('script') + '.js';
        document.getElementById('subtitle').textContent = urlParams.get('script');
    }

       
   
    loadGameScriptXXX(scriptSrc);
}

function createNumberRows(rowCounts) 
{
    var numberRows = [];

    for (var i = 0; i < rowCounts.length; i++) {
        var row = [];
        for (var j = 0; j < rowCounts[i]; j++) {
            row.push(0);
        }
        numberRows.push(row);
    }

    return numberRows;
} 

function createPlayButtons()
{
    let buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    getGameDiv().appendChild(buttonContainer);
    
    for(var button_index = 0; button_index < getNumberOfButtons(); button_index++)
    {
        let button = document.createElement("button");
        button.textContent = "Change " + (button_index + 1);
        button.setAttribute("onclick","buttonClick("+ button_index +")");
        buttonContainer.appendChild(button);
    }

    document.addEventListener('keydown', function(event) {
        // Using event.key to check if the key pressed is a number (0-9)
        if (event.key >= '1' && event.key <= '9') {
            const button_index = parseInt(event.key, 10) -1;
            if(button_index < getNumberOfButtons())
            {
                buttonClick(button_index);
            }
        }
        else if(event.key == 's')
        {
            reset();
        }
        else if(event.key == 'r')
        {
            restart();
        }
    });

}

function createTable() 
{
    let table = document.createElement("table");
    table.id = "numberTable";
    getGameDiv().appendChild(table);
   
    number_rows.forEach(function(number_row) {
        let row = table.insertRow();
        number_row.forEach(function(number) {
            var cell = row.insertCell();
            cell.textContent = number;
        });
    });
}

// Function to fill the table with updated values
function fillTable() {
    let table = document.getElementById("numberTable");
    let rows = table.querySelectorAll("tr");
    rows.forEach(function(row,row_index)
    {
        let cells = row.querySelectorAll("td");
            cells.forEach(function(cell, column_index) {
            cell.textContent = number_rows[row_index][column_index];
        });
    });
    
}

function getAdaptedNumbersForButtonClick(number_rows_param ,button_index)
{
    return number_rows_param.map(function(number_row, row_index) {
        return number_row.map(function(number, number_index) {
            return numberAdapt(number,row_index, number_index, button_index);
        });
    });
}

function adaptNumberForButtonClick(button_index)
{
    number_rows = getAdaptedNumbersForButtonClick(number_rows, button_index);
}

function buttonClick(button_index) {
    adaptNumberForButtonClick(button_index);
    fillTable(); 
}

function reset()
{
    number_rows = number_rows.map(function(number_row) {
        return number_row.map(function(number) {
            return 0;
        });
    });
    fillTable(); 
}


function restart()
{
    reset();
    // just do 500 random moves. should be enough to have a chance to be non-trivial
    // in if its trivial we can simply restart
    for(let i=0;i<500;i++)
    {
        let randomNumber = Math.floor(Math.random() * getNumberOfButtons());
        adaptNumberForButtonClick(randomNumber);
    }

    fillTable(); 
}
