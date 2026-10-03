// Main drawing board container.
const container=document.querySelector('.container')

// The user can change the board size through this input.
const sizeIn = document.querySelector('.size')
let size = sizeIn.value

// Toggle button for the canvas background visibility.
const bkgd_toggle = document.querySelector('.background') 

// Background color picker for the canvas area.
const bkgdIn = document.querySelector('.bkgd-color')
let bkgd = bkgdIn.value

// Palette references. Each color button stores a swatch for quick color selection.
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

// Main drawing color input and global controls.
const pen_color= document.querySelector('.pen-color')
const reset_button = document.querySelector('.reset')
const show_grid = document.querySelector('.grid')

// History/state variables:
// - current_stroke stores the cells changed during the current mouse drag.
// - undo_stack stores completed strokes that can be undone.
// - redo_stack stores undone strokes that can be redone.
// - cellStateMap keeps the current color of each grid cell so undo/redo can restore the correct state.
let current_stroke = []
let undo_stack = []
let redo_stack = []
// Tracks a redo from a state that still had undo history.
let redo_used_with_undo_history = false
const cellStateMap = new WeakMap()

// Rendering settings for the grid.
let line = "1px"
let draw = true
let grid = true
let erase= false
let hold = false

// Transparent is treated as a valid empty color, so erasing uses this value.
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


//palette change color by clicking button

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
    hold = true
})

window.addEventListener("mouseup",function(){
    hold = false
    if(current_stroke.length > 0){
        // Start a fresh history after redo; otherwise keep undo history and discard redo.
        if(redo_used_with_undo_history){
            undo_stack = []
            redo_stack = []
        }else{
            redo_stack = []
        }
        undo_stack.push(current_stroke)
        current_stroke = []
        redo_used_with_undo_history = false
    }
})


// Applies either a pen color or transparent eraser color to one grid cell.
// It also stores the cell's previous color so an undo can restore it later.
function paintCell(cell){
    if(!cell) return

    const prevColor = cellStateMap.get(cell) || 'transparent'
    const newColor = draw ? pen_color.value : empty_color

    if(prevColor === newColor) return

    cell.style.backgroundColor = newColor
    cellStateMap.set(cell, newColor)
    current_stroke.push({
        element: cell,
        oldColor: prevColor,
        newColor: newColor
    })
}

// Creates the grid of div elements. Each div represents one pixel cell.
// Every time a user drags over cells, each changed cell is added to current_stroke.
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
            cellStateMap.set(div, 'transparent')

            div.onmousedown = function(){
                hold = true
                current_stroke = []
                paintCell(this)
            }

            div.onmousemove = function(){
                if(!hold) return
                paintCell(this)
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


// Clears the canvas and resets the history stacks.
function reset(){
    container.innerHTML =""
    current_stroke = []
    // A full canvas reset also cancels any pending history reset.
    redo_used_with_undo_history = false
    while(redo_stack.length>0 || undo_stack.length>0){
        redo_stack.pop()
        undo_stack.pop()
    }
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

}) //color9

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


// Keyboard shortcuts:
// - e switches between pencil and eraser modes.
// - 1-9 choose a palette color.
// - z undoes the last completed stroke.
// - r redoes the last undone stroke.
window.addEventListener("keydown",function(event){
    if(event.key=="e"){
       
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

    
    if(event.key=="z" && undo_stack.length>0){
        const stroke = undo_stack.pop()
        redo_stack.push(stroke)

        stroke.forEach(change => {
            change.element.style.backgroundColor = change.oldColor === 'transparent' ? 'transparent' : change.oldColor
            cellStateMap.set(change.element, change.oldColor)
        })
    }

    if(event.key=="r" && redo_stack.length>0){
        // Only arm the fresh-history behavior when undo history also exists.
        if(undo_stack.length > 0){
            redo_used_with_undo_history = true
        }

        const stroke = redo_stack.pop()

        stroke.forEach(change => {
            change.element.style.backgroundColor = change.newColor
            cellStateMap.set(change.element, change.newColor)
        })

        undo_stack.push(stroke)
    }


})


