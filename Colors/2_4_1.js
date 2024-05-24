// internal functions


function preCreateShapes()
{
    let shapes = {};

    shapes.getNumberOfButtons = function ()
    {
        return 2;
    };
    shapes.getPositionPermutationForButtonIndex = function(button_index)
    {
        if(button_index == 0)
        {
            return[[0,1,2]];
        }
        else
        {
            return[[3,2,1]];
        }
    }

    shapes.shapes = [
        createShape(1.0,'orange'),
        createShape(1.0,'blue'),
        createShape(1.0,'green'),
        createShape(1.0,'purple')];

    shapes.shape_centers =[
        {x: 0.25, y: 0.5},
        {x: 0.5, y: 0.25},
        {x: 0.5, y: 0.75},
        {x: 0.75, y: 0.5},];

    shapes.shape_sizes=0.1;

    return shapes;
}


