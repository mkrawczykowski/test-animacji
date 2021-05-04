document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.header__hamburger .hamburger');
  const header = document.querySelector('.header');
  hamburger.addEventListener('click', () => {
    (hamburger.classList.contains('active')) ? hamburger.classList.remove('active') : hamburger.classList.add('active');
    (header.classList.contains('active')) ? header.classList.remove('active') : header.classList.add('active');
  });

  const hamburger2 = document.querySelector('.test-content__button');
  const header2 = document.querySelector('.test-content');
  hamburger2.addEventListener('click', () => {
    (header2.classList.contains('active')) ? header2.classList.remove('active') : header2.classList.add('active');
  });
});