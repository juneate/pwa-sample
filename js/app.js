if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'Service Worker registration failed')
  );
}


// Where in the page will the content be?
const pageContent = document.getElementById('page');

// Where can we go?
const routes = {
  '/': homePage,
  '/todolist': todoListPage,
  '/credits': creditPage
  // ADD NEW ROUTES HERE THAT POINT TO VIEWS
};

// On load of the application
window.addEventListener('load', (e) => {
  // Draw the first page
  drawPage();

  // If we hit our history button, redraw the page
  window.addEventListener('popstate', event => {
    drawPage();
  });

  // If we clich an Anchor (<a>) in HTML, route to it's HREF value without reloading
  document.addEventListener('click', (e) => {
    if (e.target.nodeName == 'A') {
      e.preventDefault();
      history.pushState(null, '', e.target.pathname);
      drawPage();
    }
  })
});

function drawPage() {
  pageContent.innerHTML = routes[window.location.pathname];
}
