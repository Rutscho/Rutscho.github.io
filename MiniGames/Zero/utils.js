
function mod(number, mod)
{
    return ((number % mod) + mod) % mod;
}

function applyPermuationAsArray(permutation, number)
{
    let index = permutation.indexOf(number);
    if (index !== -1) { // If number is found in permutation
        return (index < permutation.length - 1) ? permutation[index + 1] : permutation[0];
    } else {
        return number; // number not found in permutation
    } 
}

