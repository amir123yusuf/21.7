const pageNum = document.getElementById("page-num"); // сдесь я беру элементы и селекторы из html кода чтобы в последствии его подключить к js
const limitNum = document.getElementById("limit");
const ButtonJS = document.querySelector("button");
const spanJS = document.querySelector("span");
const divJS = document.querySelector("div");


ButtonJS.addEventListener("click", ButtonJSHandle) // подключаем к кнопке клик

if (loadPhotosFromLocalStorage())
    write("Загружены последние просмотренные фото."); // свойство с загрузкой последних прогруженных данных у меня осуществить не получилось

function ButtonJSHandle() { 
  const inputPageNum = pageNum.value;
  const limit = limitNum.value;

  if ((inputPageNum < 1 || inputPageNum > 10) && (limit < 1 || limit > 10)) { // ставим лимиты по картинкам и страницам
    write("Номер страницы и лимит вне диапазона от 1 до 10")
    return;
  } else 
  if (inputPageNum < 1 || inputPageNum > 10) {
    write("Номер страницы вне диапазона от 1 до 10") //
    return;
  } else
  if (limit < 1 || limit > 10) {
    write("Лимит вне диапазона от 1 до 10.");
    return;
  }

  write("Загружаю фото...");

  fetch(`https://picsum.photos/v2/list?page=${inputPageNum}&limit=${limit}`) // сдесь мы взяли картинки из ссылки и переделывам json
    .then((response) => response.json())
    .then((json) => {
      loadPhotos(json);
      write("Фото загружены");
    })
    .catch((reason) => { 
    write("Ошибка: " + reason); // тут пишем что будет при ошибке
    });
}

function write(text) {
    spanJS.innerHTML = text;
}

function loadPhotos(apiData) {
  let cards = String();
  
  apiData.forEach(item => { // ниже мы делаем размеры и берем фотоки с ссылки которая находится выше
    const cardBlock =     `<div>
                                <img
                                  src="${item.download_url}"
                                  style="width: 300px"
                                />
                                <p>${item.author}</p>
                              </div>`;
        cards += cardBlock;
  });
    divJS.innerHTML = cards;
}
