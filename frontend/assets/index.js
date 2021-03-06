import axios from "axios";
const config = {
  url: "https://gestion-propuestas-api.herokuapp.com/api/v1/",
  url2: "http://localhost:3000/"
};
export default {
  mounted() {
    let token = localStorage.getItem("token");
    if (token != "") {
      console.log(token);
      axios
        .get(url + "autenticacion/" + token, {
          headers: { token: token }
        })
        .then(res => {
          console.log(res);
          const user = res.data.id;
          const userRol = res.data.rol;
          gi;
          console.log(user);
          console.log(userRol);
          localStorage.setItem("idUser", user);
          localStorage.setItem("userRol", userRol);
          localStorage.setItem("token", token);

          if (userRol == 2) {
            window.location.replace(config.url2 + "/evaluaciones");
          } else {
            window.location.replace(config.url2 + "propuestas");
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("Iniciar Sesión");
    }
  },
  beforeMount() {
    localStorage.setItem("idUser", "");
    localStorage.setItem("userRol", "");
  },

  data() {
    return {
      correo: "",
      clave: ""
    };
  },
  methods: {
    async iniciarSesion() {
      try {
        let log = {
          correo: this.correo,
          clave: this.clave
        };
        let res = await axios.post(config.url + "login", log);
        console.log(res);
        const token = res.data.info;
        const user = res.data.usuario.id;
        const userRol = res.data.usuario.rol;
        console.log(user);
        console.log(userRol);
        localStorage.setItem("idUser", user);
        localStorage.setItem("userRol", userRol);
        localStorage.setItem("token", token);
        //axios.defaults.headers.common["Authorization"] = token;
        if (userRol == 2) {
          window.location.replace(config.url2 + "evaluaciones");
        } else {
          window.location.replace(config.url2 + "propuestas");
        }
      } catch (error) {
        alert("Contraseña y/o usario incorrectos");
      }
    }
  }
};
