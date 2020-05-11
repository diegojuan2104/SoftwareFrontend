import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
  },

  data() {
    return {
      propuestas: [],
      propuestasReducidas: []
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
                Modificar: true,
                Eliminar: true
              };
              this.propuestasReducidas.push(propuestaReducida);
            }
            console.log(this.propuestasReducidas);
          } catch (error) {
            console.log(error);
          }
        }
  }
};