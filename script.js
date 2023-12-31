
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?\
  let saveData = JSON.parse(localStorage.getItem("saveData")) === null? {} : JSON.parse(localStorage.getItem("saveData"));
  $(".time-block").children("button").each(function(){
    $(this).on("click", function(){
      const text = $(this).siblings("textarea").val();
      const id = $(this).parent().attr("id");
      saveData[id] = text;
      localStorage.setItem("saveData", JSON.stringify(saveData));
    });
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?


  //Needed change time-block divs to 24 hour time ids
  $(".time-block").each(function(){
    if(dayjs().get("hour") > $(this).attr("id")){
      $(this).removeClass("present future").addClass("past");
    }
    else if(dayjs().get("hour") == $(this).attr("id")){
      $(this).removeClass("future past").addClass("present");
    }
    else{
      $(this).removeClass("past present").addClass("future");
    }
  });
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  $(".time-block").each(function(){
    $(this).children("textarea").text(saveData[$(this).attr("id")]);
    
  });

  // TODO: Add code to display the current date in the header of the page.
  //For day
  const currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);
  //For time, updates every second
  setInterval(function(){
    const currentTime = dayjs().format("h:mm:ss A");
    $("#currentTime").text(currentTime);
  }, 1000);
}); 


