(function (){
  // Create a new Date object representing the current date and time
  const currentDate = new Date();
  // Define options for formatting the date
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  // Format the current date using the options and store it in the formattedDate variable
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  // Set the text content of the element with the ID "current-date" to the formatted date
  document.getElementById("current-date").textContent = formattedDate;
})();