import axios from "axios";
export default {
  beforeMount() {
    // Carga las propuestas, falta validar que solo sean las de un usuario en especifico
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
      entidades: [],
      //Lista de entidade agregadas temporalmente al registro
      entidadesAgregadas: [],
      //Para modificar un convenio
      enEdicion: false,
      //valor de la entidad seleccionada en determinado instante
      entidadSeleccionada: null,

      //Lista de la propuesta reducida, para poder visualizarla correctamente en la tabla
      propuestasReducidas: [],
      //Lista con solo el id y nombre de la entidades seleccionadas,para verla en el combo box o select
      entidadesAgregadasReducidas: [],
      //Lista de todas las entidades reducidas
      entidadesReducidas: [
        {
          value: null,
          text: "Seleccione una entidad"
        }
      ]
    };
  },
  methods: {
    // Carga las porpuestas en la tabla
    async cargarPropuestas() {
      try {
        this.propuestaReducida = []
        this.propuestas = []
        let token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/v1/propuestas", {
          headers: { token }
        });
        this.propuestas = res.data;

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.propuestas.length; i++) {
          let propuestaReducida = {
            id_Propuesta: this.propuestas[i].id,
            tipo_de_convenio: this.propuestas[i].tipo_convenio,
            estadoPropuesta: this.propuestas[i].estado,
            Modificar: true,
            Eliminar: true
          };
          this.propuestasReducidas.push(propuestaReducida);
        }
      } catch (error) {
        console.log(error);
        window.location.replace("http://localhost:3000/error");
      }
    },

    //Para seleccionar una entidad y agregarla a la tabla de registro
    seleccionarEntidad() {
      if (!this.entidadesAgregadas.includes(this.entidadSeleccionada)) {
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

    //Carga las entidades ya registradas en la bd
    async cargarEntidades() {
      //this.entidadesReducidas = Array();
      try {
        let token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/v1/entidades", {
          headers: { token }
        });
        this.entidades = res.data;

        for (let i = 0; i < this.entidades.length; i++) {
          let entidadReducida = {
            text: this.entidades[i].nombre,
            value: this.entidades[i].id,
            id: this.entidades[i].id
          };
          this.entidadesReducidas.push(entidadReducida);
        }
      } catch (error) {
        console.log(error);
      }
    },
    //F5
    recargarPagina() {
      window.location.replace("http://localhost:3000/propuestas");
    },

    token() {
      let token = sessionStorage.getItem("token");
      return token;
    },
    //Elimina una propuesta realizada
    async eliminarPropuesta({ item }) {
      try {
        let token = sessionStorage.getItem("token");
        const res = await axios.delete(
          "http://localhost:3001/api/v1/propuestas/" + item.id_Propuesta,
          { headers: { token } }
        );
        let propuesta = res.data;
        this.recargarPagina();
      } catch (error) {
        console.log(error);
      }
    },

    //Elimina una entidad de la tabla seleccionada
    eliminarEntidad({ item }) {
      let posicion = this.entidadesAgregadas.findIndex(
        entidadesAgregada => entidadesAgregada.id == item.id
      );
      this.entidadesAgregadas.splice(posicion, 1);
      this.entidadesAgregadasReducidas.splice(posicion, 1);
    },
    //Crea la propuesta
    async crearPropuesta() {
      try {
        let token = this.token();
        let propuesta = {
          infoContacto: this.propuesta.telefono,
          tipoConvenio: this.propuesta.tipoConvenio,
          descripcionIniciativa: this.propuesta.iniciativa,
          beneficios: this.propuesta.posiblesBeneficios,
          estado: "Etapa de Revisión"
        };

        let res1 = await axios.post(
          "http://localhost:3001/api/v1/propuestas",
          propuesta,
          { headers: { token } }
        );

        console.log(res1.data.id);
        this.cargarPropuestas();
        this.limpiarCampos();
        // this.recargarPagina();
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
