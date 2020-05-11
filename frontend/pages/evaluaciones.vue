<template>
  <div>
    <b-container>
      <!-- Content here -->

      <b-card class="bcard">
        <h1>Propuestas realizadas</h1>
        <br />
        <b-table striped hover :items="propuestasReducidas">
          <template v-slot:cell(Modificar)="row">
            <b-button size="sm" @click="detallesPropuesta(row)" class="bg-udem boton">Detalles</b-button>
          </template>
          <template v-slot:cell(Eliminar)="row">
            <b-button size="sm" @click="evaluarPropuesta(row)" class="bg-udem boton">Evaluar</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script src="@/assets/evaluacion.js" />
