
function getNumberOfButtons()
{
    return 2;
}

function getRowCounts()
{
    return [4];
}

function numberAdaptIndex0(number, button_index)
{
    number = mod(number,6);
    if(button_index == 0)
    {
        return applyPermuationAsArray([0,1,2,3],number);
    }
    else
    {
        return applyPermuationAsArray([5,4,3,2],number);
    }
}

function numberAdapt(number, row_index, number_index, button_index)
{ 
    // ignore row_index because we have only one row in this sample
    return mod(numberAdaptIndex0(number+number_index, button_index)-number_index,6);
}



