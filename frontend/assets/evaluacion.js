import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
    this.cargarTareas();
    
  },

  data() {
    return {
      modalShow: false,
      propuestas: [],
      propuestasReducidas: [],
      tareas: [],
      tareasReducidas: [],
      enEvaluacion:false,
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
     
        this.tareas = Array();
        const res = await axios.get("http://localhost:3001/api/v1/tareas");
        this.tareas = res.data;
        console.log(this.tareas);

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.tareas.length; i++) {
          let tareasReducida = {
            id:this.tareas[i].id,
            nombre_tarea: this.tareas[i].nombre,
            descripcion: true,
            aprobacion: true,   
            pdf: true,  
            comentario: true,
            evaluar:true
          };
          this.tareasReducidas.push(tareasReducida);
        }
        console.log(this.tareasReducidas);
      } catch (error) {
        console.log(error);
      }
    },

    cargarTareasPropuesta(i){

      this.enEvaluacion=true;
      console.log(i)

    },

    detallesTarea({item}){
       
      console.log(item) ;
      
    }


  }
};