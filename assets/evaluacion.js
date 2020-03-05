export default {
    data() {
        return {
            evaluacion: {
                idPropuesta: "",
                fecha: "",
                observaciones: "",
                estado: ""

            },

            opciones_estado: [
                { value: null, text: "Seleccione una opcion", disabled: false },
                { value: "001", text: "Rechazado" },
                { value: "002", text: "Aceptado" },
                { value: "003", text: "Incompleto" }
            ]



        };
    },

    created() {

    },
    methods: {

    },

};