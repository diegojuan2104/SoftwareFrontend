import axios from "axios";
export default {
  beforeMount() {
    // Carga las propuestas,PENDIENTE falta validar que solo sean las de un usuario en especifico
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
        let idUser = sessionStorage.getItem("idUser");
        let token = sessionStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3001/api/v1/propuestasUsuarios/" + idUser,
          {
            headers: { token }
          }
        );
        this.propuestas = res.data;

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.propuestas.length; i++) {
          let propuestaReducida = {
            id: this.propuestas[i].id,
            tipo_de_convenio: this.propuestas[i].tipo_convenio,
            Estado: this.propuestas[i].estado,
            Modificar: true,
            Eliminar: true
          };
          this.propuestasReducidas.push(propuestaReducida);
        }

        console.log(this.propuestasReducidas);
        console.log(this.propuestas);
      } catch (error) {
        console.log(error);
        window.location.replace("http://localhost:3000/error");
      }
    },

    //Para seleccionar una entidad y agregarla a la tabla de registro
    seleccionarEntidad() {
      if (!this.entidadesAgregadas.includes(this.entidadSeleccionada)) {
        for (let i = 0; i < this.entidades.length; i++) {
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
        this.prouestas = [];
        this.propuestasReducidas = [];
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
        const propuestaEliminada = await axios.delete(
          "http://localhost:3001/api/v1/propuestas/" + item.id,
          { headers: { token } }
        );
        //Elimina los involucrados relacionados
        const res = await axios.delete(
          "http://localhost:3001/api/v1/involucrados/" + item.id,
          { headers: { token } }
        );

        let posicion1 = this.propuestas.findIndex(
          propuesta => propuesta.id == item.id_Propuesta
        );
        let posicion2 = this.propuestasReducidas.findIndex(
          propuestaReducida => propuestaReducida.id == item.id_Propuesta
        );
        this.propuestasReducidas.splice(posicion1, 1);
        this.entidadesAgregadasReducidas.splice(posicion2, 1);

        console.log(res);
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
    crearPropuesta() {
      try {
        let token = this.token();
        let propuesta = {
          infoContacto: this.propuesta.telefono,
          tipoConvenio: this.propuesta.tipoConvenio,
          descripcionIniciativa: this.propuesta.iniciativa,
          beneficios: this.propuesta.posiblesBeneficios,
          estado: "Etapa de Revisión"
        };

        axios
          .post("http://localhost:3001/api/v1/propuestas", propuesta, {
            headers: { token }
          })
          .then(res => {
            console.log(res);
            const idPropuestaCreada = res.data.id.id;

            let propuestaReducida = {
              id: idPropuestaCreada,
              tipo_de_convenio: propuesta.tipoConvenio,
              Estado: propuesta.estado,
              Modificar: true,
              Eliminar: true
            };

            const involucrados = {
              idUsuario: sessionStorage.getItem("idUser"),
              entidades: this.entidadesAgregadas,
              idPropuesta: idPropuestaCreada
            };
            console.log(involucrados);
            axios
              .post("http://localhost:3001/api/v1/involucrados", involucrados, {
                headers: { token }
              })
              .then(res => {
                this.limpiarCampos();
                this.propuestasReducidas.push(propuestaReducida);
                this.propuestas.push(propuesta);
                console.log(res);
              });
          });
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
      this.entidadesAgregadasReducidas = [];
      this.entidadesAgregadas = [];
    }
  }
};
