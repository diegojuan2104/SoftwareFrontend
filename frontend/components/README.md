
```js
const SECRET_KEY = '746f4325c687b8823db156b7c9e98dd665a1e3777f501997345b19d9bd99e118754928e78011b5b1bfd66482a17f87bab58bd0d4311f8a9141359a42ddfea07f'
```
 ***TODOS los proyectos deben tener esta SECRET_KEY.***
 ---

 ___

 ## ENDPOINT DE PERMISOS

```js
let token = localStorage.getItem("token");

axios
  .post(
    "https://seguridad-udem-api.herokuapp.com/api/v1/verify",
    {
      Modulo: "Nombre de Módulo",
    },
    { headers: { token: token } }
  )
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
    location.href = "https://proyecto-seguridad-udem.herokuapp.com/login";
  });
```

## IMPORTANTE

- Copiar y pegar en el método que se ejecuta al cargar la página.

- El nombre del módulo debe coincidir con el que está en la base de datos (mirar en la BD y copiar el nombre correspondiente a su móudlo).

- Cuando tengan su proyecto desplegado en Heroku, poner la url resultante en el campo ***'url'*** de la tabla ***'acc_modulos'*** en la base de datos. Pueden hacerlo manualmente desde PgAdmin.
