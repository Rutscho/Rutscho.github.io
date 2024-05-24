
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

function createShape(size, color)
{
    let shape = {};
    shape.size = size;
    shape.color = color;
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


function createShapes()
{
    let shapes = preCreateShapes();
   
    shapes.moveByButtonIndex = function (button_index, user_clicked)
    {
        this.previous_location_indices = deepClone(this.location_indices);
        
        let positionPerumtation = this.getPositionPermutationForButtonIndex(button_index);
        positionPerumtation.forEach(perm =>
            {
                this.location_indices = applyPermuationAsArrayToArrayOfInts(perm,this.location_indices);
            });
        
      
        shapes.animation_end = performance.now();
        if(user_clicked)
        {
            shapes.animation_end += animation_time;
        }
    };
   
    shapes.location_indices = [];
    for(let shape_index = 0;shape_index < shapes.shapes.length;shape_index++)
    {
        shapes.location_indices.push(shape_index);
    }

   
    shapes.previous_location_indices = deepClone(shapes.location_indices);
    shapes.animation_end = 0;// assume our last transition was made



    shapes.draw = function(ctx)
    {
        let now = performance.now();
        let interpolation_level = 1.0;
        let request_next_animation_frame = false;
        if(now < shapes.animation_end)
        {
            interpolation_level = 1-(shapes.animation_end -now)/animation_time;
            request_next_animation_frame = true;
        }

        // draw background areas
        for(let shape_index = 0;shape_index < this.shapes.length;shape_index++)
        {
            let shape = this.shapes[shape_index];
            let size = this.shape_sizes * shape.size;            
            let center = this.shape_centers[shape_index];

            let radius = Math.min(ctx.canvas.width,ctx.canvas.height)*size;
            ctx.beginPath();
            ctx.arc(center.x*ctx.canvas.width, (1-center.y)*ctx.canvas.height, radius, 0, 2 * Math.PI);
            ctx.closePath();

            if(shape.color !== '#000000')
            {
                ctx.fillStyle = shape.color;
                ctx.fill();
            }

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.stroke();
        }
        const inner_size_factor = 0.6;
        for(let shape_index = 0;shape_index < this.shapes.length;shape_index++)
        {
            let shape = this.shapes[shape_index];
            if(shape.color === '#000000') // dont draw black
            {
                continue;
            }
            

            let size = this.shape_sizes * shape.size;
            
            let previous_center = this.shape_centers[this.previous_location_indices[shape_index]];
            let current_center = this.shape_centers[this.location_indices[shape_index]];
            let center = interpolateXY(interpolation_level, previous_center,current_center);

          
            let radius = Math.min(ctx.canvas.width,ctx.canvas.height)*size*inner_size_factor;
            ctx.beginPath();
            ctx.arc(center.x*ctx.canvas.width, (1-center.y)*ctx.canvas.height, radius, 0, 2 * Math.PI);
            ctx.closePath();

            
            ctx.fillStyle = shape.color;
            ctx.fill();

            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.stroke();
        }
        
        
        if(request_next_animation_frame)
        {
            requestAnimationFrame(updateCanvas);
        }
    }

    return shapes;
}



