const container=document.querySelector('.container')
const sizeIn = document.querySelector('.size')
let size = sizeIn.value

const bkgdIn = document.querySelector('.bkgd-color')
let bkgd = bkgdIn.value


//palette
const color1 = document.querySelector('.col1')
const emp1 = document.querySelector('.emp1')

const color2 = document.querySelector('.col2')
const emp2 = document.querySelector('.emp2')

const color3 = document.querySelector('.col3')
const emp3 = document.querySelector('.emp3')

const color4 = document.querySelector('.col4')
const emp4 = document.querySelector('.emp4')

const color5 = document.querySelector('.col5')
const emp5 = document.querySelector('.emp5')

const color6 = document.querySelector('.col6')
const emp6 = document.querySelector('.emp6')

const color7 = document.querySelector('.col7')
const emp7 = document.querySelector('.emp7')

const color8 = document.querySelector('.col8')
const emp8 = document.querySelector('.emp8')

const color9 = document.querySelector('.col9')
const emp9 = document.querySelector('.emp9')

//
const pen_color= document.querySelector('.pen-color')
const reset_button = document.querySelector('.reset')
const show_grid = document.querySelector('.grid')
let pen_default = pen_color.value
const eraser_on = document.querySelector('.eraser')


let line = "1px"
let draw = true
let grid = true
let erase= false
let hold = false

let empty_color = 'transparent'

let col1 ="#FFFFFF"
let col2 ="#000000"
let col3 ="#d41010"
let col4="#2112ab"
let col5= "#e1e811"
let col6= "#04ba32"
let col7= "#e7740f"
let col8 = "#b511e2"
let col9 = "#ea2f90"



window.addEventListener("keydown",function(event){
    if(event.key=="e"){
        if(erase==false){
            container.style.setProperty('--cursor',"default")
            draw= false
            erase = true
        }else{
            container.style.setProperty('--cursor',"crosshair")
            draw=true
            erase=false
            
        }
    }

    if(event.key=="1"){
        pen_color.value = col1

    }
    if(event.key=="2"){1
        pen_color.value = col2
    }11

    if(event.key=="3"){
        pen_color.value = col3
    }
        
    if(event.key=="4"){
        pen_color.value = col4
    }

    if(event.key=="5"){
        pen_color.value = col5
    }

    if(event.key=="6"){
        pen_color.value = col6
    }
    
    if(event.key=="7"){
        pen_color.value = col7
    }
    
    if(event.key=="8"){
        pen_color.value = col8
    }
    
    if(event.key=="9"){
        pen_color.value = col9
    }
    
    
})



//palette change color by clicking color

color1.addEventListener('click', function () {
    pen_color.value = col1
})
color2.addEventListener('click', function () {
    pen_color.value = col2
})
color3.addEventListener('click', function () {
    pen_color.value = col3
})
color4.addEventListener('click', function () {
    pen_color.value = col4
})
color5.addEventListener('click', function () {
    pen_color.value = col5
})
color6.addEventListener('click', function () {
    pen_color.value = col6
})
color7.addEventListener('click', function () {
    pen_color.value = col7
})
color8.addEventListener('click', function () {
    pen_color.value = col8
})
color9.addEventListener('click', function () {
    pen_color.value = col9
})



window.addEventListener("mousedown",function(){
    hold= true
})

window.addEventListener("mouseup",function(){
    hold=false
})







function increaseGrid(size){ //grid size and pen drawing
    if(size>128){
        window.alert("Size only up to 128x128!")
        size=32
    }
    container.style.setProperty('--size',size)
    for(let i=0;i<size*size;i++){
        const div= document.createElement('div')
        div.classList.add('pixel')
    
      

            div.onmousedown = function(){
                if(hold) return //if hold is on a
                if(draw){
                    div.style.backgroundColor = pen_color.value
                }
                if(erase){
                    div.style.backgroundColor = empty_color
                }
            }

            div.onmousemove = function(){
                if(!hold) return //if hold is off
                if(draw){
                    div.style.backgroundColor = pen_color.value
                }
                if(erase){
                    div.style.backgroundColor = empty_color
                }
            }
           
                  container.appendChild(div)

    }   

}


//show grid
function showGrid(){
    if(grid==true){
        line = "1px"
        container.style.setProperty('--line',line)
        grid = false

    }else{
        line= "0px"
        container.style.setProperty('--line',line)
        grid =true
    }
}





function reset(){
    container.innerHTML =""
    increaseGrid(size)
}

bkgdIn.addEventListener("change",function(){
    bkgd = bkgdIn.value
    container.style.setProperty('--background',bkgd)
})

reset_button.addEventListener("click", reset)

show_grid.addEventListener("click",showGrid)


sizeIn.addEventListener('change',function(){
    size = sizeIn.value
    reset()
})



//when clicking button, change property of color to pencolor

emp1.addEventListener('click',function(){
    color1.style.setProperty('--color',pen_color.value)
    col1 = pen_color.value
}) //color1

emp2.addEventListener('click',function(){
    color2.style.setProperty('--color',pen_color.value)
    col2 = pen_color.value
}) //color2
emp3.addEventListener('click',function(){
    color3.style.setProperty('--color',pen_color.value)
    col3 = pen_color.value

}) //color3
emp4.addEventListener('click',function(){
    color4.style.setProperty('--color',pen_color.value)
    col4 = pen_color.value

}) //color4
emp5.addEventListener('click',function(){
    color5.style.setProperty('--color',pen_color.value)
    col5 = pen_color.value

}) //color5
emp6.addEventListener('click',function(){
    color6.style.setProperty('--color',pen_color.value)
    col6 = pen_color.value

}) //color6
emp7.addEventListener('click',function(){
    color7.style.setProperty('--color',pen_color.value)
    col7 = pen_color.value

}) //color7
emp8.addEventListener('click',function(){
    color8.style.setProperty('--color',pen_color.value)
    col8 = pen_color.value

}) //color8
emp9.addEventListener('click',function(){
    color9.style.setProperty('--color',pen_color.value)
    col9 = pen_color.value

}) //color8




increaseGrid(size)

