export default {
  data() {
    return {
      enEdicion: false,
      propuesta: {
        idPropuesta: "",
        nombreEntidad: "",
        nombreCompletoRep: "",
        emailRep: "",
        telefonoRep: "",
        direccionRep: "",
        tipoConvenio: "",
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      },
      lista_propuestas: [
        {
          idPropuesta: "1",
          nombreEntidad: "Comfama",
          nombreCompletoRep: "Juan José Gomez Campe",
          emailRep: "elcampin@gmail.com",
          telefonoRep: "911",
          direccionRep: "Cll Botadero, Robledo ",
          tipoConvenio: "Idiomas",
          iniciativa: "Cultural",
          posiblesBeneficios: "Aprendizaje",
          estado: ""
        }
      ],
      propuestareducida: {
        id: "",
        nombreEntidad: "",
        nombreRepresentante: "",
        email: "",
        iniciativa: "",
        estadoPropuesta: ""
      },



      listareducida: [{
        id: "1",
        nombreEntidad: "confama",
        nombreRepresentante: "juan jose gomez campe",
        email: "elcampin@gmail.com",
        iniciativa: "Cultural",
        estadoPropuesta: ""
      }],

      opciones_convenio: [
        { value: null, text: "Seleccione un convenio", disabled: true },
        { value: "001", text: "Convenio de intercambio" },
        { value: "002", text: "Otro tipo de convenio..." },
      ]
    };
  },

  created() {
    let listaObtenida = JSON.parse(localStorage.getItem("Lista"));
    if (listaObtenida) {
      this.lista_propuestas = listaObtenida
    } else {
      this.lista_propuestas = []
    }
  },
  methods: {
    crearPropuesta() {

      this.propuesta.estado = "Etapa de Revisión",
      this.propuesta.idPropuesta = this.lista_propuestas.length + 1,
      this.lista_propuestas.push(this.propuesta);
      this.propuestareducida.id = this.propuesta.idPropuesta
      this.propuestareducida.nombreEntidad = this.propuesta.nombreEntidad
      this.propuestareducida.nombreRepresentante = this.propuesta.nombreCompletoRep
      this.propuestareducida.email = this.propuesta.emailRep
      this.propuestareducida.iniciativa = this.propuesta.iniciativa
      this.propuestareducida.estadoPropuesta = this.propuesta.estado
      this.listareducida.push(this.propuestareducida)
      localStorage.setItem("Lista", JSON.stringify(this.lista_propuestas))
      this.limpiarCampos()

      console.log(this.lista_propuestas)

    },
    eliminarPropuesta({ item }) {
      let posicion = this.lista_propuestas.findIndex(
        propuesta => estudiante.idPropuesta == item.id
      );
      this.lista_estudiantes.splice(posicion, 1);
    },
    cargarPropuesta({ item }) {
      let prop = this.lista_propuestas.find(
        propuesta => propuesta.idPropuesta == item.id
      );
      this.enEdicion = true;
      this.estudiante = Object.assign({}, prop);
    },

    limpiarCampos() {
      this.propuesta = {
        nombreEntidad: "",
        nombreCompletoRep: "",
        emailRep: "",
        telefonoRep: "",
        direccionRep: "",
        tipoConvenio: "",
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      }
    },



    actualizarPropuesta() {
      let posicion = this.lista_propuestas.findIndex(
        propuesta => propuesta.idPropuesta == this.estudiante.id
      );
      this.lista_estudiantes.splice(posicion, 1, this.estudiante);
      this.propuesta = {
        nombreEntidad: "",
        nombreCompletoRep: "",
        emailRep: "",
        telefonoRep: "",
        direccionRep: "",
        tipoConvenio: "",
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      };
    },
  },
};