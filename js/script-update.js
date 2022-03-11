window.addEventListener('load', () => {
  const books =
  {
    "01": { name: 'JavaScript и Jquery', author: 'Дэвид Сойер Макфарланд', year: '2017', img: 'img/1.webp' },
    "02": { name: 'Изучаем программирование на JavaScript', author: 'Эрик Фримен, Элизабет Робсон', year: '2017', img: 'img/2.webp' },
    "03": { name: 'Секреты JavaScript ниндзя', author: 'Джон Резиг, Беэр Бибо', year: '2017', img: 'img/3.jpg' },
    "04": { name: 'ES6 и не только', author: 'Кайл Симпсон', year: '2017', img: 'img/4.webp' },

  }

    ,
    bookshelf = document.querySelector('.bookshelf__wrap'),
    addBookBtn = document.querySelector('[data-addbook]'),
    saveBookBtn = document.querySelector('[data-savebook]'),
    editCloseBtn = document.querySelector('[data-close]'),
    bookPopup = document.querySelector('.book-bg'),
    bookEditForm = document.querySelector('.book-edit__form'),
    bookNameInput = document.querySelector('input[name="name"]'),
    bookAuthorInput = document.querySelector('input[name="author"]'),
    bookYearInput = document.querySelector('input[name="year"]'),
    bookImgInput = document.querySelector('input[name="img"]'),
    bookNameLabel = document.getElementById('name__label'),
    bookAuthorLabel = document.getElementById('author__label'),
    bookYearLabel = document.getElementById('year__label'),
    formHeader = document.querySelector('.book-edit__form-title'),
    bookImgLabel = document.getElementById('img__label');
  let booksCount = 1;


  for (key in books) {
    const bookshelfElement = document.createElement('div');
    bookshelfElement.classList.add('bookshelf__item', 'book');
    bookshelfElement.id = key;
    bookshelfElement.insertAdjacentHTML("afterBegin", `
         <div class="book__info">
						<div class="book-wrap"><img src="${books[key].img}" alt="" class="book-wrap__img"></div>
					<div class="book__description book-description">
						<h4 class="book__name book-description__item">${books[key].name}</h4>
					<p class="book__author book-description__item">${books[key].author}</p>
					<span class="book__year book-description__item">${books[key].year}</span>
				</div>
			</div>
					<div class="book__buttons">
						<button data-editbook class="book__btn btn btn-approve btn-edit">Редактировать</button>
						<button class="book__btn btn btn-attention btn-delite">Удалить</button>
					</div>

          `);
    document.querySelector('.bookshelf__wrap').appendChild(bookshelfElement);
  }




  addBookBtn.addEventListener('click', function () {
    openModal();
    clearForm();
  });

  editCloseBtn.addEventListener('click', function () {
    closeModal();
    clearForm();


  });
  //Закрытие  модального окна по клику вне формы
  bookPopup.addEventListener('click', function (e) {
    const target = e.target;
    const itsPopup = target == bookEditForm || bookEditForm.contains(target);
    if (!itsPopup) {
      closeModal();
      clearForm();
    }

  });

  saveBookBtn.addEventListener('click', function (e) {
    const target = e.target;
    addBook(target);
  });

  //Открытие/закрытие формы редактирования книги
  function addBook(btn) {
    const formData = bookEditForm;
    const dataAttr = btn.getAttribute('data');

    const serializeArray = function (form) {
      const arr = [];
      Array.prototype.slice.call(form.elements).forEach(function (field) {
        if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
        arr.push({
          name: field.name,
          value: field.value
        });
      });

      return arr;
    };
    const data = serializeArray(formData);

    const arrTwo = {};
    for (key in data) {
      arrTwo[data[key]['name']] = data[key]['value'];

    }
    if (dataAttr == 'save') {
      const randomId = Math.round(Math.random() * 100);
      books[randomId] = arrTwo;
      renderBook(randomId);
    }
    else {

      btn.setAttribute('data', 'save');
      books[dataAttr] = arrTwo;
      renderBook(dataAttr);
    }

    closeModal();
    clearForm();

  };
  function renderBook(id) {


    const bookItemJs = document.getElementById(`${id}`);
    if (bookItemJs == null) {


      const bookshelfWrap = document.querySelector('.bookshelf__wrap'),
        bookInfo = document.createElement('div'),
        bookWrap = document.createElement('div'),
        bookDescription = document.createElement('div'),
        bookButtons = document.createElement('div');

      bookInfo.className = 'book__info';
      bookWrap.className = 'book-wrap';
      bookDescription.className = 'book__description book-description';
      bookButtons.className = 'book__buttons';

      const book = document.createElement('div');
      book.className = 'bookshelf__item book';
      book.id = id;
      bookshelfWrap.appendChild(book);
      book.appendChild(bookInfo);
      bookInfo.appendChild(bookWrap);
      bookInfo.appendChild(bookDescription);
      book.append(bookButtons);

      const bookName = document.createElement('h4');
      bookName.className = 'book__name book-description__item';
      bookName.textContent = books[id]['name'];
      bookDescription.appendChild(bookName);

      const bookAuthor = document.createElement('p');
      bookAuthor.className = 'book__author book-description__item';
      bookAuthor.textContent = books[id]['author'];
      bookDescription.appendChild(bookAuthor);

      const bookYear = document.createElement('span');
      bookYear.className = 'book__year book-description__item';
      bookYear.textContent = books[id]['year'];
      bookDescription.appendChild(bookYear);

      const bookCover = document.createElement('img');
      bookCover.className = 'book-wrap__img';
      bookCover.src = books[id]['img'];
      bookCover.setAttribute('alt', books[id]['name']);
      bookWrap.appendChild(bookCover);

      const editBtn = document.createElement('button');
      editBtn.className = 'book__btn btn btn-approve btn-edit';
      editBtn.textContent = "Редактировать";
      bookButtons.appendChild(editBtn);

      const deliteBtn = document.createElement('button');
      deliteBtn.className = 'book__btn btn btn-attention btn-delite';
      deliteBtn.textContent = "Удалить";
      bookButtons.appendChild(deliteBtn);


    }
    if (bookItemJs !== null) {

      const bookCover = bookItemJs.querySelector('.book-wrap__img'),
        bookYear = bookItemJs.querySelector('.book__year'),
        bookName = bookItemJs.querySelector('.book__name'),
        bookAuthor = bookItemJs.querySelector('.book__author');

      bookCover.src = books[id]['img'];
      bookName.textContent = books[id]['name'];
      bookYear.textContent = books[id]['year'];
      bookAuthor.textContent = books[id]['author'];
      saveBookBtn.setAttribute('data', 'save');

    }




  }
  bookshelf.addEventListener('click', function (e) {
    const target = e.target;
    //Открытие окна для редактирования книги
    if (target.classList.contains('btn-edit')) {
      editBook(target);
    }
    if (target.classList.contains('btn-delite')) {
      deleteBook(target);
    }


  });

  function editBook(btn) {
    const book = btn.closest('.book');

    const id = book.id;
    openModal();
    bookNameInput.value = books[id]['name'];
    bookAuthorInput.value = books[id]['author'];
    bookYearInput.value = books[id]['year'];
    bookImgInput.value = books[id]['img'];
    saveBookBtn.setAttribute('data', id);

  }
  function deleteBook(btn) {
    const book = btn.closest('.book');
    const id = book.id;
    delete books[id];
    book.remove();


  }
  function closeModal() {
    bookPopup.classList.add('hide');
    bookPopup.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    bookPopup.classList.add('show');
    bookPopup.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  function clearForm() {
    bookNameInput.value = '';
    bookAuthorInput.value = '';
    bookYearInput.value = '';
    bookImgInput.value = '';
    bookNameLabel.style = 'brgba(0, 0, 0, 0.84)';
    bookNameLabel.textContent = 'Наименование';
    bookAuthorLabel.style = 'rgba(0, 0, 0, 0.84)';
    bookAuthorLabel.textContent = 'Автор';
    bookYearLabel.style = 'rgba(0, 0, 0, 0.84)';
    bookYearLabel.textContent = 'Год выпуска';
    bookImgLabel.style = 'rgba(0, 0, 0, 0.84)';
    bookImgLabel.textContent = 'Изображение';
  }

});