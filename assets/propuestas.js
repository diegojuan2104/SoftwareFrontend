export default {
    data() {
      return {
        enEdicion: false,
        propuesta: {
          nombreEntidad: "",
          nombreCompletoRep: "",
          emailRep: "",
          telefonoRep: "",
          direccionRep: "",
          tipoConvenio:"",
          iniciativa:"",
          posiblesBeneficios:"",
          estado:""
        },
        lista_propuestas: [
          {
          }
        ],
        opciones_convenio: [
          { value: null, text: "Seleccione un convenio", disabled: true },
          { value: "001", text: "Convenio de intercambio" },
          { value: "002", text: "Otro tipo de convenio..." },
        ]
      };
    },
    methods: {
      crearPropuesta() {
        this.propuesta.estado = "Etapa de Revisión"
        this.lista_propuestas.push(this.propuesta);
        this.propuesta = {
          nombreEntidad: "",
          nombreCompletoRep: "",
          emailRep: "",
          telefonoRep: "",
          direccionRep: "",
          tipoConvenio:"",
          iniciativa:"",
          posiblesBeneficios:"",
          estado:""
        };
        console.log(this.lista_propuestas)
      },
      eliminarPropuesta({ item }) {
        let posicion = this.lista_estudiantes.findIndex(
          estudiante => estudiante.id == item.id
        );
        this.lista_estudiantes.splice(posicion, 1);
      },
      cargarEstudiante({ item }) {
        let estu = this.lista_estudiantes.find(
          estudiante => estudiante.id == item.id
        );
        this.enEdicion = true;
        this.estudiante = Object.assign({}, estu);
      },
      actualizarEstudiante() {
        let posicion = this.lista_estudiantes.findIndex(
          estudiante => estudiante.id == this.estudiante.id
        );
        this.lista_estudiantes.splice(posicion, 1, this.estudiante);
        this.estudiante = {
          id: "",
          nombre: "",
          edad: 0,
          correo: "",
          carrera: null,
          acciones: true
        };
      }
    }
  };