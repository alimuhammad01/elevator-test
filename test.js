let floors = 0;
let elevators = [];

//TODO: A better way was to write tests(Unit + E2E) for tests it but time is short so ;-)
//TODO: Had to add lints.

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
* Renders No of Elevators
 */
function renderElevators() {
  $('#elevators').empty()
  for (let i=1; i<=elevators.length; i++) {
    $('#elevators').append(`<ul id="elevator-${i}" class="elevator borders"></ul>`)
    for (let f=1; f<=floors; f++) {
      $('#elevator-'+i).append(`<li id="elevator-floor-${i}" class="${elevators[i-1].onFloor === f ? 'active' : 'not-active' }">${f === 1 ? elevators[i-1].movingTo ? elevators[i-1].movingTo : i : `&nbsp`}</li>`)
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
  else {
    // TODO: Need to put this in separate func so can be reused easily.
    let {key, floor} = elevator;
    console.log('current = ', elevator)
    elevators[key].moving = true
    if(floorIndex > floor) {
      elevators[key].movingTo = 'UP'
    }
    else {
      elevators[key].movingTo = 'DOWN'
    }
    renderElevators()
    setTimeout(function () {
      elevators[key].movingTo = ""
      elevators[key].onFloor = floorIndex
      elevators[key].moving = false
      elevators[key].open = true
      renderElevators()
    }, 1000*(key+1))
  }
}

function moveDown(floorIndex) {
  let elevator = prioritizeElevator(floorIndex);
  if(!elevator) {
    alert('Elevator already present!')
  }
  else {
    // TODO: Need to put this in separate func so can be reused easily.
    let {key, floor} = elevator;
    console.log('current = ', elevator)
    elevators[key].moving = true
    if(floorIndex > floor) {
      elevators[key].movingTo = 'UP'
    }
    else {
      elevators[key].movingTo = 'DOWN'
    }
    renderElevators()
    setTimeout(function () {
      elevators[key].movingTo = ""
      elevators[key].onFloor = floorIndex
      elevators[key].moving = false
      elevators[key].open = true
      renderElevators()
    }, 1000*(key+1))
  }
}

/*
 * Defining Rules for prioritizing Elevator's Selection.
 * 1: It should be CLOSEST one to the the called floor
 * 2: If elevator is already present on the same Floor it is called from show ALERT
 * 3: Moving lift to ordered floor
 * 4: Added Moving status
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
