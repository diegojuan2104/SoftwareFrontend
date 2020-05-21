import axios from "axios";
const config = {
  url: "https://gestion-propuestas-api.herokuapp.com/api/v1/",
  url2: "http://localhost:3000/"
};
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
      entidadesP: "",
      contactoPropuesta: "",
      estadoPropuesta: "",
      idPropuesta: "",
      pdfs: {},
      informacion: {},
      checkboxes: {},
      tareasEvaluadas: []
    };
  },
  methods: {
    token() {
      let token = localStorage.getItem("token");
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
    //F5
    recargarPagina() {
      window.location.replace(config.url2 + "evaluaciones");
    },

    async evaluarTarea() {
      let contAprobado = 0;
      const token = this.token();
      try {
        for (let i = 1; i <= this.tareasReducidas.length; i++) {
          console.log("Tarea: " + i);

          let archivo = this.pdfs[i]["pdf"] ? this.pdfs[i]["pdf"] : "";
          let aprobado = this.checkboxes[i]["aprobado"];

          if (aprobado == null || aprobado == false) {
            aprobado = "Rechazado";
          } else {
            aprobado = "Aprobado";
            contAprobado++;
          }

          let comentario = this.informacion[i]["comentario"];
          if (comentario == null) {
            alert("Todas las tareas necesitan deben tener un comentario");
            this.tareasEvaluadas = [];
            return;
          }
          let tarea = {
            id: i,
            aprobado,
            comentario,
            archivo
          };
          this.tareasEvaluadas.push(tarea);
        }

        var f = new Date();

        let fecha =
          f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();

        this.tareasEvaluadas.forEach(tarea => {
          let formData = new FormData();

          formData.append("archivo", tarea.archivo);
          //body
          formData.set("idTarea", tarea.id);
          formData.set("fecha", fecha);
          formData.set("comentario", tarea.comentario);
          formData.set("estado", tarea.aprobado);
          formData.set("idPropuesta", this.idPropuesta);

          axios
            .post(config.url + "evaluaciones", formData, {
              headers: { token }
            })
            .then(res => {
              console.log(res);
            });
        });
      } catch (error) {
        console.log(error);
      }
      alert("Propuesta evaluada correctamente");
      this.tareasEvaluadas = [];

      let estado =
        contAprobado == this.tareasReducidas.length ? "Aprobado" : "Rechazado";

      let estadoObj = {
        estado
      };
      axios
        .put(config.url + "evaluaciones/" + this.idPropuesta, estadoObj, {
          headers: { token }
        })
        .then(res => {
          console.log(res);
          axios
            .post(
              config.url + "/correos",
              { correo: this.correoP },
              {
                headers: { token }
              }
            )
            .then(res => {
              console.log(res);
              this.recargarPagina();
            });
        });
    },
    // Carga las porpuestas en la tabla
    async cargarPropuestas() {
      try {
        const token = this.token();
        this.propuestaReducida = Array();
        this.propuestas = Array();
        const res = await axios.get(config.url + "propuestas", {
          headers: { token }
        });
        this.propuestas = res.data;
        console.log(this.propuestas);

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.propuestas.length; i++) {
          if (this.propuestas[i].estado != "Etapa de Revisión") continue;
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

    //carga las tareas en una tabla para ser evaluadas
    async cargarTareas() {
      try {
        const token = this.token();
        this.tareas = Array();
        const res = await axios.get(config.url + "tareas", {
          headers: { token }
        });
        this.tareas = res.data;
        console.log(this.tareas);

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.tareas.length; i++) {
          let tareasReducida = {
            id: this.tareas[i].id,
            nombre_tarea: this.tareas[i].nombre,
            descripción: true,
            aprobación: true,
            pdf: true,
            comentario: ""
          };
          this.tareasReducidas.push(tareasReducida);
          this.informacion[this.tareas[i].id] = {};
          this.checkboxes[this.tareas[i].id] = {};
          this.pdfs[this.tareas[i].id] = {};
        }
        console.log(this.tareasReducidas);
      } catch (error) {
        console.log(error);
      }
    },

    // trae los involucrados de una propuesta para poder observarlos
    async traerInvolucrados() {
      try {
        const token = this.token();
        this.involucrados = Array();
        const res = await axios.get(
          config.url + "involucrados/" + this.idPropuesta,
          {
            headers: { token }
          }
        );

        this.involucrados = res.data;
        console.log("involucrados ", this.involucrados);

        let entidadesC = "";

        for (let index = 0; index < this.involucrados.length; index++) {
          entidadesC =
            entidadesC + "-" + this.involucrados[index].nombre_entidad;
        }

        this.entidadesP = entidadesC;
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

    // carga los datos de una tarea para mostrarla
    detallesTarea({ item }) {
      let pos = parseInt(item.id, 10) - 1;
      this.idTarea = this.tareas[pos].id;
      this.nombreTarea = this.tareas[pos].nombre;
      this.descripcionTarea = this.tareas[pos].descripcion;
    },

    //carga la informacion de una propuesta
    cargarInfoPropuesta(i) {
      this.enEvaluacion = true;
      let numeroPropuesta = i.item.id_Propuesta;
      let propuestaMostar;
      let entidadesConc;
      console.log(numeroPropuesta);

      for (let i = 0; i < this.propuestas.length; i++) {
        if (this.propuestas[i].id === numeroPropuesta) {
          propuestaMostar = this.propuestas[i];
          console.log("aqui", propuestaMostar);
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
