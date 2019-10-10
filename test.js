let floors = 0;
let elevators = [];

/*
 * Initialises App with no of Floors and Elevators
 */
function initApp() {
  floors = parseInt($("#noOfFloors").val())
  let elevatorsVal = parseInt($("#noOfElevators").val())

  if(Number.isInteger(elevatorsVal) && Number.isInteger(floors)) {
    for (let i=0; i<elevatorsVal; i++) {
      elevators.push({
        onFloor: 1,
        moving: false,
        movingTo: '', // UP || DOWN
        open: false,
      })
    }
    renderFloors(floors)
    renderElevators(elevators)
  }
  else {
    alert('invalid inputs')
  }
}
/*
* Renders No of Elevators,
* this func will be used every time when elevators will be rendered
* By Render i mean, wheneven a state of elevator is changed byt the Up || Down button's press
 */
function renderElevators(elevators) {
  for (let i=1; i<=elevators.length; i++) {
    $('#elevators').append(`<ul id="elevator-${i}" class="elevator borders"></ul>`)

    for (let f=1; f<=floors; f++) {
      $('#elevator-'+i).append(`<li class="${elevators[i].onFloor === f ? 'active' : 'not-active' }">${f === 1 ? i : `&nbsp`}</li>`)
    }
  }
}

/*
 * Renders No of floors
 */
function renderFloors(floors) {
  for (let i=1; i<=floors; i++) {
    $('#floors').append(`<li>
                  ${i}
                  <button onclick="moveUp(${i-1})">Up</button>
                  <button onclick="moveDown(${i-1})">Down</button>
                </li>`)
  }
}


function moveUp(elevatorIndex) {
  console.log('moveUp - elevatorIndex - ', floors)
}

function moveDown(elevatorIndex) {
  console.log('moveDown - elevatorIndex - ', elevators)
}
