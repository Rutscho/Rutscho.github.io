
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
    let n1 = number%4;
    let n2 = (number-n1)/4;

    // ignore row_index because we have only one row in this sample
    let r1 = mod(numberAdaptIndex0(n1+number_index, button_index)-number_index,4);
    if(r1 != n1)
    {
        if(button_index == 0)
        {
            n2 = applyPermuationAsArray([0,1],n2);   
        }
    }
    return n2*4+r1;
}



