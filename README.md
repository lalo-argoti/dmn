# React Microfrontend User App

Esta aplicación React consume una API que gestiona usuarios. Incluye funcionalidades como listado de usuarios, búsqueda por nombre y paginación. También incluye un **micro frontend** responsable del listado de usuarios, que puede cargarse de forma independiente y se comunica con la aplicación principal mediante props o eventos.

---

## 🚀 Tecnologías

- React 18+

```
  npm create vite@latest shell --template react-ts
```  
  
- Vite (como bundler moderno)
- TypeScript
- SQL Server (Docker)
- Express (Node.js API)
- Module Federation (para micro frontend)
- Axios (consumo de API)
- Zustand (manejo de estado interno)
- TailwindCSS (estilos rápidos y limpios)

---

## 🧱 Estructura de Proyecto

```
user-app/
├── apps/
│ ├── shell/ # Aplicación principal (host)
│ └── user-listing-mf/ # Micro frontend para listado de usuarios
├── packages/
│ └── api/ # Backend Express con conexión a SQL Server
├── docker/
│ └── sqlserver/ # Archivos para levantar SQL Server con Docker
├── shared/ # Código reutilizable entre micro frontends
│ └── ui/ # Componentes comunes, hooks, utilidades
├──databases
├ └── scrpts # Con una primera tabla
└── README.md
```

---

## 🛠️ Primeros Pasos

### 1. Clonar el repositorio

```bash

git clone https://github.com/tu-usuario/user-app.git
cd user-app
```

### 2. Instalar dependencias

```
npm install
```

### 3. Levantar base de datos (SQL Server vía Docker)

```
cd docker/sqlserver
docker-compose up -d
```

Esto creará un contenedor SQL Server con las tablas necesarias (ver más abajo).

### 4. Levantar backend (API)

```
cd packages/api
npm run dev
```
## 4.1 Tests unitarios

```
packages/api$ npm test

> api@1.0.0 test
> jest --passWithNoTests


  console.log
    se ha llamado a %Carlos%

      at src/controllers/user.controller.ts:26:13

 PASS  src/tests/controllers/user.controller.test.ts
  User Controller
    ✓ debería retornar usuarios con getUsers (24 ms)
    ✓ debería retornar un usuario con getUserById (1 ms)
    ✓ debería retornar 404 si el usuario no existe

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.602 s, estimated 6 s
Ran all test suites.
```

### 5. Levantar aplicación React

```
cd apps/shell
npm run dev
```



Esto iniciará la aplicación principal en http://localhost:5173.

🧩 Micro Frontend (user-listing-mf)
Utiliza Module Federation.

Se comunica con el host (shell) mediante props o un event bus.

Tiene su propio manejo de estado, lógica de búsqueda y paginación.

### 6. 🧾 Base de Datos (SQL Server)
Tablas (prefijo dmn_)
sql

```
cd databases
docker exec -it sqlserver_container /opt/mssql-tools/bin/sqlcmd \
   -S localhost -U SA -P 'PruebDeTalento!' \
   -i /scripts/crear.sql
```

```
docker-compose up -d

```

## Así tenemos:

Servidor: localhost,1433

Usuario: SA

Contraseña: PruebDeTalento!

```
CREATE TABLE dmn_users (
    id INT PRIMARY KEY IDENTITY(1,1),
    first_name NVARCHAR(100),
    last_name NVARCHAR(100),
    email NVARCHAR(150) UNIQUE,
    created_at DATETIME DEFAULT GETDATE()
);
```



🧰 Buenas Prácticas
Cada micro frontend debe ser autónomo (tiene su propio estado y lógica).

Comunicación entre micro frontends y shell mediante props o custom events.

Separar el código compartido en shared/.

Estilado simple y componetizado con TailwindCSS.

Tipado estático con TypeScript en todo el proyecto.

Manejo de errores centralizado en frontend y backend.

📝 Próximos Pasos
 Configurar Webpack Module Federation para micro frontend.

 Implementar API con Express (listar, buscar, paginar usuarios).

 Crear componentes iniciales en user-listing-mf.

 Conectar API con frontend usando Axios.

 Agregar pruebas unitarias básicas (Vitest o Jest).

📬 Contacto
Para dudas o mejoras, contacta con carlos.e.argoti@gmail.com.

```

