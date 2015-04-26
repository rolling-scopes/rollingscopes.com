## Chrome Dev Tools
Пройти бесплатный курс  - http://discover-devtools.codeschool.com/

## Youtube viewer - DEADLINE: 15-DEC-2014
###Задача:
Необходимо создать web-приложение, которое позволяет загружать и просматривать информацию о youtube роликах на основании запроса пользователя.
Данные с YouTube REST API получаться с помощью JSONP запроса.

###Use case:
1. Пользователь открывает приложение и видит строку поиска
2. В строке поиска пользователь набирает интересующую его тему. Например - javascript.
3. Приложение выполняет запрос к YouTube Rest Api и отображает полученные клипы в виде горизонтального списка.
4. Список можно листать с помощью мыши в любом месте просто зажав левую кнопку и сделав swipe. Если пользователь сделал несколько быстрых свайпов, приложение перелистывает соответствующее количество страниц. Количество роликов на странице зависит от размера окна. Дополнительным средством навигации является “paging” внизу страницы.
5. По мере перелистывания страниц, приложение подгружает новые данные (по 15 клипов за раз)

###Требования:
1. Идеальная работа в Chrome последней версии, кроме этого должна поддерживаться как минимум одна мобильная платформа (Android, iOS, WP на выбор).
2. Рендеринг html средствами javascript (страница загружается без html тэгов внутри document.body)
3. Использование jquery и других фреймворков не допускается.
4. JS и CSS код должны быть в отдельных файлах. Код страницы в файле index.html
5. Использование глобальных переменных и функций должно быть минимальным.
6. Пример UI:
  *  [sample 1](http://rolling-scopes.github.io/front-end-course/tasks/task6/sample1.png)
  *  [sample 2](http://rolling-scopes.github.io/front-end-course/tasks/task6/sample2.png)
  *  [sample 3](http://rolling-scopes.github.io/front-end-course/tasks/task6/sample3.png)
  *  [sample 4](http://rolling-scopes.github.io/front-end-course/tasks/task6/sample4.png)
7. Анимация на базе возможностей CSS3 (использование свойств: -webkit-transition: -webkit-transform " + time + "ms cubic-bezier(0,0,0.25,1); -webkit-transform: translate3d(" + shift + "px, 0px, 0px))
8. Минимальная ширина одного компонента 300px; (можно другую)
9. Каждый компонент, представляет информацию об одном YouTube ролике. Минимальная информация: заголовок (он же кликабельный линк на YouTube), превьюшка, описание, автор, дата публикации, количество просмотров. Данную информацию из респонса можно получить с помощью следующей функции:
    ```javascript
     function convertYouTubeResponseToClipList(rawYouTubeData) {
                var clipList = [];
                var entries = rawYouTubeData.feed.entry;
                if (entries) {
                    for (var i = 0, l = entries.length; i < l; i++){
                        var entry = entries[i];

                        var date = new Date(Date.parse(entry.updated.$t));
                        var shortId = entry.id.$t.match(/video:.*/).toString().split(":")[1];
                        clipList.push({
                           id: shortId,
                            youtubeLink: "http://www.youtube.com/watch?v=" + shortId,
                            title: entry.title.$t,
                            thumbnail: entry.media$group.media$thumbnail[1].url,
                            description: entry.media$group.media$description.$t,
                            author: entry.author[0].name.$t,
                            publishDate: date.toUTCString(),
                            viewCount: entry.yt$statistics.viewCount
                        });
                    }
                }
                return clipList;
            }
    ```
10. Данные с YouTube получаться с помощью JSONP запроса (например: http://gdata.youtube.com/feeds/api/videos/?callback=myJsonPCallback&v=2&alt=json&max-results=15&start-index=1&q=javascript )
11. Ролики (компоненты) листаются только страницами
12. Если при ресейзе окна количество компонентов уменьшилось/увеличилось, крайний левый компонент из предыдущего состоянию должен быть представлен в новом состоянии (но не обязательно в крайней левой позиции). При дальнейшем ресайзе будет учитываться компонент который  в новом состоянии находиться в крайней левой позиции.
13. По mousedown на пейджинге должен появляться tooltip с номером страницы
