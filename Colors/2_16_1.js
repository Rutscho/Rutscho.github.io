// internal functions


function preCreateShapes()
{
    let shapes = {};

    shapes.getNumberOfButtons = function ()
    {
        return 2;
    };
    function get_perm(button_index)
    {
        if(button_index == 0)
            {
                return[[0,3,6,9],[1,4,7,10],[2,5,8,11]];
            }
            else
            {
                return[[15,12,9,7],[16,13,10,8],[17,14,11,6]];
            }
    }
    shapes.getPositionPermutationForButtonIndex = function(button_index)
    {
       let rv = get_perm(button_index);
       return rv.map(ar =>{
        return ar.map(x =>{return x +18;});
       });
    }
    const colors = [
        '#FF0000', // Red
        '#008000', // Green
        '#0000FF', // Blue
        '#FFFF00', // Yellow
        '#00FFFF', // Cyan
        '#FF00FF', // Magenta
        '#FFA500', // Orange
        '#800080', // Purple
        '#00FF00', // Lime
        '#FFC0CB', // Pink
        '#008080', // Teal
        '#E6E6FA', // Lavender
        '#A52A2A', // Brown
        '#800000', // Maroon
        '#808000', // Olive
        '#000080', // Navy
        '#FFD700', // Gold
        '#40E0D0'  // Turquoise
    ];

    

    shapes.shapes = [];
    colors.forEach(color =>
    {
        shapes.shapes.push(createShape(1.3,color));
    });

    colors.forEach(color =>
    {
        shapes.shapes.push(createShape(0.8,color));
    });

    function loc1(a)
    {
        const d = 0.2;
        let l = {x: 0.5,y:0.5};
        l.x +=  d*Math.cos(a*Math.PI/180);
        l.y +=  d*Math.sin(a*Math.PI/180);
        return l;
    };
    function loc2(a,b)
    {
        const d = 0.2;
        let l = {x: 0.5,y:0.5};
        l.x +=  d*Math.cos(a*Math.PI/180) + d*Math.cos(b*Math.PI/180);
        l.y +=  d*Math.sin(a*Math.PI/180) + d*Math.sin(b*Math.PI/180);
        return l;
    };
    shapes.shape_centers =[
        loc2(150,120),
        loc2(270,240),
        loc2(390,0),

        loc2(90,120),
        loc2(210,240),
        loc2(330,360),

        loc1(90),
        loc1(210),
        loc1(330),

        loc1(150),
        loc1(270),
        loc1(390),

        loc2(150,180),
        loc2(270,300),
        loc2(390,420),

        loc2(210,180),
        loc2(330,300),
        loc2(450,420)
    ];
    

    shapes.shape_centers.push(...shapes.shape_centers);

    shapes.shape_sizes=0.05;

    return shapes;
}


