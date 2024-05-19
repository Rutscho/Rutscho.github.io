// internal functions

function createRegularPolygonShape(corners, rotation_deg, size)
{
    let shape = {};
    shape.getPoints = function()
    {
        let points = [];
        let add_angle = rotation_deg*Math.PI/180;
        for(corner = 0; corner < corners ; corner++)
        {
            points.push({
            x:  size*Math.cos(corner*Math.PI*2/corners + add_angle),
            y:  size*Math.sin(corner*Math.PI*2/corners + add_angle)});
        }
        return points;
    }
    return shape;
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

function applyPermuationAsArrayToArrayOfInts(permutation, location_indices)
{
    return location_indices.map(element=>
        {
         return applyPermuationAsArray(permutation,element);
        }
    );
}

function interpolateXY(i,p,q)
{
    let r = {};
    r.x = (1-i)*p.x + i*q.x;
    r.y = (1-i)*p.y + i*q.y;
    return r;
}

// functions for the game
function getNumberOfButtons()
{
    return 2;
}

function getShapes()
{
    let shapes = {};
    shapes.moveByButtonIndex = function (button_index, user_clicked)
    {
        this.previous_location_indices = [...this.location_indices];
        if(button_index == 0)
        {
           
            this.location_indices = applyPermuationAsArrayToArrayOfInts([0,1,2],this.location_indices);
        }
        else
        {
            this.location_indices = applyPermuationAsArrayToArrayOfInts([3,2,1],this.location_indices);
        }
        shapes.animation_end = performance.now();
        if(user_clicked)
        {
            shapes.animation_end += animation_time;
        }
    };

    shapes.shapes = [
        createRegularPolygonShape(3,180,0.1),
        createRegularPolygonShape(3,270,0.1),
        createRegularPolygonShape(3,90,0.1),
        createRegularPolygonShape(3,0,0.1)];

    shapes.shape_centers =[
        {x: 0.25, y: 0.5},
        {x: 0.5, y: 0.25},
        {x: 0.5, y: 0.75},
        {x: 0.75, y: 0.5}];

    shapes.location_indices = [0,1,2,3];
    shapes.previous_location_indices = [0,1,2,3];
    shapes.animation_end = 0;// assume our last transition was made


    shapes.draw = function(ctx, fill)
    {
        let now = performance.now();
        let interpolation_level = 1.0;
        let request_next_animation_frame = false;
        if(now < shapes.animation_end)
        {
            interpolation_level = 1-(shapes.animation_end -now)/animation_time;
            request_next_animation_frame = true;
        }
        for(let shape_index = 0;shape_index < 4;shape_index++)
        {
            let points = this.shapes[shape_index].getPoints();
            let previous_center = this.shape_centers[this.previous_location_indices[shape_index]];
            let current_center = this.shape_centers[this.location_indices[shape_index]];
            let center = interpolateXY(interpolation_level, previous_center,current_center);

            points.forEach(point => {
                point.x = point.x + center.x;
                point.y = point.y + center.y;
            });

            ctx.beginPath();
            ctx.moveTo(points[0].x*ctx.canvas.width, points[0].y*ctx.canvas.height);
            for (let i = 1; i < points.length; i++) 
            {
                ctx.lineTo(points[i].x*ctx.canvas.width, points[i].y*ctx.canvas.height);
            }   
            ctx.closePath();

            if(fill)
            {
                ctx.fillStyle = 'grey';
                ctx.fill();
            }
            else
            {
                // Draw the polygon border
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            
           
            
        }
        
        
        if(request_next_animation_frame)
        {
            requestAnimationFrame(updateCanvas);
        }
    }

    return shapes;
}



