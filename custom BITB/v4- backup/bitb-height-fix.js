
// FOR POISITIONING ISSUES

$(document).ready(function() {
    adjustPopupHeight();

    // If there are dynamic elements that might change the height, you can also listen for mutations
    const observer = new MutationObserver(adjustPopupHeight);
    observer.observe(document.querySelector('.win-scroll'), { childList: true, subtree: true });
});

function adjustPopupHeight() {
    const winScrollHeight = $('.win-scroll').outerHeight(true);
    const bitbTopBarHeight = $('#bitb-top-bar').outerHeight(true);
    const newPopupHeight = winScrollHeight + bitbTopBarHeight + 40; // Adding 40 for potential padding or margin

    $('#bitb-popup').height(newPopupHeight);
}
