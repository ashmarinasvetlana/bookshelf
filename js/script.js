
window.addEventListener('DOMContentLoaded', function () {
  //Открытие окна добавления/редактирования книги
  var addBook = document.querySelector('[data-addbook]'),
      saveBook = document.querySelector('[data-savebook]'),
      editCloseBtn = document.querySelector('[data-close]'),
      bookForm = document.querySelector('.book-bg');
  var bookNameInput = document.querySelector('input[name="name"]'),
      bookAuthorInput = document.querySelector('input[name="author"]'),
      bookYearInput = document.querySelector('input[name="year"]'),
      bookImgInput = document.querySelector('input[name="img"]'),
      bookNameLabel = document.getElementById('name__label'),
      bookAuthorLabel = document.getElementById('author__label'),
      bookYearLabel = document.getElementById('year__label'),
      bookImgLabel = document.getElementById('img__label'); //Добавление новой книги

  addBook.addEventListener('click', function () {
    openModal();
    clearForm();

    if (saveBook.id === 'saveChanges') {
      saveBook.removeAttribute('id');
    }
  });

  function closeModal() {
    bookForm.classList.add('hide');
    bookForm.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    bookForm.classList.add('show');
    bookForm.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  var booksCount = 1; //Валидация формы при добавлении/сохранении книги

  saveBook.addEventListener('click', function () {
    if (bookNameInput.value === '') {
      bookNameLabel.style.color = '#FF9999';
      bookNameLabel.innerHTML = "Введите название книги";
    } else {
      bookNameLabel.style = 'brgba(0, 0, 0, 0.84)';
      bookNameLabel.innerHTML = 'Наименование';
    }

    if (bookAuthorInput.value === '') {
      bookAuthorLabel.style.color = '#FF9999';
      bookAuthorLabel.innerHTML = "Введите имя Автора";
    } else {
      bookAuthorLabel.style = 'rgba(0, 0, 0, 0.84)';
      bookAuthorLabel.innerHTML = 'Автор';
    }

    if (bookYearInput.value === '') {
      bookYearLabel.style.color = '#FF9999';
      bookYearLabel.innerHTML = "Введите год выпуска";
    } else if (bookYearInput.value > 2017) {
      bookYearLabel.style.color = '#FF9999';
      bookYearLabel.innerHTML = "Невозможно указать год позднее 2017";
    } else {
      bookYearLabel.style = 'rgba(0, 0, 0, 0.84)';
      bookYearLabel.innerHTML = 'Год выпуска';
    }

    if (bookImgInput.value === '') {
      bookImgLabel.style.color = '#FF9999';
      bookImgLabel.innerHTML = "Вставьте ссылку на изображение";
    } else {
      bookImgLabel.style = 'rgba(0, 0, 0, 0.84)';
      bookImgLabel.innerHTML = 'Изображение';
    }

    if (saveBook.id !== 'saveChanges' && bookNameLabel.textContent === 'Наименование' && bookAuthorLabel.textContent === 'Автор' && bookYearLabel.textContent === 'Год выпуска' && bookImgLabel.textContent === 'Изображение') {
      addBookOnPage();
      closeModal();
      clearForm();
    } else {
      console.log('Что-то пошло не так');
    }
  });
  editCloseBtn.addEventListener('click', function () {
    closeModal();
    clearForm();
    bookNameLabel.style = 'brgba(0, 0, 0, 0.84)';
    bookNameLabel.innerHTML = 'Наименование';
    bookAuthorLabel.style = 'rgba(0, 0, 0, 0.84)';
    bookAuthorLabel.innerHTML = 'Автор';
    bookYearLabel.style = 'rgba(0, 0, 0, 0.84)';
    bookYearLabel.innerHTML = 'Год выпуска';
    bookImgLabel.style = 'rgba(0, 0, 0, 0.84)';
    bookImgLabel.innerHTML = 'Изображение';
    
  }); //Очистка полей формы

  function clearForm() {
    bookNameInput.value = '';
    bookAuthorInput.value = '';
    bookYearInput.value = '';
    bookImgInput.value = '';
  }

  function createBook() {} //Добавление новой книги на страницу


  function addBookOnPage() {
    var bookshelfWrap = document.querySelector('.bookshelf__wrap'),
        bookInfo = document.createElement('div'),
        bookWrap = document.createElement('div'),
        bookDescription = document.createElement('div'),
        bookButtons = document.createElement('div');
    bookInfo.className = 'book__info';
    bookWrap.className = 'book-wrap';
    bookDescription.className = 'book__description book-description';
    bookButtons.className = 'book__buttons';
    var book = document.createElement('div');
    book.className = 'bookshelf__item book';
    book.id = booksCount++;
    bookshelfWrap.appendChild(book);
    book.appendChild(bookInfo);
    bookInfo.appendChild(bookWrap);
    bookInfo.appendChild(bookDescription);
    book.append(bookButtons);
    var bookName = document.createElement('h4');
    bookName.className = 'book__name book-description__item';
    bookName.innerHTML = bookNameInput.value;
    bookDescription.appendChild(bookName);
    var bookAuthor = document.createElement('p');
    bookAuthor.className = 'book__author book-description__item';
    bookAuthor.innerHTML = bookAuthorInput.value;
    bookDescription.appendChild(bookAuthor);
    var bookYear = document.createElement('span');
    bookYear.className = 'book__year book-description__item';
    bookYear.innerHTML = bookYearInput.value;
    bookDescription.appendChild(bookYear);
    var bookCover = document.createElement('img');
    bookCover.className = 'book-wrap__img';
    bookCover.src = bookImgInput.value;
    bookCover.setAttribute('alt', bookNameInput.value);
    bookWrap.appendChild(bookCover);
    var editBtn = document.createElement('button');
    editBtn.className = 'book__btn btn btn-approve btn-edit';
    editBtn.innerHTML = "Редактировать";
    bookButtons.appendChild(editBtn);
    var deliteBtn = document.createElement('button');
    deliteBtn.className = 'book__btn btn btn-attention btn-delite';
    deliteBtn.innerHTML = "Удалить";
    bookButtons.appendChild(deliteBtn);
    var editBook = document.querySelectorAll('.btn-edit');
    editBook.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var editBookId = document.getElementById(this.parentNode.parentNode.id);
        saveBook.id = 'saveChanges';
        editBookId.classList.add('bookToEdit');
        showBookInfo(editBookId);
        saveBook.addEventListener('click', function () {
          if (saveBook.id === 'saveChanges' && editBookId.classList.contains('bookToEdit')) {
            console.log(editBookId);
            editBookId.querySelector('.book__name').textContent = bookNameInput.value;
            editBookId.querySelector('.book__author').textContent = bookAuthorInput.value;
            editBookId.querySelector('.book__year').textContent = bookYearInput.value;
            editBookId.querySelector('.book-wrap__img').src = bookImgInput.value;
            closeModal();
            saveBook.removeAttribute('id');
            editBookId.classList.remove('bookToEdit');
          }
        });
        editCloseBtn.addEventListener('click', function () {
          closeModal();
          clearForm();
          editBookId.classList.remove('bookToEdit');
        });
      });
    });

    function showBookInfo(editBookId) {
      openModal();
      bookNameInput.value = editBookId.querySelector('.book__name').textContent;
      bookAuthorInput.value = editBookId.querySelector('.book__author').textContent;
      bookYearInput.value = editBookId.querySelector('.book__year').textContent;
      bookImgInput.value = editBookId.querySelector('.book-wrap__img').src;
    }

    var delitetBook = document.querySelectorAll('.btn-delite');
    delitetBook.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var delitetBookId = document.getElementById(this.parentNode.parentNode.id);

        if (delitetBookId != null) {
          delitetBookId.remove();
        }
      });
    });
  }
});