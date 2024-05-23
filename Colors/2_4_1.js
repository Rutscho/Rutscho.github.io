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
            return[[4,5,6]];
        }
        else
        {
            return[[7,6,5]];
        }
    }

    shapes.shapes = [
        createShape(2.0,'orange'),
        createShape(2.0,'blue'),
        createShape(2.0,'green'),
        createShape(2.0,'purple'),
        createShape(1.0,'orange'),
        createShape(1.0,'blue'),
        createShape(1.0,'green'),
        createShape(1.0,'purple')];

    shapes.shape_centers =[
        {x: 0.25, y: 0.5},
        {x: 0.5, y: 0.25},
        {x: 0.5, y: 0.75},
        {x: 0.75, y: 0.5},
        {x: 0.25, y: 0.5},
        {x: 0.5, y: 0.25},
        {x: 0.5, y: 0.75},
        {x: 0.75, y: 0.5}];

    shapes.shape_sizes=0.05;

    return shapes;
}


