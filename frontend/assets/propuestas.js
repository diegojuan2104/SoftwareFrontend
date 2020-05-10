import config from "@/assets/config/index";
import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
    this.cargarEntidades();
  },

  data() {
    return {
      //Propuesta Completa
      propuesta: {
        idPropuesta: "",
        telefono: "",
        tipoConvenio: "",
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      },
      propuestas: [],
      entidades: [
        {
          id: 1,
          nombre: "Eafit"
        },
        {
          id: 2,
          nombre: "UPB"
        }
      ],
      entidadesAgregadas: [],
      enEdicion: false,
      entidadSeleccionada: null,

      //Propuesta Reducida
      propuestasReducidas: [],
      entidadesAgregadasReducidas: [],
      entidadesReducidas: [
        {
          value: null,
          text: "Seleccione una entidad"
        }
      ]
    };
  },
  methods: {
    async cargarPropuestas() {
      try {
        this.propuestaReducida = Array();
        this.propuestas = Array();
        let url = config.url_api;
        const res = await axios.get("http://localhost:3001/api/v1/propuestas");
        this.propuestas = res.data;
        console.log(this.propuestas);

        //Se añaden datos a lista reducida

        for (let i = 0; i < this.propuestas.length; i++) {
          let propuestaReducida = {
            id_Propuesta: this.propuestas[i].idpropuesta,
            tipo_de_convenio: this.propuestas[i].nombreentidad,
            estadoPropuesta: this.propuestas[i].estadoconvenio,
            Modificar: true,
            Eliminar: true
          };
          this.propuestasReducidas.push(propuestaReducida);
        }
        console.log(this.propuestasReducidas);
      } catch (error) {
        console.log(error);
      }
    },

    seleccionarEntidad() {
      if (!this.entidadesAgregadas.includes(this.entidadSeleccionada)) {
        console.log(this.entidadSeleccionada);

        for (let i = 0; i < this.entidades.length; i++) {
          console.log(this.entidades[i].id);
          if (this.entidades[i].id == this.entidadSeleccionada) {
            let entidadAgregada = {
              id_Entidad: this.entidades[i].id,
              Nombre_Entidad: this.entidades[i].nombre,
              Detalles: true,
              Eliminar: true
            };
            this.entidadesAgregadasReducidas.push(entidadAgregada);
            this.entidadesAgregadas.push(this.entidadSeleccionada);
            this.entidadSeleccionada = null;
            break;
          }
        }
      }
    },

    cargarEntidades() {
      //this.entidadesReducidas = Array();
      try {
        for (let i = 0; i < this.entidades.length; i++) {
          let entidadReducida = {
            text: this.entidades[i].nombre,
            value: this.entidades[i].id,
            id: this.entidades[i].id
          };
          this.entidadesReducidas.push(entidadReducida);
        }
        document.getElementById("entidadSeleccionada").selectedIndex = 0;
      } catch (error) {
        console.log(error);
      }
    },

    recargarPagina() {
      window.location.replace("http://localhost:3000/propuestas");
    },

    async eliminarPropuesta({ item }) {
      try {
        let url = config.url_api;
        const res = await axios.delete(
          "http://localhost:3001/api/v1/propuestas/" + item.id_Propuesta
        );
        let propuesta = res.data;
        console.log(propuesta);
        this.recargarPagina();
      } catch (error) {
        console.log(error);
      }
    },

    eliminarEntidad({ item }) {
      let posicion = this.entidadesAgregadas.findIndex(
        entidadesAgregada => entidadesAgregada.id == item.id
      );
      this.entidadesAgregadas.splice(posicion, 1);
      this.entidadesAgregadasReducidas.splice(posicion, 1);
    },

    async crearPropuesta() {
      try {
        let propuesta = {
          telefonoPersona: this.propuesta.telefono,
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
        this.recargarPagina();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    limpiarCampos() {
      this.propuesta = {
        tipoConvenio: "",
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      };
    }
  }
};
