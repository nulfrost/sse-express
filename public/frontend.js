const eventSource = new EventSource("/events");

eventSource.addEventListener("message", (event) => {
  const sseDataList = document.querySelector("#sseDataList");
  const sseDataItem = document.createElement("li");

  sseDataItem.textContent = `${event.lastEventId} - ${event.data} - ${event.timeStamp}`;

  sseDataList.appendChild(sseDataItem);
});

eventSource.addEventListener(
  "open",
  () => {
    console.log("Event source connection opened!");
  },
  false
);

eventSource.addEventListener(
  "error",
  (event) => {
    if (event.eventPhase === EventSource.CLOSED) {
      eventSource.close();
    }
  },
  false
);
