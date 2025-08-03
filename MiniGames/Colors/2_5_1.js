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
            return[[0,1,2,3],[6,7,8,9]];
        }
        else
        {
            return[[3,4,5,6],[9,10,11,0]];
        }
    }
    const colors = [
        '#FF0000', // Red
        '#008000', // Green
        '#FF00FF', // Blue
        '#000000', // Yellow
        '#000000', // Cyan
        '#000000', // Magenta
        '#000000', // Orange
        '#000000', // Purple
        '#000000', // Lime
        '#000000', // Pink
        '#008080', // Teal
        '#FFA500' // Lavender
    ];

   
    
    // const colors = [
    //     '#FF0000', // Red
    //     '#008000', // Green
    //     '#0000FF', // Blue
    //     '#FFFF00', // Yellow
    //     '#00FFFF', // Cyan
    //     '#FF00FF', // Magenta
    //     '#FFA500', // Orange
    //     '#800080', // Purple
    //     '#00FF00', // Lime
    //     '#FFC0CB', // Pink
    //     '#008080', // Teal
    //     '#E6E6FA' // Lavender
    // ];

    

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
        loc2(135,90),
        loc2(45,90),

        loc1(45),
        loc2(45,0),
        loc2(-45,0),

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


