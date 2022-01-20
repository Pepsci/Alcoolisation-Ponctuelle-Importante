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
});

document.addEventListener("click", () => {
  const blockEvent = document.getElementsByClassName(
    "fc-daygrid-event-harness"
  );
  console.log(blockEvent);
});
