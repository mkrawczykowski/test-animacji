document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-icon');
  const header = document.querySelector('.header');
  hamburger.addEventListener('click', () => {
    (hamburger.classList.contains('active')) ? hamburger.classList.remove('active') : hamburger.classList.add('active');
    (header.classList.contains('active')) ? header.classList.remove('active') : header.classList.add('active');
  });
});