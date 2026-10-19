document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. ЛОГИКА ДЛЯ FAQ (Часто задаваемые вопросы)
  // ==========================================
  const questions = document.querySelectorAll('.questions__question');

  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.questions__item');
      item.classList.toggle('is-open');
    });
  });


  // ==========================================
  // 2. ЛОГИКА ДЛЯ МОДАЛЬНОГО ОКНА ТОВАРА
  // ==========================================
  const modal = document.getElementById('product-modal');
  
  // Если модалки нет на этой странице, скрипт для неё просто не выполнится (защита от ошибок)
  if (modal) {
    const closeBtn = modal.querySelector('.product-modal__close');
    const overlay = modal.querySelector('.product-modal__overlay');
    const backBtn = modal.querySelector('.product-modal__back');
    
    // Элементы внутри модалки, куда будем вставлять данные
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');

    // Открытие модалки при клике на карточку
    const productCards = document.querySelectorAll('.catalog-card');
    
    productCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем переход по ссылке href="#"
        
        // Получаем данные из data-атрибутов карточки
        const title = card.getAttribute('data-title');
        const price = card.getAttribute('data-price');
        const image = card.getAttribute('data-image');

        // Подставляем данные в модалку
        if (title) modalTitle.textContent = title;
        if (price) modalPrice.textContent = price;
        if (image) modalImage.src = image;

        // Открываем модалку
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку сайта
      });
    });

    // Функция закрытия модалки
    const closeModal = () => {
      modal.classList.remove('is-open');
      document.body.style.overflow = ''; // Возвращаем прокрутку
    };

    // Закрытие по клику на крестик, темный фон и кнопку "Назад"
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    if (backBtn) backBtn.addEventListener('click', closeModal);

    // Закрытие по нажатию на клавишу Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Переключение размеров (S, M, L, XL)
    const sizeBtns = modal.querySelectorAll('.product-modal__size-btn');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  }

});