Запуск:
	Скопировать репозиторий;
		Открыть корневую папку, запустить mvn install;
		Включить MySQL, создать пустую базу данных;
		Открыть файл target/classes/application.properties;
		В первой строке подставить данные от своей базы(вместо "localhost:3306" подставить порт, на котором работает база данных, после слеша написать название базы данных);
		Во второй и третьей строке после равно написать юзернейм и пароль для базы данных;
		В папке target запустить в консоли команду: java -jar employee-0.0.1-SNAPSHOT.jar --spring.config.location={полный путь к папке проекта}\target\classes\application.properties
		Открыть в браузере http://localhost:8080/

Технологии:
	Java, Spring boot, ReactJS, JS, Axios, Maven, Bootstrap, MySQL.

Функционал:
	List(список всех сотрудников):
		Переход на карточку сотрудника(кнопка View);
		Переход к изменению сотрудника(кнопка Update);
		Удаление сотрудника(кнопка Delete);
		Фильтрация по фамилии, имени, отчеству, должности, отделу;
		Выгрузка файла xlsx со всеми сотрудниками(Download excel).
		
	Add(добавление сотрудника):
		Добавление нового сотрудника(редактирование старого, если была нажата кнопка Update);
		Добавление отдела из выпадающего списка отделов из бд;
		Добавление фотографии сотрудника.
		
	Department(добавление отдела):
		Добавление нового отдела в базу данных