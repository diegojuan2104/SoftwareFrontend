import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
    this.cargarTareas();
  },

  data() {
    return {
      idTarea:"",
      nombreTarea:"",
      descripcionTarea:"",
      modalShow: false,
      propuestas: [],
      propuestasReducidas: [],
      tareas: [],
      tareasReducidas: [],
      enEvaluacion: false
    };
  },
  methods: {
    token() {
      let token = sessionStorage.getItem("token");
      return token;
    },
    // Carga las porpuestas en la tabla
    async cargarPropuestas() {
      try {
        const token = this.token();
        this.propuestaReducida = Array();
        this.propuestas = Array();
        const res = await axios.get("http://localhost:3001/api/v1/propuestas", {
          headers: { token }
        });
        this.propuestas = res.data;
        console.log(this.propuestas);

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.propuestas.length; i++) {
          let propuestaReducida = {
            id_Propuesta: this.propuestas[i].id,
            tipo_de_convenio: this.propuestas[i].tipo_convenio,
            estadoPropuesta: this.propuestas[i].estado,
            Detalles: true,
            evaluar: true
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
        const token = this.token();
        this.tareas = Array();
        const res = await axios.get("http://localhost:3001/api/v1/tareas", {
          headers: { token }
        });
        this.tareas = res.data;
        console.log(this.tareas);

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.tareas.length; i++) {
          let tareasReducida = {
            id: this.tareas[i].id,
            nombre_tarea: this.tareas[i].nombre,
            descripcion: true,
            aprobacion: true,
            pdf: true,
            comentario: true,
            evaluar: true
          };
          this.tareasReducidas.push(tareasReducida);
        }
        console.log(this.tareasReducidas);
      } catch (error) {
        console.log(error);
      }
    },

    cargarTareasPropuesta(i) {
      this.enEvaluacion = true;
      console.log(i);
    },

    detallesTarea({ item }) {
      console.log(item.id);
      console.log(this.tareas[item.id])

      this.idTarea=this.tareas[item.id].id
      this.nombreTarea=this.tareas[item.id].nombre
      this.descripcionTarea=this.tareas[item.id].descripcion



    }
  }
};
