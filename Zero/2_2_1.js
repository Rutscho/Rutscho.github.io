
function getNumberOfButtons()
{
    return 2;
}

function getRowCounts()
{
    return [2];
}

function numberAdaptIndex0(number, button_index)
{
    number = mod(number,4);
    if(button_index == 0)
    {
        return applyPermuationAsArray([0,1,2],number);
    }
    else
    {
        return applyPermuationAsArray([3,2,1],number);
    }
}

function numberAdapt(number, row_index, number_index, button_index)
{ 
    // ignore row_index because we have only one row in this sample
    return mod(numberAdaptIndex0(number+number_index, button_index)-number_index,4);
}

