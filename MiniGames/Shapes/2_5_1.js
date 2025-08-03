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
            return[0,1,2];
        }
        else
        {
            return[4,3,2];
        }
    }
    shapes.getOrientationIncrementForButtonIndexAndPositionIndex = function(button_index, positionIndex)
    {
        return 0;
    }

    


    shapes.shapes = [
        createRegularPolygonShape(3,225,1.0,1.0),
        createRegularPolygonShape(3,255,1.0,1.0),
        createRegularPolygonShape(4,0,1.0,1.0),
        createRegularPolygonShape(3,75,1.0,1.0),
        createRegularPolygonShape(3,45,1.0,1.0)];

    shapes.shape_centers =[
        {x: 0.25, y: 0.25},
        {x: 0.25, y: 0.75},
        {x: 0.5, y: 0.5},
        {x: 0.75, y: 0.25},
        {x: 0.75, y: 0.75}];

    shapes.shape_sizes=0.1;

    return shapes;
}


