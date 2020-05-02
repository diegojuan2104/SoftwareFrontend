export default {
  data() {
    return {
      evaluacion: {
        idEvaluacion: "",
        fecha: "",
        observaciones: "",
        estado: "",
        idPropuesta: "",
        acciones: true,
      },
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

    
      lista_evaluaciones: [
      ],


      opciones_estado: [
        { value: "Rechazado", text: "Rechazado" },
        { value: "Aceptado", text: "Aceptado" },
        { value: "Incompleto", text: "Incompleto" }
      ]
    };
  },

  mounted() {
    this.created();
  },

  methods: {
    created() {
      let listaObtenida = JSON.parse(localStorage.getItem("ListaEvaluacion"));
      let lista_propuestas = JSON.parse(localStorage.getItem("Lista"));
      if (listaObtenida) {
        this.lista_evaluaciones = listaObtenida
      } else {
        this.lista_propuestas = []
      }
    },

    crearEvaluacion() {
      let encontrado = this.lista_evaluaciones.findIndex(
        evaluacion => evaluacion.idPropuesta == item.idEvaluacion
      );

      this.evaluacion.idEvaluacion = this.lista_evaluaciones.length + 1;
      this.lista_evaluaciones.push(this.evaluacion);
      console.log(this.lista_propuestas)
      localStorage.setItem("listaEvaluacion", JSON.stringify(this.lista_evaluaciones))
      this.limpiarCampos()
    },

    limpiarCampos() {

      this.evaluacion = {
        idEvaluacion: "",
        fecha: "",
        observaciones: "",
        estado: "",
        idPropuesta: "",
        acciones: true,
      }
    },


    eliminarEvaluacion({ item }) {
      let posicion = this.lista_evaluaciones.findIndex(
        evaluacion => evaluacion.idPropuesta == item.idEvaluacion
      );
      this.lista_evaluaciones.splice(posicion, 1);
      localStorage.setItem("listaEvaluacion", JSON.stringify(this.lista_evaluaciones))
    },
    cargarEvaluacion({ item }) {
      let ev = this.lista_evaluaciones.find(
        evaluacion => evaluacion.idEvaluacion == item.idEvaluacion
      );
      this.enEdicion = true;
      this.evaluacion = Object.assign({}, ev);
    },

    actualizarEvaluacion() {
      let posicion = this.lista_evaluaciones.findIndex(
        x => x.idEvaluacion == this.evaluacion.idEvaluacion
      );
      this.lista_evaluaciones.splice(posicion, 1, this.evaluacion);
      localStorage.setItem("listaEvaluacion", JSON.stringify(this.lista_evaluaciones))
      this.limpiarCampos()
      this.enEdicion = false
    },
  }
};