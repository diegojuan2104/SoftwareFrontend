import axios from "axios";
export default {
  mounted() {
    let token = localStorage.getItem("token");
    if (token != "") {
      console.log(token);
      axios
        .get("http://localhost:3001/api/v1/autenticacion/" + token, {
          headers: { token: token }
        })
        .then(res => {
          console.log(res);

          const user = res.data.id;
          const userRol = res.data.rol;
          console.log(user);
          console.log(userRol);
          sessionStorage.setItem("idUser", user);
          sessionStorage.setItem("userRol", userRol);
          sessionStorage.setItem("token", token);

          if (userRol == 2) {
            window.location.replace("http://localhost:3000/evaluaciones");
          } else {
            window.location.replace("http://localhost:3000/propuestas");
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
    sessionStorage.setItem("idUser", "");
    sessionStorage.setItem("userRol", "");
    sessionStorage.setItem("token", "");
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
        let res = await axios.post("http://localhost:3001/api/v1/login", log);
        console.log(res);
        const token = res.data.info;
        const user = res.data.usuario.id;
        const userRol = res.data.usuario.rol;
        console.log(user);
        console.log(userRol);
        sessionStorage.setItem("idUser", user);
        sessionStorage.setItem("userRol", userRol);
        sessionStorage.setItem("token", token);
        //axios.defaults.headers.common["Authorization"] = token;
        if (userRol == 2) {
          window.location.replace("http://localhost:3000/evaluaciones");
        } else {
          window.location.replace("http://localhost:3000/propuestas");
        }
      } catch (error) {
        alert("Contraseña y/o usario incorrectos");
      }
    }
  }
};
