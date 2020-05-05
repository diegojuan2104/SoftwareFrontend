import config from "@/assets/config/index";
import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
  },

  data() {
    return {
      //Propuesta Completa
      propuesta: {
        idPropuesta: "",
        identificacion: "",
        nombreEntidad: "",
        ocupacion: "",
        nombreCompleto: "",
        email: "",
        telefono: "",
        direccion: "",
        tipoConvenio: "",
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      },
      propuestas: [],
      enEdicion: false,

      //Propuesta Reducida
      propuestasReducidas: []
    };
  },
  methods: {
    async cargarPropuestas() {
      try {
        this.propuestas = [];
        this.propuestasReducidas = [];
        let url = config.url_api;
        const res = await axios.get("http://localhost:3001/api/v1/propuestas");
        this.propuestas = res.data;

        //Se añaden datos a lista reducida
        this.propuestas.forEach(propuesta => {
          let propuestaReducida = {
            id_Propuesta: propuesta.idpropuesta,
            nombreEntidad: propuesta.nombreentidad,
            nombre: propuesta.nombrecompletopersona,
            email: propuesta.email,
            estadoPropuesta: propuesta.estadoconvenio,
            Modificar: true,
            Eliminar: true
          };
          this.propuestasReducidas.push(propuestaReducida);
          console.log(this.propuestasReducidas);
        });
        console.log(this.propuestas);
      } catch (error) {
        console.log(error);
      }
    },

    async eliminarPropuesta({ item }) {
      try {
        let url = config.url_api;
        const res = await axios.delete(
          "http://localhost:3001/api/v1/propuestas/" + item.id_Propuesta
        );
        let propuesta = res.data;
        console.log(propuesta);
        this.cargarPropuestas();
      } catch (error) {
        console.log(error);
      }
    },

    async crearPropuesta() {
      try {
        let propuesta = {
          identificacion: this.propuesta.identificacion,
          nombreEntidad: this.propuesta.nombreEntidad,
          ocupacionPersona: this.propuesta.ocupacion,
          nombreCompletoPersona: this.propuesta.nombreCompleto,
          email: this.propuesta.email,
          ocupacionPersona: this.propuesta.ocupacion,
          telefonoPersona: this.propuesta.telefono,
          direccionPersona: this.propuesta.direccion,
          tipoConvenio: this.propuesta.tipoConvenio,
          descripcionIniciativa: this.propuesta.iniciativa,
          posiblesBeneficios: this.propuestas.posiblesBeneficios,
          estadoConvenio: "Etapa de Revisión"
        };

        let res = await axios.post(
          "http://localhost:3001/api/v1/propuestas",
          propuesta
        );
        this.limpiarCampos();
        console.log(res);
        this.cargarPropuestas();
      } catch (error) {
        console.log(error);
      }
    },

    limpiarCampos() {
      this.propuesta = {
        nombreEntidad: "",
        nombreCompleto: "",
        email: "",
        telefono: "",
        direccion: "",
        tipoConvenio: "",
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      };
    }
  }
};
