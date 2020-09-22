window.addEventListener('DOMContentLoaded', () => {




 // Используем классы для создания книг

 class BookCard {
    constructor(src, alt, title, author, year, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.author = author;
        this.year = year;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
     
    }

  

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "bookshelf__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
        <div class="book__info">
        <div class="book-wrap"><img src=${this.src} alt=${this.alt} class="book-wrap__img"></div>
    <div class="book__description book-description">
        <h4 class="book__name book-description__item">${this.title}</h4>
    <p class="book__author book-description__item">${this.author}</p>
    <span class="book__year book-description__item">${this.year}</span>
</div>
</div>
<div class="book__buttons">
<button data-editbook class="book__btn btn btn-approve">Редактировать</button>
                        <button class="book__btn btn btn-attention btn-delite">Удалить</button>
                        </div>
        `;
        this.parent.append(element);
    }
}

new BookCard(
    "img/1.webp",
    "JavaScript и Jquery",
    "JavaScript и Jquery",
    'Дэвид Сойер Макфарланд"',
    '2017',
    ".bookshelf__wrap"
).render();






























});