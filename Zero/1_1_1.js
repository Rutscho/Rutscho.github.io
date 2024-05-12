
function getNumberOfButtons()
{
    return 1;
}

function getRowCounts()
{
    return [1];
}

function numberAdapt(number, row_index, number_index, button_index)
{ 
    return mod(number+1,7);
}



