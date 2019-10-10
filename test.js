function initApp() {
  let floors = parseInt($("#noOfFloors").val())
  let elevators = parseInt($("#noOfElevators").val())
  if(Number.isInteger(elevators) && Number.isInteger(floors)) {
    renderElevators(elevators)
    renderFloors(floors)
  }
  else {
    alert('invalid inputs')
  }
}

function renderElevators(elevators) {
  for (let i=1; i<=elevators; i++) {
    $('#elevators').append(`<ul class="elevator borders">
                    <li>${i}</li>
                </ul>`)
  }
}

function renderFloors(floors) {
  for (let i=1; i<=floors; i++) {
    $('#floors').append(`<li>${i}</li>`)
  }
}
