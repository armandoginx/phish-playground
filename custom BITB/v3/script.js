var titleBar = document.getElementById("title-bar");
var exit = document.getElementById("exit");
var max = document.getElementById("maximize");
var min = document.getElementById("minimize");



titleBar.addEventListener('dblclick', function handleMouseOver() {
    enlarge();
});

titleBar.addEventListener('mouseout', function handleMouseOver() {
  titleBar.style.cursor = 'default';
});

//////////////// Make window draggable start ////////////////
// Make the DIV element draggable:
var draggable = $('#window');
var title = $('#title-bar');

title.on('mousedown', function(e){
	var dr = $(draggable).addClass("drag");
	height = dr.outerHeight();
	width = dr.outerWidth();
	ypos = dr.offset().top + height - e.pageY,
	xpos = dr.offset().left + width - e.pageX;
	$(document.body).on('mousemove', function(e){
		var itop = e.pageY + ypos - height;
		var ileft = e.pageX + xpos - width;
		if(dr.hasClass("drag")){
			dr.offset({top: itop,left: ileft});
		}
	}).on('mouseup', function(e){
			dr.removeClass("drag");
	});
});
//////////////// Make window draggable end ////////////////


////////////////// Onclick listeners //////////////////
// X button functionality


$("#exit").click(function(){
    $("#window").css("display", "none");
});

$("#ssl-padlock").click(toggleSSLPopup);
$("#ssl-close").click(toggleSSLPopup);

function toggleSSLPopup(){
    var sslPopup = $("#ssl-popup");
    if (sslPopup.hasClass("visible")){
        sslPopup.removeClass("visible")
    } else (
        sslPopup.addClass("visible")
    )
  }



// Maximize button functionality
$("#maximize").click(enlarge);

function enlarge(){
  if(max.classList.contains("enlarged")){
    $("#window").css("width", "40%");
    $("#window").css("height", "60%");
    $("#window").css("top", "7%");
    $("#window").css("left", "30%");
    $("#title-bar-width").css('width', '100%').css('width', '+=2px');
    $("#content").css("width", "100%");
    $("#maximize").removeClass("enlarged");
  }
  else{
    $("#window").css("width", "70%");
    $("#window").css("height", "70%");
    $("#window").css("top", "5%");
    $("#window").css("left", "15%");
    $("#title-bar-width").css('width', '100%').css('width', '+=2px');
    $("#content").css("width", "100%");
    $("#maximize").addClass("enlarged");
  }
}







// // Functionality to resize the browser window
// const edges = document.querySelectorAll(".browser>.edge");
// let isResizing = false;

// edges.forEach(edge => {
//     edge.addEventListener("mousedown", (event) => {
//         isResizing = true;
//         let startX = event.clientX;
//         let startY = event.clientY;
//         let startWidth = browserWindow.offsetWidth;
//         let startHeight = browserWindow.offsetHeight;

//         const doResize = (event) => {
//             if (!isResizing) return;

//             if (edge.classList.contains("left")) {
//                 browserWindow.style.width = startWidth - (event.clientX - startX) + "px";
//             } else if (edge.classList.contains("right")) {
//                 browserWindow.style.width = startWidth + (event.clientX - startX) + "px";
//             }

//             if (edge.classList.contains("top")) {
//                 browserWindow.style.height = startHeight - (event.clientY - startY) + "px";
//             } else if (edge.classList.contains("bottom")) {
//                 browserWindow.style.height = startHeight + (event.clientY - startY) + "px";
//             }
//         };

//         const stopResize = () => {
//             isResizing = false;
//             window.removeEventListener("mousemove", doResize);
//             window.removeEventListener("mouseup", stopResize);
//         };

//         window.addEventListener("mousemove", doResize);
//         window.addEventListener("mouseup", stopResize);
//     });
// });

