// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", initInteraction);

function rejectInteraction(rejectId){
  const modal = document.querySelector("div.hidden");
  // Display the error modal by removing the .hidden class.
  modal.classList.remove("hidden");
  let errorElement = document.getElementById("modal-message");
  // Display the server error message in the modal.
  errorElement.textContent = rejectId.message;

  // Use setTimeout to hide the modal after 3 seconds (add the .hidden class).
  setTimeout(function(){
    modal.classList.add("hidden");
  }, 3000);
};

function initInteraction(){

    const likeElements = document.querySelectorAll(".like-glyph");

    likeElements.forEach((likeElement) => {
      likeElement.addEventListener("click", (e) => {
        // When a user clicks on an empty heart.
        if(e.target.innerHTML === EMPTY_HEART){
          mimicServerCall()
            // Change the heart to a full heart.
            // Add the .activated-heart class to make the heart appear red.
            .then(function(){
              e.target.innerHTML = FULL_HEART;
              e.target.classList.add("activated-heart")
            })
            // When the "server" returns a failure status.
            .catch(error => rejectInteraction(error));
        } else if(e.target.innerHTML === FULL_HEART){
          mimicServerCall()
            .then(function(){
              e.target.innerHTML = EMPTY_HEART;
              e.target.classList.remove("activated-heart");
            })
            .catch(error => rejectInteraction(error));
        };
      })
    })
};

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
