function controlRoute(e) {
  e.preventDefault();
  const route = e.target.getAttribute('route');
  if (route) {
    const previousRoute = document.querySelector('.show');
    const routeElement = document.getElementById(route);
    const previousSelected = document.querySelector('.selected');
    if (previousRoute) previousRoute.classList.remove('show');
    routeElement.classList.add('show');
    if (previousSelected) previousSelected.classList.remove('selected');
    e.target.classList.add('selected');
  }
}

window.addEventListener('click', controlRoute);
window.addEventListener('touchend', controlRoute, false);
