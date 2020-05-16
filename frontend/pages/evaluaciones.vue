<template>
  <div>
    <!-- Content here -->

    <b-card class="bcard">
      <h1>Propuestas realizadas</h1>
      <br />
      <b-table striped hover :items="propuestasReducidas">
        <template v-slot:cell(Detalles)="row">
          <b-button size="sm" @click="detallesPropuesta(row)" class="bg-udem boton">Detalles</b-button>
        </template>

        <template v-slot:cell(evaluar)="row">
          <b-button size="sm" @click="cargarTareasPropuesta(row)" class="bg-udem boton">Evaluar</b-button>
        </template>
      </b-table>
    </b-card>

    <b-card class="bcard" v-if="this.enEvaluacion">
      <h1>Tareas:</h1>
      <br />
      <b-table striped hover :items="tareasReducidas">
        <template v-slot:cell(descripcion)="fila">
          <b-button size="sm" class="bg-udem boton" @click="detallesTarea(fila)">Detalles</b-button>
        </template>
        <template v-slot:cell(aprobacion)>
          <b-form-checkbox size="lg" name="check-button" switch></b-form-checkbox>
        </template>
        <template v-slot:cell(pdf)>
          <b-form-file class="mt-3" plain></b-form-file>
        </template>
        <template v-slot:cell(comentario)>
          <b-form-textarea
            id="comentarioTarea"
            placeholder="Ingrese Comentario..."
            rows="3"
            max-rows="3"
          ></b-form-textarea>
        </template>
        <template v-slot:cell(evaluar)="evaluar">
          <b-button size="sm" class="bg-udem boton" @click="detallesTarea(evaluar)">Evaluar</b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>




<script src="@/assets/evaluacion.js" />
