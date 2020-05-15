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
        <template v-slot:cell(descripcion)="row">
          <b-button size="sm" class="bg-udem boton" @click="detallesTarea(row)">Detalles</b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script src="@/assets/evaluacion.js" />
