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
            return[[0,1,2],[4,5,6,7]];
        }
        else
        {
            return[[2,3,4],[7,8,9,0]];
        }
    }
  

   
    
    const colors = [
        '#FF0000', // Red
        '#008000', // Green
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#00FFFF', // Cyan
        '#FF00FF', // Magenta
        '#FFA500', // Orange
        '#000000', // Purple
        '#00FF00', // Lime
        '#FFC0CB' // Pink
    ];


    

    shapes.shapes = [];
    colors.forEach(color =>
    {
        shapes.shapes.push(createShape(1.3,color));
    });

    function loc1(a)
    {
        const d = 0.2/Math.sqrt(2);
        let l = {x: 0.5,y:0.5};
        l.x +=  d*Math.cos(a*Math.PI/180);
        l.y +=  d*Math.sin(a*Math.PI/180);
        return l;
    };
    function loc2(a,b)
    {
        const d = 0.2/Math.sqrt(2);
        const d2 = 0.2;
        let l = {x: 0.5,y:0.5};
        l.x +=  d*Math.cos(a*Math.PI/180) + d2*Math.cos(b*Math.PI/180);
        l.y +=  d*Math.sin(a*Math.PI/180) + d2*Math.sin(b*Math.PI/180);
        return l;
    };
    shapes.shape_centers =[
        loc1(135),
        loc2(135,60),

        loc1(45),
        loc2(45,-30),
       

        loc1(-45),
        loc2(-45,-90),
        loc2(-135,-90),

        loc1(-135),
        loc2(-135,-180),
        loc2(-225,-180)
    ];


    shapes.shape_sizes=0.05;

    return shapes;
}


