export default {
  data() {
    return {
      enEdicion: false,
      propuesta: {
        idPropuesta: "",
        identificacion:"",
        nombreEntidad: "",
        ocupacion:"",
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
      ],
      propuestareducida: {
        id: "",
        nombreEntidad: "",
        nombreRepresentante: "",
        email: "",
        iniciativa: "",
        estadoPropuesta: "",
        Modificar: true,
        Eliminar: true
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
  mounted(){
    this.created();
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
      this.propuestareducida.Modificar = true
      this.propuestareducida.Eliminar = true
      this.listareducida.push(this.propuestareducida)
      localStorage.setItem("Lista", JSON.stringify(this.lista_propuestas))
      localStorage.setItem("ListaReducida", JSON.stringify(this.listareducida))
      
      this.limpiarCampos()

      console.log(this.lista_propuestas)

    },
    created() {
      let listaObtenida = JSON.parse(localStorage.getItem("Lista"));
      let listaReducida = JSON.parse(localStorage.getItem("ListaReducida"));
      if (listaObtenida) {
        this.lista_propuestas = listaObtenida
      } else {
        this.lista_propuestas = []
      }
      if (listaReducida) {
        this.listareducida = listaReducida
      } else {
        this.listareducida = []
      }
  
    },
    eliminarPropuesta({ item }) {
      let posicion = this.lista_propuestas.findIndex(
        propuesta => propuesta.idPropuesta == item.id
      );
      this.lista_propuestas.splice(posicion, 1);
      this.listareducida.splice(posicion,1)
      localStorage.setItem("Lista", JSON.stringify(this.lista_propuestas))
      localStorage.setItem("ListaReducida", JSON.stringify(this.listareducida))
    },
    cargarPropuesta({ item }) {
      let prop = this.lista_propuestas.find(
        propuesta => propuesta.idPropuesta == item.id
      );
      this.enEdicion = true;
      this.propuesta = Object.assign({}, prop);
    },

    limpiarCampos() {
      this.propuestareducida = {
        id: "",
        nombreEntidad: "",
        nombreRepresentante: "",
        email: "",
        iniciativa: "",
        estadoPropuesta: ""
      }
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
        x => x.identificacion == this.propuesta.identificacion
      );
      this.lista_propuestas.splice(posicion, 1, this.propuesta);
      this.propuestareducida.id = this.propuesta.idPropuesta
      this.propuestareducida.nombreEntidad = this.propuesta.nombreEntidad
      this.propuestareducida.nombreRepresentante = this.propuesta.nombreCompletoRep
      this.propuestareducida.email = this.propuesta.emailRep
      this.propuestareducida.iniciativa = this.propuesta.iniciativa
      this.propuestareducida.estadoPropuesta = this.propuesta.estado
      this.propuestareducida.Modificar = true
      this.propuestareducida.Eliminar = true
      this.listareducida.splice(posicion, 1, this.propuestareducida);
      localStorage.setItem("Lista", JSON.stringify(this.lista_propuestas))
      localStorage.setItem("ListaReducida", JSON.stringify(this.listareducida))
      this.limpiarCampos()
      this.enEdicion = false
    },
  },
};