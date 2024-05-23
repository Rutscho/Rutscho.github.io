
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    const cloned = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone(obj[key]);
        }
    }
    return cloned;
}

function createRegularPolygonShape(corners, rotation_deg,sizeX,sizeY)
{
    let shape = {};
    shape.getPoints = function()
    {
        let points = [];
        let add_angle = rotation_deg*Math.PI/180;
        for(corner = 0; corner < corners ; corner++)
        {
            points.push({
            x:  sizeX*Math.cos(corner*Math.PI*2/corners + add_angle),
            y:  sizeY*Math.sin(corner*Math.PI*2/corners + add_angle)});
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

function createShapeOrientation(positions)
{
    let orientation = {};
    orientation.position = 0;
    orientation.positions = positions;
    return orientation;
}

function incrementOrientation(orientation,value)
{
    orientation.position +=value;
    if(orientation.position >= orientation.positions)
    {
        orientation.position -= orientation.positions;
    }
}

function interpolateOrientation(i,p,q)
{
    let r = {};
    if(q.position < p.position)
    {
        r.position = (1-i)*(p.position) + i*(q.position+q.positions);
    }
    else
    {
        r.position = (1-i)*p.position + i*q.position;
    }
    r.positions = (1-i)*p.positions + i*q.positions;
    return r;
}


function getOrientationAngle(orientation)
{
    return  orientation.position*Math.PI*2/ orientation.positions;
}



function interpolateXY(i,p,q)
{
    let r = {};
    r.x = (1-i)*p.x + i*q.x;
    r.y = (1-i)*p.y + i*q.y;
    return r;
}


function createShapes()
{
    let shapes = preCreateShapes();
   
    shapes.moveByButtonIndex = function (button_index, user_clicked)
    {
        this.previous_location_indices = deepClone(this.location_indices);
        this.previous_orientations = deepClone(this.orientations);
        
        let positionPerumtation = this.getPositionPermutationForButtonIndex(button_index);
        this.location_indices = applyPermuationAsArrayToArrayOfInts(positionPerumtation,this.location_indices);
        for(let shape_index = 0;shape_index < this.shapes.length;shape_index++)
        {
            let orientation_increment = this. getOrientationIncrementForButtonIndexAndPositionIndex(
                    button_index,this.location_indices[shape_index]);
                incrementOrientation(this.orientations[shape_index],orientation_increment);
        }
        shapes.animation_end = performance.now();
        if(user_clicked)
        {
            shapes.animation_end += animation_time;
        }
    };
   
    shapes.orientations = [];
    shapes.location_indices = [];
    for(let shape_index = 0;shape_index < shapes.shapes.length;shape_index++)
    {
        shapes.orientations.push(createShapeOrientation(360));
        shapes.location_indices.push(shape_index);
    }

   
    shapes.previous_orientations = deepClone(shapes.orientations);
    shapes.previous_location_indices = deepClone(shapes.location_indices);
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
        for(let shape_index = 0;shape_index < this.shapes.length;shape_index++)
        {
            let points = this.shapes[shape_index].getPoints();

            let size = this.shape_sizes;

            points.forEach(point => {
                point.x *=size;
                point.y *=size;
            });
            


            let current_orientation = interpolateOrientation(interpolation_level,
                this.previous_orientations[shape_index],this.orientations[shape_index]);
            let orientation_angle = getOrientationAngle(current_orientation);

            points.forEach(point => {
                let p = deepClone(point);
                point.x = p.x*Math.cos(orientation_angle) + p.y*Math.sin(orientation_angle);
                point.y = -p.x*Math.sin(orientation_angle) + p.y*Math.cos(orientation_angle);
            });

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
                ctx.lineWidth = 5;
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



