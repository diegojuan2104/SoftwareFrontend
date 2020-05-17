<template>
  <div>
    <!-- Content here -->

    <b-card class="bcard">
      <h1>Propuestas realizadas</h1>
      <br />
      <b-table striped hover :items="propuestasReducidas">
        <template v-slot:cell(evaluar)="row">
          <b-button
            size="sm"
            @click="cargarInfoPropuesta(row)"
            class="bg-udem boton"
            >Evaluar</b-button
          >
        </template>
      </b-table>
    </b-card>

<b-container>
    <b-card class="bcard" v-if="this.enEvaluacion">
      <center>
        <h1>Informacion del Proponente</h1>
      </center>
      <p class="my-4">Nombre: {{ nombreCompletoProp }}</p>
      <p class="my-4">Contacto: {{ contactoPropuesta }}</p>
      <p class="my-4">Email: {{ correoP }}</p>
      <p class="my-4">descripcion: {{ descripcionP }}</p>
      <p class="my-4">ocupacion: {{ ocupacionP }}</p>
      <p class="my-4">Ciudad: {{ ciudadP }}</p>
      <br />
      <center>
      <h1>Informacion de la Propuesta</h1>
      </center>
      <p class="my-4">Propuesta numero: {{ idPropuesta }}</p>
      <p class="my-4">Tipo de Convenio: {{ tipoPropuesta }}</p>
      <p class="my-4">Descripcion: {{ descripcionPropuesta }}</p>
      <p class="my-4">Posibles Beneficios: {{ beneficiosPropuesta }}</p>
      <p class="my-4">Estado: {{ estadoPropuesta }}</p>
    </b-card>
</b-container>

    <b-card class="bcard" v-if="this.enEvaluacion">
      <h1>Tareas:</h1>
      <br />
      <b-table striped hover :items="tareasReducidas">
        <template v-slot:cell(descripcion)="fila">
          <b-button
            size="sm"
            class="bg-udem boton"
            @click="detallesTarea(fila), (modalShow = !modalShow)"
            >Detalles</b-button
          >

          <b-modal id="modal-1" v-model="modalShow" title="Tarea">
            <p class="my-4">Tarea numero: {{ idTarea }}</p>
            <p class="my-4">Nombre: {{ nombreTarea }}</p>
            <p class="my-4">Descripcion: {{ descripcionTarea }}</p>
          </b-modal>
        </template>

        <template v-slot:cell(aprobacion)>
          <b-form-checkbox
            size="lg"
            name="check-button"
            switch
          ></b-form-checkbox>
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
          <b-button
            size="sm"
            class="bg-udem boton"
            @click="detallesTarea(evaluar)"
            >Evaluar</b-button
          >
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script src="@/assets/evaluacion.js" />
