const container=document.querySelector('.container')
const sizeIn = document.querySelector('.size')
let size = sizeIn.value
const bkgd_toggle = document.getElementById('background') 

const bkgdIn = document.querySelector('.bkgd-color')
let bkgd = bkgdIn.value

// const brushSizeIn = document.querySelector('.brush-size')
// let brush = brushSizeIn.value


let undone = false
let redo_clear = true 


const undoIn = document.querySelector('.undo')
const redoIn = document.querySelector('.redo')

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



let pixel_tracker = {'idx': 0}
let undo_stack = []
let redo_stack = []

let recent_colors = []




let horizontal_line = false
let vertical_line = false
let rDiagonal = false
let lDiagonal = false

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



let transparent = false
let on_color 
let name_class

function increaseGrid(size){ //grid size and pen drawing
    if(size>128){
        window.alert("Size only up to 128x128!")
        size=32
    }
    container.style.setProperty('--size',size)

    for(let i=1;i<=size;i++){
        for(let j=1;j<=size;j++){


            const div= document.createElement('div')

            div.id = i //row id name
            div.classList.add(j) //col class name

            console.log(div)
        
            
            

            div.onmousedown = function(){
                if(hold) return //if hold is on 
                if(draw){
                    transparent =false
                    redo_clear = true
                    let curr_color = pen_color.value
                    div.style.backgroundColor = curr_color

                    
                   
                    undo_stack.push(div)


            
                    //  $("div#" + x1 + "." + y1).prevUntil($("div#" + x2 + "." + y2)).css("background-color", curr_color).each(function(){
                    //         undo_stack.push(this)
                    //     })
                    //     $("div#" + x3 + "." + y3).prevUntil($("div#" + x4 + "." + y4)).css("background-color", curr_color).each(function(){
                    //         undo_stack.push(this)
                    //     })
                    
             

             

                 

                  
                    


                    

 
                   
                    
            }

                if(erase){
                    transparent =true
                    div.style.backgroundColor = empty_color
                    undo_stack.push(div)
                    on_color = pen_color.value
      
                }

                
            }


            div.onmousemove = function(){
                if(!hold) return //if hold is off
                if(draw){
                    transparent =false
                    redo_clear = true
                    curr_color = pen_color.value
                    div.style.backgroundColor = curr_color
                    undo_stack.push(div)
 
                     if(horizontal_line==true){
                        // straight line (horizontal)
                        $("div#" + i + "." + j).css("background-color", curr_color).each(function(){
                            j+=1
                            undo_stack.push(this)
                        })
                    }


                    if(rDiagonal ==true){
                             // diagonal(right /)
                        $("div#" + i + "." + j).css("background-color", curr_color).each(function(){
                            j--
                            i++
                            undo_stack.push(this)

                        })
                    }
                    if(lDiagonal==true){
                           //diagonal(left\)
                        $("div#" + i + "." + j).css("background-color", curr_color).each(function(){
                            j++
                            i++
                            undo_stack.push(this)

                        })
                    }

                    if(vertical_line==true){ 
                    // straight line (vertical)
                        $("div#" + i + "." + j).css("background-color", curr_color).each(function(){
                                i+=1
                                undo_stack.push(this)
                        })
                    }

                }
               


                  if(erase){
                    transparent =true
                    div.style.backgroundColor = empty_color
                    undo_stack.push(div)
                    on_color = pen_color.value


                }

            }

            
           
                  container.appendChild(div)

    }   
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
    while(redo_stack.length>0 || undo_stack.length>0 || recent_colors.length>0){
        redo_stack.pop()
        undo_stack.pop()
        recent_colors.pop()
    }
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


// brushSizeIn.addEventListener('change',function(){
//     brush = brushSizeIn.value
//     console.log(brush)
// })



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

//background toggle
let bkgd_on = true

bkgd_toggle.addEventListener('click',function(){
    if(bkgd_on==true){
        container.style.setProperty('--background',empty_color)
        bkgd_on= false
    }else{
        container.style.setProperty('--background',bkgd)
        bkgd_on= true       
    }
})

increaseGrid(size)


window.addEventListener("keydown",function(event){
    if(event.key=="e"){
        rDiagonal=false
        lDiagonal=false
        horizontal_line=false
        vertical_line=false
        if(erase==false){
            container.style.setProperty('--cursor',"url('Eraser.cur'),default")
            draw= false
            erase = true
        }else{
            container.style.setProperty('--cursor',"url('Pencil.cur'),crosshair")
            draw=true
            erase=false
        
        }
    }


    
     if(event.key=="h"){ 
        erase=false
        draw =true
        rDiagonal=false
        vertical_line=false
        lDiagonal=false
       if(horizontal_line==false){
        container.style.setProperty('--cursor',"url('horizontal.cur'),default")

        horizontal_line = true
       }else{
        horizontal_line=false
       }
    }

     if(event.key=="v"){ 
        erase=false
        draw =true
        horizontal_line=false
        rDiagonal=false
        lDiagonal=false
       if(vertical_line==false){
        container.style.setProperty('--cursor',"url('vertical.cur'),default")

        vertical_line = true
       }else{
        vertical_line=false
       }
    }


    
     if(event.key=="m"){ 
        erase=false
        draw =true
        vertical_line=false
        lDiagonal=false
        horizontal_line=false
       if(rDiagonal==false){        
        container.style.setProperty('--cursor',"url('Diagonal2.cur'),default")

        rDiagonal = true
       }else{
        rDiagonal=false
       }
    }

     if(event.key=="n"){ 
        erase=false
        draw =true        
        vertical_line=false
        horizontal_line=false
        rDiagonal=false
       if(lDiagonal==false){        
        container.style.setProperty('--cursor',"url('Diagonal1.cur'),default")


        lDiagonal = true
       }else{
        lDiagonal=false
       }
    }

    if(event.key=="1"){
        pen_color.value = col1

    }
    if(event.key=="2"){
        pen_color.value = col2
    }

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

    
    let curr_color

  

     if(event.key=="z" && undo_stack.length>0){
         
            while(redo_clear == true && redo_stack.length>0){
                redo_stack.pop()   
            }
           redo_clear= false
            
            curr_color = window.getComputedStyle(undo_stack[undo_stack.length-1]).getPropertyValue('background-color')
            // console.log(curr_color)
            if(transparent!=true){
                recent_colors.push(curr_color)
                undo_stack[undo_stack.length-1].style.backgroundColor = empty_color //undo color
                redo_stack.push(undo_stack.pop())
            }else{
                recent_colors.push(empty_color)
                undo_stack[undo_stack.length-1].style.backgroundColor = on_color 
                redo_stack.push(undo_stack.pop())
            }
            
       
        
    }

    if(event.key=="r" && redo_stack.length>0){ 
       
        
            while(redo_clear == true && redo_stack.length>0){
                    redo_stack.pop()   
            }
           redo_clear= false

            redo_stack[redo_stack.length-1].style.setProperty('background-color',recent_colors[recent_colors.length-1])
            undo_stack.push(redo_stack.pop())
            recent_colors.pop()

    }



})

