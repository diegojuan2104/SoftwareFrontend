import axios from "axios";
export default {
  beforeMount() {
    // Carga las propuestas,PENDIENTE falta validar que solo sean las de un usuario en especifico
    this.cargarPropuestas();
    this.cargarEntidades();
  },

  data() {
    return {
      //Propuesta Completa
      //
      propuesta: {
        idPropuesta: "",
        telefono: "",
        tipoConvenio: null,
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      },
      tiposConvenio: [
        {
          value: null,
          text: "Seleccione tipo de convenio"
        },
        { text: "Estudio", value: "Estudio" },
        { text: "Idiomas", value: "Idiomas" },
        { text: "Deporte", value: "Deporte" }
      ],
      propuestas: [],
      entidades: [],
      //Lista de entidade agregadas temporalmente al registro
      entidadesAgregadas: [],
      //Para modificar un convenio
      enEdicion: false,
      //valor de la entidad seleccionada en determinado instante
      entidadSeleccionada: null,
      //Lista de la propuesta reducida, para poder visualizarla correctamente en la tabla
      propuestasReducidas: [],
      //Lista con solo el id y nombre de la entidades seleccionadas,para verla en el combo box o select
      entidadesAgregadasReducidas: [],
      //Lista de todas las entidades reducidas
      entidadesReducidas: [
        {
          value: null,
          text: "Seleccione una entidad"
        }
      ],

      tareas: [],
      archivoTareas: [],
      modalShow: false,
      idPropuesta: "",
      tipoConvenioP: "",
      beneficiosP: "",
      estadoP: "",
      descripcionP: ""
    };
  },
  methods: {
    async actualizarPropuesta() {
      if (this.validarCantidadDePropuestas()) return;

      let token = this.token();
      let propuesta = {
        infoContacto: this.propuesta.telefono,
        tipoConvenio: this.propuesta.tipoConvenio,
        descripcionIniciativa: this.propuesta.iniciativa,
        beneficios: this.propuesta.posiblesBeneficios,
        estado: this.propuesta.estado
      };

      if (
        propuesta.infoContacto == "" ||
        propuesta.tipoConvenio == null ||
        propuesta.descripcionIniciativa == "" ||
        propuesta.beneficios == ""
      ) {
        alert("Todos los campos que se van a actualizar deben de estar llenos");
        return;
      }

      axios
        .put(
          "http://localhost:3001/api/v1/propuestas/" +
            this.propuesta.idPropuesta,
          propuesta,
          {
            headers: { token }
          }
        )
        .then(res => {
          console.log(res);
          axios
            .delete(
              "http://localhost:3001/api/v1/involucrados/" +
                this.propuesta.idPropuesta,
              {
                headers: { token }
              }
            )
            .then(res => {
              const involucrados = {
                idUsuario: sessionStorage.getItem("idUser"),
                entidades: this.entidadesAgregadas,
                idPropuesta: this.propuesta.idPropuesta
              };
              axios
                .post(
                  "http://localhost:3001/api/v1/involucrados",
                  involucrados,
                  {
                    headers: { token }
                  }
                )
                .then(res => {
                  alert(
                    "Propuesta Actualizada id:" + this.propuesta.idPropuesta
                  );
                  console.log(res);
                  this.limpiarCampos();
                  this.enEdicion = false;
                  this.recargarPagina();
                });
            });
        });
    },
    validarPropuestaEvaluada(item) {
      let pos = this.propuestas.findIndex(propuesta => propuesta.id == item.id);
      if (this.propuestas[pos].estado != "Etapa de Revisión") {
        alert(
          "Esta propuesta ya fue evaluada y no puede ser modificada y/o eliminada"
        );
        return true;
      }
    },
    //Carga una propuesta en específico
    async cargarPropuesta({ item }) {
      try {
        if (this.validarPropuestaEvaluada(item)) return;
        this.limpiarCampos();
        let token = sessionStorage.getItem("token");

        let posicion = this.propuestas.findIndex(
          propuesta => propuesta.id == item.id
        );

        console.log(this.propuestas[posicion]);
        this.propuesta = {
          idPropuesta: this.propuestas[posicion].id,
          tipoConvenio: this.propuestas[posicion].tipo_convenio,
          iniciativa: this.propuestas[posicion].descripcion_iniciativa,
          posiblesBeneficios: this.propuestas[posicion].beneficios,
          estado: this.propuestas[posicion].estado,
          telefono: this.propuestas[posicion].info_contacto
        };

        const res = await axios.get(
          "http://localhost:3001/api/v1/involucrados/" +
            this.propuesta.idPropuesta,
          {
            headers: { token }
          }
        );
        console.log(res.data);

        let entidades = res.data;

        entidades.forEach(element => {
          const entidad = element.id_entidad;

          const entidadR = {
            id_Entidad: element.id_entidad,
            Nombre_Entidad: element.nombre_entidad,
            Detalles: true,
            Eliminar: true
          };

          this.entidadesAgregadas.push(entidad);
          this.entidadesAgregadasReducidas.push(entidadR);
          this.enEdicion = true;
        });
        alert(
          "Ahora puede modificar los atributos de la propuesta seleccionada"
        );
      } catch (error) {
        console.log(error);
      }
    },

    // Carga las porpuestas en la tabla
    async cargarPropuestas() {
      try {
        let idUser = sessionStorage.getItem("idUser");
        let token = sessionStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:3001/api/v1/propuestasUsuarios/" + idUser,
          {
            headers: { token }
          }
        );
        this.propuestas = res.data;

        //Se añaden datos a lista reducida pd: No sé porque el foreach no me funcionaba

        for (let i = 0; i < this.propuestas.length; i++) {
          let propuestaReducida = {
            id: this.propuestas[i].id,
            tipo_de_convenio: this.propuestas[i].tipo_convenio,
            Estado: this.propuestas[i].estado,
            Detalles: true,
            Modificar: true,
            Eliminar: true
          };
          this.propuestasReducidas.push(propuestaReducida);
        }

        //console.log(this.propuestasReducidas);
        //console.log(this.propuestas);
      } catch (error) {
        console.log(error);
      }
    },

    //Para seleccionar una entidad y agregarla a la tabla de registro
    seleccionarEntidad() {
      if (!this.entidadesAgregadas.includes(this.entidadSeleccionada)) {
        for (let i = 0; i < this.entidades.length; i++) {
          if (this.entidades[i].id == this.entidadSeleccionada) {
            let entidadAgregada = {
              id_Entidad: this.entidades[i].id,
              Nombre_Entidad: this.entidades[i].nombre,
              Detalles: true,
              Eliminar: true
            };
            this.entidadesAgregadasReducidas.push(entidadAgregada);
            this.entidadesAgregadas.push(this.entidadSeleccionada);
            break;
          }
        }
      }
      this.entidadSeleccionada = null;
    },

    //Carga las entidades ya registradas en la bd
    async cargarEntidades() {
      //this.entidadesReducidas = Array();
      try {
        let token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/v1/entidades", {
          headers: { token }
        });
        this.entidades = res.data;

        for (let i = 0; i < this.entidades.length; i++) {
          let entidadReducida = {
            text: this.entidades[i].nombre,
            value: this.entidades[i].id,
            id: this.entidades[i].id
          };
          this.entidadesReducidas.push(entidadReducida);
        }
      } catch (error) {
        console.log(error);
      }
    },
    //F5
    recargarPagina() {
      window.location.replace("http://localhost:3000/propuestas");
    },

    token() {
      let token = sessionStorage.getItem("token");
      return token;
    },
    //Elimina una propuesta realizada
    async eliminarPropuesta({ item }) {
      try {
        if (this.validarPropuestaEvaluada(item)) return;
        let token = sessionStorage.getItem("token");
        const propuestaEliminada = await axios.delete(
          "http://localhost:3001/api/v1/propuestas/" + item.id,
          { headers: { token } }
        );
        //Elimina los involucrados relacionados
        const res = await axios.delete(
          "http://localhost:3001/api/v1/involucrados/" + item.id,
          { headers: { token } }
        );

        let posicion1 = this.propuestas.findIndex(
          propuesta => propuesta.id == item.id
        );

        this.propuestasReducidas.splice(posicion1, 1);
        this.entidadesAgregadasReducidas.splice(posicion1, 1);
        alert("Propuesta eliminada id: " + item.id);

        //this.limpiarCampos();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },

    validarCantidadDePropuestas() {
      if (this.entidadesAgregadas.length <= 1) {
        alert("Deben existir al menos 2 involucrados");
        return true;
      }
    },
    //Elimina una entidad de la tabla seleccionada
    eliminarEntidad({ item }) {
      let posicion = this.entidadesAgregadas.findIndex(
        entidadAgregada => entidadAgregada == item.id_Entidad
      );
      console.log(item);
      this.entidadesAgregadas.splice(posicion, 1);
      this.entidadesAgregadasReducidas.splice(posicion, 1);
    },
    //Crea la propuesta
    crearPropuesta() {
      try {
        if (this.validarCantidadDePropuestas()) return;
        let token = this.token();
        let propuesta = {
          infoContacto: this.propuesta.telefono,
          tipoConvenio: this.propuesta.tipoConvenio,
          descripcionIniciativa: this.propuesta.iniciativa,
          beneficios: this.propuesta.posiblesBeneficios,
          estado: "Etapa de Revisión"
        };

        axios
          .post("http://localhost:3001/api/v1/propuestas", propuesta, {
            headers: { token }
          })
          .then(res => {
            console.log(res);

            const idPropuestaCreada = res.data.id.id;
            let propuestaAgregada = {
              id: idPropuestaCreada,
              tipo_convenio: propuesta.tipoConvenio,
              descripcion_iniciativa: propuesta.descripcionIniciativa,
              beneficios: propuesta.beneficios,
              estado: propuesta.estado,
              info_contacto: propuesta.infoContacto
            };
            let propuestaReducida = {
              id: idPropuestaCreada,
              tipo_de_convenio: propuesta.tipoConvenio,
              Estado: propuesta.estado,
              Detalles: true,
              Modificar: true,
              Eliminar: true
            };

            const involucrados = {
              idUsuario: sessionStorage.getItem("idUser"),
              entidades: this.entidadesAgregadas,
              idPropuesta: idPropuestaCreada
            };
            console.log(involucrados);
            axios
              .post("http://localhost:3001/api/v1/involucrados", involucrados, {
                headers: { token }
              })
              .then(res => {
                this.propuestasReducidas.push(propuestaReducida);
                this.propuestas.push(propuestaAgregada);
                alert("Propuesta Creada");
                console.log(res);
                this.limpiarCampos();
              });
          });
      } catch (error) {
        console.log(error);
      }
    },

    pdfConverter(base64) {
      var binaryString = window.atob(base64);
      var binaryLen = binaryString.length;
      var bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        var ascci = binaryString.charCodeAt(i);
        bytes[i] = ascci;
      }
      return bytes;
    },

    detallesPropuesta({ item }) {
      try {
        this.idPropuesta = item.id;

        for (let i = 0; i < this.propuestas.length; i++) {
          if (this.idPropuesta === this.propuestas[i].id) {
            console.log(this.propuestas[i]);
            this.tipoConvenioP = this.propuestas[i].tipo_convenio;
            this.beneficiosP = this.propuestas[i].beneficios;
            this.estadoP = this.propuestas[i].estado;
            this.descripcionP = this.propuestas[i].descripcion_iniciativa;
          }
        }
        let token = this.token();
        axios
          .get("http://localhost:3001/api/v1/evaluaciones/" + item.id, {
            headers: { token }
          })
          .then(res => {
            let tareasEvaludas = res.data;
            console.log(res);
            this.tareas = [];
            this.archivoTareas = [];
            tareasEvaludas.forEach(tarea => {
              let archivo = this.pdfConverter(tarea.archivo);
              let tareaObj = {
                id: tarea.id_tarea,
                nombre: tarea.nombre_tarea,
                estado: tarea.estado_tarea,
                Archivo: true,
                comentario: tarea.comentario
              };
              this.tareas.push(tareaObj);
              this.archivoTareas.push(archivo);
            });
            console.log(this.tareas);
            console.log(this.archivoTareas);
          });
      } catch (error) {
        console.log(error);
      }
    },

    Entidad({ item }) {
      console.log(this.entidades);
      console.log(item);

      let posicion = this.entidades.findIndex(
        entidad => entidad.id == item.id_Entidad
      );
      const entidad = this.entidades[posicion];
      const info =
        "id: " +
        entidad.id +
        "\n nombre: " +
        entidad.nombre +
        "\n direccion: " +
        entidad.direccion +
        "\n pagina_web: " +
        entidad.pagina_web +
        "\n nit: " +
        entidad.nit +
        "\n pais: " +
        entidad.pais +
        "\n departamento: " +
        entidad.departamento +
        "\n ciudad: " +
        entidad.ciudad;
      alert(info);
    },

    descargarArchivo(item) {
      console.log(item.item.id);
      let archivo = this.archivoTareas[item.item.id - 1];
      console.log(archivo);
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display:none";
      var blob = new Blob([archivo], { type: "application/pdf" });
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "Archivo";
      a.click();
    },
    limpiarCampos() {
      this.propuesta = {
        tipoConvenio: null,
        iniciativa: "",
        posiblesBeneficios: "",
        estado: ""
      };
      this.entidadesAgregadasReducidas = [];
      this.entidadesAgregadas = [];
    }
  }
};
