document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('.questions__question');

  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.questions__item');
      item.classList.toggle('is-open');
    });
  });
});