# tasks_crud
## Descripción
 * Prueba técnica, ReactJS, .NET Core

## How to run backend
* Run `dotnet build`
* Run `dotnet run`

## API Documentación
[Documentación de la API (BACKEND)](https://localhost:5001/swagger/index.html).

## How to run frontend
* Run `yarn install` o `npm install`
* Run `yarn start` o `npm start`


### El backend usa una combinación de SQLite y EntityFramework Core, por tal razón no hace falta configurar nada, en caso de usar SQL Server este sería el Query

```sql
create database app
go

use app
go

create table Status(
Id int not null identity primary key,
Description text not null)


insert into Status (Description) values
('Activa'),
('Inactiva'),
('Completada');


create table Tasks(
Id int not null identity primary key,
TItle varchar(255) not null,
Description text not null,
StatusId int not null,
constraint FK_Tasks_Status_StatusId foreign key(StatusId) references Status(id)
);

go
```