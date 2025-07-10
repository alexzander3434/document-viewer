# DocumentViewer

Вариант выполнения тестового задания.
Использован Angular v.19 и TaigaUI v.4.44.
Для перемещения элементов используется нативный html-draggable.
Альтернативно (закомментировано) есть иной способ расчета перемещения.
Для размещения комментария необходимо вызвать контекстное меню (правый клик) в требуемом месте документа.
Экспериментально предоставлена возможность изменять ориентацию для элемента комментария.
По-умолчанию - позиционирование комментария - слева. Для иных позиций при зуме неообходим прерасчет смещения.
Для редактирования содержимого комментария используется content-editable блок.
Возможно здесь необходим доп. функционал, ограничивающий использование тэгов (domSanitizer, safeHTMLPipe).

В данном состоянии интерфейс не предназначен для работы на мобильном/сенсорном устройстве. При помощи сервисов TaigaUI (или иным способом) можно переопределять типы событий (touchstart, touchend) для адаптации функций перемещения комментариев и др.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Development server

To install, run:

````bash
npm i --force

To start a local development server, run:

```bash
ng serve
````

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
