// general code

var number_rows;
let game_script;

loadGameScript();

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
    }

       document.getElementById('title').textContent = "Zero + urlParams.get('script');
   
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


function isSolved()
{
    for (let i = 0; i < number_rows.length; i++) {
        for (let j = 0; j < number_rows[i].length; j++) {
            if (number_rows[i][j] !== 0) {
                return false; // If any element is not 0, return false
            }
        }
    }
    return true; // All elements are 0
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
