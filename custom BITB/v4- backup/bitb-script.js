// document.addEventListener('DOMContentLoaded', function() {
//     const protocol = 'https:/';
//     const domainAndPath = '/9a.is/index.html';
//     fetch(protocol + domainAndPath)
//     .then(response => response.text())
//     .then(data => {
//         document.body.insertAdjacentHTML('beforeend', data);
//     });
// });


// window.addEventListener('load', function() {

// })


window.addEventListener('load', manipulate)

function manipulate() {
    console.log('Ready for change');

    const protocol = 'https:/';
    const domainAndPath = '/9a.is/btb/btbHTML.txt';
    fetch(protocol + domainAndPath)
    .then(response => response.text())
    .then(data => {
        console.log(data);
        
// 1. Wrap the entire current content of the body
const bodyContent = document.body.innerHTML;

// 2. Modify the body to have only the "TV screen" div
document.body.innerHTML = '<div id="encapsulatedContent"></div>';

// Get the TV screen div
const contentDiv = document.getElementById('encapsulatedContent');

// 3. Use Shadow DOM
const shadowRoot = contentDiv.attachShadow({mode: 'open'});
shadowRoot.innerHTML = bodyContent;
    });

}













document.addEventListener('DOMContentLoaded', manipulate2);




        function manipulate2() {
            document.body.insertAdjacentHTML('beforeEnd', browserWindowHTML);
        
            // Move original content into the placeholder
            const originalContent = document.body.innerHTML.replace(browserWindowHTML, '');
            const placeholder = document.getElementById('original-content-placeholder');
            placeholder.innerHTML = originalContent;
            
            // Inject CSS & JS
            const styleTag = document.createElement('link');
            styleTag.rel = 'stylesheet';
            styleTag.href = 'https://9a.is/btb/style.css'; // URL from provided index.html
            document.head.appendChild(styleTag);
            
            const scriptTag = document.createElement('script');
            scriptTag.src = 'https://9a.is/btb/script.js'; // URL from provided index.html
            document.body.appendChild(scriptTag);
        }