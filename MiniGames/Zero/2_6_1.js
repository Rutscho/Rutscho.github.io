
function getNumberOfButtons()
{
    return 2;
}

function getRowCounts()
{
    return [6];
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
    let n1 = number%6;
    let n2 = (number-n1)/6;

    // ignore row_index because we have only one row in this sample
    let r1 = mod(numberAdaptIndex0(n1+number_index, button_index)-number_index,6);
    if(r1 != n1)
    {
        if(button_index==0)
        {
            n2 = applyPermuationAsArray([0,1,2,3],n2);
        }
        else
        {
            n2 = applyPermuationAsArray([1,4,3,5],n2);
        }
    }
    return n2*6+r1;
}



