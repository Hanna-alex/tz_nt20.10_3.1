/////

const travelTime = 50;
const oneWayFare = 700;
const scheduleFromA = ['', '18:00', '18:30', '18:45', '19:00', '19:15', '21:00'];
const scheduleFromB = ['', '18:30', '18:45', '19:00', '19:15', '19:35', '21:50', '21:55'];
const timeBlock = document.querySelector('.time-block');
const route = document.querySelector('#route');
const containerTime = document.querySelector('#time');
const containerBack = document.querySelector('#time-back');
const blockBack = document.querySelector('.time-block__group-back')

//преобразование scheduleFromB в минуты
let timeB = scheduleFromB.map(elem => (Number(elem.slice(0, 2)) * 60) + (Number(elem.slice(3, 5))))


timeBlock.classList.add('hidden');

route.addEventListener('change', () => {
  let routeValue = route.value; // выбранный маршрута  
  // console.log(routeValue);

  ticketNum.innerHTML = '' //



  if (routeValue === 'из A в B') {
    containerTime.addEventListener('change', ticketVisible);

    timeBlock.classList.remove('hidden');
    blockBack.classList.add('hidden');

    containerTime.innerHTML = '';

    scheduleFromA.forEach(elem => {
      containerTime.insertAdjacentHTML('beforeend', `
        <option value="` + elem + `">` + elem + `</option>
      `)
    })

  } else if (routeValue === 'из B в A') {
    containerTime.addEventListener('change', ticketVisible)

    timeBlock.classList.remove('hidden');
    blockBack.classList.add('hidden');

    containerTime.innerHTML = '';
    scheduleFromB.forEach(elem => {
      containerTime.insertAdjacentHTML('beforeend', `
        <option value="` + elem + `">` + elem + `</option>
      `)
    })


  } else if (routeValue === 'из A в B и обратно в А') {

    containerTime.addEventListener('change', ticketVisible);

    timeBlock.classList.remove('hidden');


    containerTime.innerHTML = '';

    scheduleFromA.forEach(elem => {

      containerTime.insertAdjacentHTML('beforeend', `
        <option value="` + elem + `">` + elem + `</option>
      `)
    })
    /////


    containerTime.addEventListener('change', () => {

      let valueTime = containerTime.value.slice(0, 5);
      const hoursToMinutes = Number(valueTime.slice(0, 2)) * 60;
      const minutes = Number(valueTime.slice(3.5))
      const valueA = hoursToMinutes + minutes // выбранная дата

      /////добавить элемент обратного времени с учетом выбранного
      let correctTimeB = []

      timeB.forEach(elem => {
        if (elem > valueA + travelTime) {
          correctTimeB.push(elem)

        }
      })

      const correctTimeInHoursB = correctTimeB.map(elem => String(Math.trunc(elem / 60)) + ':' + String(elem % 60))

      console.log(correctTimeInHoursB)

      blockBack.classList.remove('hidden');
      containerBack.innerHTML = '';
      correctTimeInHoursB.forEach(elem => {
        containerBack.insertAdjacentHTML('beforeend', `
         <option value="` + elem + `)">` + elem + `</option>
       `)
      })
    })

  } else {

    timeBlock.classList.add('hidden')
  }

})
///


const button = document.querySelector('button');
const ticketNum = document.querySelector('#num')
const result = document.querySelector('.result')

ticketNum.innerHTML = ''

button.addEventListener('click', () => {
  const ticketNumValue = ticketNum.value

  let price = Number(ticketNumValue) * oneWayFare
  let arrivalTime = String((Math.trunc((Number(containerTime.value.slice(0, 2)) * 60 + Number(containerTime.value.slice(3, 5)) + travelTime) / 60))) + ':' + String((Number(containerTime.value.slice(0, 2)) * 60 + Number(containerTime.value.slice(3, 5)) + travelTime) % 60)


  ///склонение слова
  const words = ['билет', 'билета', 'билетов']

  function num_word(value, words) {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
  }


  //*/*/*/*/*//
  if (route.value === 'из A в B и обратно в А') {
    result.innerHTML = '';


    result.insertAdjacentText('beforeend', `
            Вы выбрали ` + ticketNumValue + ' ' + num_word(ticketNumValue, words) + ` по маршруту ` + route.value + ` стоимостью ` + price * 2 + `р.
            Это путешествие займет у вас 1 час 40 минут. 
            Теплоход отправляется в ` + containerTime.value + `, а прибудет в ` + arrivalTime)

  } else {
    result.innerHTML = '';

    result.insertAdjacentText('beforeend', `
            Вы выбрали ` + ticketNumValue + ' ' + num_word(ticketNumValue, words) + ` по маршруту ` + route.value + ` стоимостью ` + price + `р.
            Это путешествие займет у вас ` + travelTime + ` минут. 
            Теплоход отправляется в ` + containerTime.value + `, а прибудет в ` + arrivalTime)
  }


})



/// 

const ticketVisible = () => {
  const ticket = document.querySelector('.ticket')
  ticket.classList.remove('hidden');
}


