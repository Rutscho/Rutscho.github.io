
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
            return[0,1,2,3];
        }
        else
        {
            return[5,4,3,2];
        }
    }
    shapes.getOrientationIncrementForButtonIndexAndPositionIndex = function(button_index, positionIndex)
    {
        if(button_index == 0 && positionIndex < 4)
        {
           return 120;
        }
        return 0;
    }
  


    shapes.shapes = [
        createRegularPolygonShape(4,-90,1.0,1.0),
        createRegularPolygonShape(4,-90,1.0,0.7),
        createRegularPolygonShape(5,198,0.5,1.0),
        createRegularPolygonShape(5,108,1.0,0.5),
        createRegularPolygonShape(4,-90,1.0,0.5),
        createRegularPolygonShape(4,-90,1.0,0.3)];

        shapes.shape_centers =[
            {x: 0.25, y: 0.25},
            {x: 0.25, y: 0.75},
            {x: 0.5, y: 0.75},
            {x: 0.5, y: 0.25},
            {x: 0.75, y: 0.25},
            {x: 0.75, y: 0.75}];

    shapes.shape_sizes=0.1;

    return shapes;
}

