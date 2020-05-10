import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
    this.cargarEntidades();
  },

  data() {
    return {
      correo: "",
      contrasena: ""
    };
  },
  methods: {
    async login() {
      try {
        let log = {
          correo: this.correo,
          contrasena: this.contrasena
        };
        let res = await axios.post(
          "http://localhost:3001/api/v1/propuestas",
          log
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
