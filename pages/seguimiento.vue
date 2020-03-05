<template>
  <div>
    <b-container>
      <!-- Content here -->
      <h1>Evaluacion de propuesta de convenio</h1>
      <br />
      <b-form action="javascript:void(0)" @submit="crearEvaluacion()">
        <b-form-group label="Identificacion de la propuesta a evaluar" label-for="nombreEntidad">
          <b-form-input
            class="form-control"
            type="number"
            placeholder="Ingrese la identificacion de la propuesta que se va a evaluar"
            id="idpropuesta"
            v-model="evaluacion.idPropuesta"
            v-bind:required="true"
          />
        </b-form-group>
        <br />
         <h3>Ingrese a continuación la siguiente información acerca de la revision.</h3>
        <b-form-group label="Observaciones" label-for="obsevaciones">
          <b-form-input
            class="form-control"
            type="text"
            id="observaciones"
            placeholder="Ingrese las observaciones acerca de la propuesta"
            v-model="evaluacion.observaciones"
            v-bind:required="true"
          />
        </b-form-group> 

        <b-form-group label="Fecha" label-for="fecha">
          <b-form-input
            class="form-control"
            type="date"
            id="fecha"
            placeholder="Ingrese la fecha de la revision"
            v-model="evaluacion.fecha"
            v-bind:required="true"
          />
        </b-form-group> 

        <b-form-group label="Seleccione el resultado del proceso" label-for="resultado" > 
          <b-form-select  id="resultado" v-model="evaluacion.estado" :options="opciones_estado"></b-form-select>
        </b-form-group>
        <b-form-group > 
        <input type="file" @change="processFile($event)">
        </b-form-group>
        <b-button class="bg-udem" type="submit"  v-if="!enEdicion">Evaluar</b-button>
        <b-button @click="actualizarEvaluacion()" variant="primary" v-else>Modificar evaluacion</b-button>
      </b-form>

      <b-table striped hover :items="lista_evaluaciones">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargarEvaluacion(row)" class="mr-2">Modificar</b-button>
          <b-button size="sm" @click="eliminarEvaluacion(row)" class="mr-2">Eliminar</b-button>
          <b-button size="sm" @click="generarPDF(row)" class="mr-2">PDF</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>


<script src="@/assets/evaluacion.js"/>
