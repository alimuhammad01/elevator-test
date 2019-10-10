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
    console.log('elevators - ', elevators)
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
      $('#elevator-'+i).append(`<li class="${elevators[i-1].onFloor === f ? 'active' : 'not-active' }">${f === 1 ? i : `&nbsp`}</li>`)
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
                  <button onclick="moveUp(${i})">Up</button>
                  <button onclick="moveDown(${i})">Down</button>
                </li>`)
  }
}


function moveUp(floorIndex) {
  let elevator = prioritizeElevator(floorIndex);
  if(!elevator) {
    alert('Elevator already present!')
  }
  console.log('moveUp - floorIndex - ', floorIndex)
}

function moveDown(floorIndex) {
  let elevator = prioritizeElevator(floorIndex);
  if(!elevator) {
    alert('Elevator already present!')
  }
  console.log('moveDown - floorIndex - ', floorIndex)
}


/*
 * Defining Rules for prioritizing Elevator's Selection.
 * 1: It should be CLOSEST one to the the called floor
 * 2: If elevator is already present on the same Floor it is called from show ALERT
 */
function prioritizeElevator(floor) {
  let closest = {floor: Infinity, key: 0}, stepsAway, elevator;
  for(let index = 0; index < elevators.length; index++) {
    elevator = elevators[index];
    if(elevator.onFloor === floor) {
      return false
    }
    stepsAway = elevator.onFloor - floor
    if(Math.abs(stepsAway) < closest.floor) {
      closest = {key: index, floor: elevator.onFloor}
    }
  }
  return closest;
}
