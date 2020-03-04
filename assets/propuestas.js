export default {
    data() {
      return {
        enEdicion: false,
        propuesta: {
          idPropuesta:"",
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
            idPropuesta:"1",
            nombreEntidad: "Comfama",
            nombreCompletoRep: "Juan José Gomez Campe",
            emailRep: "elcampin@gmail.com",
            telefonoRep: "911",
            direccionRep: "Cll Botadero, Robledo ",
            tipoConvenio:"Idiomas",
            iniciativa:"Cultural",
            posiblesBeneficios:"Aprendizaje",
            estado:""
          }
        ],
        
        opciones_convenio: [
          { value: null, text: "Seleccione un convenio", disabled: true },
          { value: "001", text: "Convenio de intercambio" },
          { value: "002", text: "Otro tipo de convenio..." },
        ]
      };
    },
    
    created(){
      let datosDB = JSON.parse (localStorage.getItem('infoDB'));
      console.log(datosDB)
    },
    methods: {
      crearPropuesta() {
        this.propuesta.estado = "Etapa de Revisión",
        this.propuesta.idPropuesta = this.lista_propuestas.length,
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
          tipoConvenio:"",
          iniciativa:"",
          posiblesBeneficios:"",
          estado:""
        };
      },
    },
  };