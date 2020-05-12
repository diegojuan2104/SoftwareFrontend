<template>
  <div>
    <b-container>
      <!-- Content here -->

      <b-card class="bcard">
        <h1>Propuestas realizadas</h1>
        <br />
        <b-table striped hover :items="propuestasReducidas">
          <template v-slot:cell(Detalles)="row">
            <b-button
              size="sm"
              @click="detallesPropuesta(row)"
              class="bg-udem boton"
              >Detalles</b-button
            >
          </template>
          <template v-slot:cell(Eliminar)="row">
            <b-button
              size="sm"
              @click="cargarTareasPropuesta(row)"
              class="bg-udem boton"
              >Evaluar</b-button
            >
          </template>
        </b-table>
      </b-card>

      <b-card class="bcard" id="tablaTareas;" v-if="this.enEvaluacion">
        <h1 id="tituloTareas">Tareas:</h1>
        <br />
        <b-table striped hover :items="tareasReducidas">
          <template v-slot:cell(detalles)="row">
            <b-button
              size="sm"
              @click="detallesTarea(row)"
              class="bg-udem boton"
              >Detalles</b-button
            >
          </template>
          <template v-slot:cell(aprobacion)>
            <center>
              <b-form-checkbox
                size="lg"
                name="check-button"
                switch
              ></b-form-checkbox>
            </center>
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
        </b-table>
            <div class="d-flex justify-content-end">
              <b-button class="bg-udem boton" >Enviar Evaluacion</b-button>
            </div>
      </b-card>
    </b-container>
  </div>
</template>

<script src="@/assets/evaluacion.js" />
