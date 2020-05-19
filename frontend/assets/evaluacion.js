import axios from "axios";
export default {
  beforeMount() {
    this.cargarPropuestas();
    this.cargarTareas();
  },

  data() {
    return {
      idTarea: "",
      nombreTarea: "",
      descripcionTarea: "",
      modalShow: false,
      propuestas: [],
      involucrados: [],
      propuestasReducidas: [],
      tareas: [],
      tareasReducidas: [],
      enEvaluacion: false,

      nombreCompletoProp: "",
      ciudadP: "",
      correoP: "",
      descripcionP: "",
      ocupacionP: "",
      tipoPropuesta: "",
      descripcionPropuesta: "",
      beneficiosPropuesta: "",
      contactoPropuesta: "",
      estadoPropuesta: "",
      idPropuesta: "",

      archivo: "",
      archivos: [],
      comentario: [" ", " "],
      comentarios: []
    };
  },
  methods: {
    token() {
      let token = sessionStorage.getItem("token");
      return token;
    },

    seleccionArchivo({ item }) {
      const archivo = {
        archivo: this.archivo,
        id: item.id
      };
      this.archivos.push(archivo);
    },

    guardarComentario({ item }) {
      const comentario = {
        comentario: this.comentario,
        id: item.id
      };

      this.comentarios.push(comentario);
    },

    async evaluarTarea(item) {
      let archivo = "";
      let comentario = "";
      try {
        // SELECCION DE ARCHIVO
        let posicion = this.archivos.findIndex(
          archivo => archivo.id == item.item.id
        );

        if (archivo == null || posicion == -1) {
          console.log("No se ha seleccionado ningún archivo");
        } else {
          archivo = this.archivos[posicion].archivo;
        }

        console.log(comentario[0]);

        //SELECCION DE COMENTARIO
        //posicion = this.comentarios.findIndex(
        //comentario => comentario.id == item.item.id
        //);
        //console.log(posicion);

        //console.log(this.comentarios[posicion]);

        // let formData = new FormData();
        //formData.append("archivo", archivo);

        //formData.set("idTarea", item.item.id);
      } catch (error) {}
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

    async traerInvolucrados() {
      try {
        const token = this.token();
        this.involucrados = Array();
        const res = await axios.get(
          "http://localhost:3001/api/v1/involucrados/" + this.idPropuesta,
          {
            headers: { token }
          }
        );

        this.involucrados = res.data;
        console.log(this.involucrados);
        this.nombreCompletoProp =
          this.involucrados[0].nombre_usuario +
          " " +
          this.involucrados[0].apellidos;
        this.correoP = this.involucrados[0].correo;
        this.ciudadP = this.involucrados[0].ciudad;
        this.descripcionP = this.involucrados[0].descripcion_usuario;
        this.ocupacionP = this.involucrados[0].ocupacion;
      } catch (error) {
        console.log(error);
      }
    },

    detallesTarea({ item }) {
      let pos = parseInt(item.id, 10) - 1;
      this.idTarea = this.tareas[pos].id;
      this.nombreTarea = this.tareas[pos].nombre;
      this.descripcionTarea = this.tareas[pos].descripcion;
    },

    cargarInfoPropuesta(i) {
      this.enEvaluacion = true;
      let numeroPropuesta = i.item.id_Propuesta;
      let propuestaMostar;
      console.log(numeroPropuesta);

      for (let i = 0; i < this.propuestas.length; i++) {
        if (this.propuestas[i].id === numeroPropuesta) {
          propuestaMostar = this.propuestas[i];
          break;
        }
      }

      (this.tipoPropuesta = propuestaMostar.tipo_convenio),
        (this.descripcionPropuesta = propuestaMostar.descripcion_iniciativa),
        (this.beneficiosPropuesta = propuestaMostar.beneficios),
        (this.contactoPropuesta = propuestaMostar.info_contacto),
        (this.estadoPropuesta = propuestaMostar.estado),
        (this.idPropuesta = numeroPropuesta);

      this.traerInvolucrados();
    }
  }
};
