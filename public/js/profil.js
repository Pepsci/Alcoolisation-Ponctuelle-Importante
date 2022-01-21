document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  let calendar = new FullCalendar.Calendar(calendarEl, {
    eventSources: ["/api"],
    allDay: false,
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      meridiem: false,
    },
  });
  calendar.render();

  const listConteneur = document.querySelector("#listconteneur");

  // document.addEventListener("click", () => {
  //   const blockEvent = document.querySelector(".fc-daygrid-event-harness");
  //   //const blockDate = blockEvent.parentNode.parentNode.parentNode.getAttribute("data-date");
  //   const blockDate = blockEvent.closest('.fc-daygrid-day').getAttribute('data-date')
  //   return blockDate
  // });
  const blockEvents = document.getElementsByClassName(
    "fc-daygrid-event-harness"
  );
  console.log(blockEvents);
  setTimeout(() => {
    [...blockEvents].forEach((block) => {
      console.log("date", block);
      block.addEventListener("click", () => {
        console.log("click");
        const date = block.closest(".fc-daygrid-day").getAttribute("data-date");
        fetchCons()
          .then(({ data }) => {
            data.consumption.map((cons) => {
              cons.date = String(cons.date).slice(0, 10);
              if (cons.date === date) {
              //  console.log(cons);
                displayCons(cons);
              }
            });
            // console.log(data)
            //console.log(date)
          })
          .catch((e) => console.error(e));
      });
    }, 1000);
  });

  function listGenerate(cons) {
    const list = document.createElement("ul");
    let buffer = 0;
    list.className = "list";
    list.innerHTML = `<li> ${cons.date} ${cons.title} </li>`;
    cons.drink.forEach((elem) => {
      let weekly = (8 * elem.drink.ABV * elem.drink.size * elem.quantity) / 100;
      list.innerHTML += `<li> ${elem.drink.drinkName} ${elem.drink.ABV}% <img src="${elem.drink.image}" width="30px"> ${elem.drink.size} cl x ${elem.quantity}. ${weekly} % of your weekly recommended alcohol consumption </li>`;
      buffer += weekly
      //console.log(weekly)
    });
    listConteneur.innerHTML = `<h2> At this party, you drank ${buffer}% of your weekly recommended alcohol consumption`
   // console.log(buffer)
    return list;
  }

  function displayCons(obj) {
    listConteneur.innerHTML = "";
    listConteneur.appendChild(listGenerate(obj));
  }

  const fetchCons = () => axios.get("/profilAPI");

  //Affichage des niveaux d'alcool consommés par l'utilisateur
  const weekPerc = document.getElementById("weeklyprc");
  weekPerc.innerHTML = "";
});

// const quantity = document.getElementsByClassName("quantity");
// const drink = document.getElementsByClassName("drink");
// const test = document.getElementsByClassName("test");

// drink.forEach((element, i) => {
//   if (quantity[i].innerHTML === "") {
//     test.removeChild(element);
//   }
// });
