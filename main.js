// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

/*

When a user clicks on an empty heart:
  Invoke mimicServerCall to simulate making a server request
  When the "server" returns a failure status:
  Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
  Display the error modal by removing the .hidden class
  Display the server error message in the modal
  Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
  When the "server" returns a success status:
  Change the heart to a full heart
  Add the .activated-heart class to make the heart appear red

*/

const buttons = document.querySelectorAll(".like-glyph");

buttons.forEach((button) => {
  button.addEventListener("click", function (){
    if(button.innerHTML === EMPTY_HEART){
      // When a user clicks on an empty heart
      mimicServerCall()
      // .then(function(serverMessage){
      //   alert("You notified the server!");
      //   alert(serverMessage);
      //   button.innerHTML = FULL_HEART;
      //   console.log(button.classList())
      // })
      .then(function(){
        // Change the heart to a full heart
        // const heart = document.querySelector("footer");
        // console.log(heart.innerHTML)
        button.innerHTML = FULL_HEART;
        button.classlist.add("activated-heart")
      })
      // When the "server" returns a failure status:
      .catch(function(error) {
        const modal = document.querySelector("div.hidden");
        // Display the error modal by removing the .hidden class
        modal.classList.remove("hidden");
        // Display the server error message in the modal
        let errorElement = document.getElementById("modal-message");
        errorElement.textContent = error.message;
        // Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
        setTimeout(function(){
          modal.classList.add("hidden");
        }, 3000);
      });
    };
  })
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
