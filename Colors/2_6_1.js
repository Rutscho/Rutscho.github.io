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
            return[[0,3,6,9],[1,4,7,10],[2,5,8,11],[18,19,20,21]];
        }
        else
        {
            return[[15,12,9,7],[16,13,10,8],[17,14,11,6]];
        }
    }
    const colors = [
        '#FF0000', // Red
        '#000000', // Green
        '#000000', // Blue
        '#FFFF00', // Yellow
        '#000000', // Cyan
        '#000000', // Magenta
        '#FFA500', // Orange
        '#000000', // Purple
        '#000000', // Lime
        '#000000', // Pink
        '#000000', // Teal
        '#000000', // Lavender
        '#000000', // Brown
        '#000000', // Maroon
        '#808000', // Olive
        '#000000', // Navy
        '#000000', // Gold
        '#40E0D0' // Turquoise
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
    //     '#E6E6FA', // Lavender
    //     '#A52A2A', // Brown
    //     '#800000', // Maroon
    //     '#808000', // Olive
    //     '#000080', // Navy
    //     '#FFD700', // Gold
    //     '#40E0D0'  // Turquoise
    // ];

    

    shapes.shapes = [];
    colors.forEach(color =>
    {
        shapes.shapes.push(createShape(1.3,color));
    });

    const minishaper = 0.6;
    shapes.shapes.push(createShape(minishaper,'#008000'));
    shapes.shapes.push(createShape(minishaper, '#000000'));
    shapes.shapes.push(createShape(minishaper, '#000000'));
    shapes.shapes.push(createShape(minishaper, '#000000'));

    function loc0(a)
    {
        const d = 0.05;
        let l = {x: 0.5,y:0.5};
        l.x +=  d*Math.cos(a*Math.PI/180);
        l.y +=  d*Math.sin(a*Math.PI/180);
        return l;
    };

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
        const d2 = 0.2;
        let l = {x: 0.5,y:0.5};
        l.x +=  d*Math.cos(a*Math.PI/180) + d2*Math.cos(b*Math.PI/180);
        l.y +=  d*Math.sin(a*Math.PI/180) + d2*Math.sin(b*Math.PI/180);
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
        loc2(450,420),

        loc0(45),
        loc0(135),
        loc0(225),
        loc0(315)
    ];


    shapes.shape_sizes=0.05;

    return shapes;
}


