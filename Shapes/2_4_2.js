
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
            return[3,2,1];
        }
    }
    shapes.getOrientationIncrementForButtonIndexAndPositionIndex = function(button_index, positionIndex)
    {
        if(button_index == 0 && positionIndex < 3)
        {
           return 180;
        }
        return 0;
    }
  


    shapes.shapes = [
        createRegularPolygonShape(3,-90,1.0,1.0),
        createRegularPolygonShape(3,-90,1.0,0.7),
        createRegularPolygonShape(3,-90,1.0,0.5),
        createRegularPolygonShape(3,-90,1.0,0.3)];

    shapes.shape_centers =[
        {x: 0.25, y: 0.5},
        {x: 0.5, y: 0.75},
        {x: 0.5, y: 0.25},
        {x: 0.75, y: 0.5}];

    shapes.shape_sizes=0.1;

    return shapes;
}

