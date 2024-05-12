
function getNumberOfButtons()
{
    return 2;
}

function getRowCounts()
{
    return [1];
}

function numberAdapt(number, row_index, number_index, button_index)
{ 
    let add = button_index == 0 ? 5 : 7;
    return mod(number+add,15);
}



