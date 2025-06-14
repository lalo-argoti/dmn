CREATE DATABASE miBaseDatos;
GO

USE miBaseDatos;
GO

-- crear tabla
CREATE  TABLE dmn_users (
id INT PRIMARY KEY IDENTITY(1,1),
first_name NVARCHAR(100),
last_name NVARCHAR(100),
email NVARCHAR(150) UNIQUE,
created_at DATETIME DEFAULT GETDATE()
);
