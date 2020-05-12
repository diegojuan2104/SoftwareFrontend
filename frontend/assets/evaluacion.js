import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
    this.cargarTareas();
  },

  data() {
    return {
      propuestas: [],
      propuestasReducidas: [],
      tareas: [],
      tareasReducidas: []
    };
  },
  methods: {
    // Carga las porpuestas en la tabla
    async cargarPropuestas() {
      try {
        this.propuestaReducida = Array();
        this.propuestas = Array();
        const res = await axios.get("http://localhost:3001/api/v1/propuestas");
        this.propuestas = res.data;
        console.log(this.propuestas);

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.propuestas.length; i++) {
          let propuestaReducida = {
            id_Propuesta: this.propuestas[i].id,
            tipo_de_convenio: this.propuestas[i].tipo_convenio,
            estadoPropuesta: this.propuestas[i].estado,
            Detalles: true,
            Eliminar: true
          };
          this.propuestasReducidas.push(propuestaReducida);
        }
        console.log(this.propuestasReducidas);
      } catch (error) {
        console.log(error);
      }
    },
    async cargarTareas() {
      try {
        this.tareasReducidas = Array();
        this.tareas = Array();
        const res = await axios.get("http://localhost:3001/api/v1/tareas");
        this.tareas = res.data;
        console.log(this.tareas);

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.tareas.length; i++) {
          let tareasReducida = {
            nombre_tarea: this.tareas[i].nombre,
            detalles: true,    //boton
            aprobacion: true,    //check
            pdf: true,   //boton pdf
            comentario: true  //campo de texto
          };
          this.tareasReducidas.push(tareasReducida);
        }
        console.log(this.tareasReducidas);
      } catch (error) {
        console.log(error);
      }
    }


  }
};