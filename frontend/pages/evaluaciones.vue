<template>
  <div>
    <!-- Content here -->
    <b-container>
      <b-card class="bcard">
        <h1>Propuestas realizadas</h1>
        <br />
        <b-table striped hover :items="propuestasReducidas">
          <template v-slot:cell(evaluar)="row">
            <b-button size="sm" @click="cargarInfoPropuesta(row)" block variant="danger">Evaluar</b-button>
          </template>
        </b-table>
      </b-card>

      <b-card class="bcard" v-if="this.enEvaluacion">
        <center>
          <h1>Informacion del Proponente</h1>
        </center>
        <p class="my-4">Nombre: {{ nombreCompletoProp }}</p>
        <p class="my-4">Contacto: {{ contactoPropuesta }}</p>
        <p class="my-4">Email: {{ correoP }}</p>
        <p class="my-4">Descripción: {{ descripcionP }}</p>
        <p class="my-4">Ocupacion: {{ ocupacionP }}</p>
        <p class="my-4">Ciudad: {{ ciudadP }}</p>
        <br />
        <center>
          <h1>Informacion de la Propuesta</h1>
        </center>
        <p class="my-4">Propuesta numero: {{ idPropuesta }}</p>
        <p class="my-4">Tipo de Convenio: {{ tipoPropuesta }}</p>
        <p class="my-4">Descripción: {{ descripcionPropuesta }}</p>
        <p class="my-4">Entidades: {{ entidadesP }}</p>
        <p class="my-4">Posibles Beneficios: {{ beneficiosPropuesta }}</p>
        <p class="my-4">Estado: {{ estadoPropuesta }}</p>
        

      </b-card>
    </b-container>

    <b-card class="bcard" v-if="this.enEvaluacion">
      <h1>Tareas:</h1>
      <br />
      <b-table striped hover :items="tareasReducidas">
        <template v-slot:cell(descripción)="fila">
          <b-button
            size="sm"
            block
            variant="danger"
            @click="detallesTarea(fila), (modalShow = !modalShow)"
          >Detalles</b-button>

          <b-modal id="modal-1" v-model="modalShow" title="Tarea">
            <p class="my-4">Tarea numero: {{ idTarea }}</p>
            <p class="my-4">Nombre: {{ nombreTarea }}</p>
            <p class="my-4">Descripción: {{ descripcionTarea }}</p>
            <template v-slot:modal-footer>
              <div class="w-200">
                <b-button
                  variant="danger"
                  size="sm"
                  class="float-right"
                  @click="(modalShow = !modalShow)"
                >OK</b-button>
              </div>
            </template>
          </b-modal>
        </template>

        <template v-slot:cell(aprobación)="row">
          <b-form-checkbox
            size="lg"
            v-model="checkboxes[row.item.id]['aprobado']"
            name="check-button"
            switch
          ></b-form-checkbox>
        </template>
        <template v-slot:cell(pdf)="row">
          <b-form-file accept=".pdf" v-model="pdfs[row.item.id]['pdf']" class="mt-3" plain></b-form-file>
        </template>
        <template v-slot:cell(comentario)="row">
          <b-form-textarea
            v-model="informacion[row.item.id]['comentario']"
            id="comentarioTarea"
            placeholder="Ingrese Comentario..."
            rows="3"
            max-rows="3"
          ></b-form-textarea>
        </template>
        <template v-slot:cell(evaluar)="row">
          <b-button size="sm" block variant="danger" @click="evaluarTarea(row)">Evaluar</b-button>
        </template>
      </b-table>
      <b-button size="sm" block variant="danger" @click="evaluarTarea()">Enviar Evaluación</b-button>
    </b-card>
  </div>
</template>

<script src="@/assets/evaluacion.js" />
