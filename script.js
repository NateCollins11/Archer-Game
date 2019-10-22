var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var height = canvas.height
var width = canvas.width
var image = document.createElement('img')
var widthunit = width/20
var heightunit = height/20
var characters = [  
    player = {
        y: height-heightunit*3,
        x: widthunit*6,
        height: heightunit*2,
        width: widthunit*2
    }
]
var keys = []
function upDate() {
    c.fillStyle = 'blue'
    c.fillRect(0,0,width,height/2)
    c.fillStyle = 'green'
    c.fillRect(0,height/2,width,height/2)
    for (i=0; i < characters.length; i++) {
        characters[i] =  new Image();
        characters[i].src = './images/player' + i + ".png"
        console.log(keys)
        console.log(keys[37])
        // var image = document.getElementById(characters[i].image)
        if (keys['37']) {
            console.log('in conditional')
            c.drawImage(characters[1], characters[i].x, characters[i].y,characters[i].width, characters[i].height)
        } else {
            c.drawImage(characters[0], characters[i].x, characters[i].y,characters[i].width, characters[i].height)
        }
            
    }
    setTimeout(() => {
        upDate()   
    }, 2000);
       
    // requestAnimationFrame(upDate)
}

document.addEventListener("keydown", function(event) {
    // keys[event.keyCode] = true
    console.log(keys[event.keyCode])
    keys.push(event.keyCode)
    // if (event.keyCode == '38'){
    //     characters[0].y -= heightunit;
    // }
    // if (event.keyCode == '40') {
    //     characters[0].y += heightunit;
    // }
    // if (event.keyCode == '37'){
    //     characters[0].x -= heightunit;
    // }
    // if (event.keyCode == '39') {
    //     characters[0].x += heightunit;
    // }
})
document.addEventListener("keyup", function(event) {
    keys[event.keyCode] = false
    keys.pop(event.keyCode)
    console.log(keys[event.keyCode])
})

setTimeout(() => {
    upDate()   
}, 3000);

// requestAnimationFrame(upDate)