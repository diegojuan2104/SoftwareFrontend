<template>
  <div>
    <b-container>
      <!-- Content here -->

      <h1>Evaluacion de propuesta de convenio</h1>
      
      <br />

      <b-form action="javascript:void(0)" @submit="enviarEvaluacion()">
        <b-form-group label="identificacion de la propuesta a evaluar" label-for="nombreEntidad">
          <b-form-input
            class="form-control"
            type="number"
            placeholder="Ingrese la identificacion de la propuesta que se va a evaluar"
            id="idpropuesta"
            v-model="evaluacion.idpropuesta"
            v-bind:required="true"
          />
        </b-form-group>
        <br />
        <h3>digite los siguientes campos</h3>
         <p>Ingrese a continuación la siguiente información acerca de la revision.</p>

        <b-form-group label="Observaciones" label-for="ingrese observaciones">
          <b-form-input
            class="form-control"
            type="text"
            id="observaciones"
            placeholder="Ingrese las observaciones acerca de la propuesta"
            v-model="evaluacion.observaciones"
            v-bind:required="true"
          />
        </b-form-group> 

        <b-form-group label="fecha" label-for="ingrese fecha">
          <b-form-input
            class="form-control"
            type="date"
            id="fecha"
            placeholder="Ingrese la fecha de la revision"
            v-model="evaluacion.fecha"
            v-bind:required="true"
          />
        </b-form-group> 
    
        <b-form-group > 
          <b-form-select v-model="evaluacion.estado" :options="opciones_estado"></b-form-select>
        </b-form-group>


        
        <b-button class="bg-udem" type="submit"  v-if="!enEdicion">Evaluar</b-button>
        <b-button @click="evaluar()" variant="primary" v-else>modificar evaluacion</b-button>
      </b-form>

      <b-table striped hover :items="listareducida">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargarPropuesta(row)" class="mr-2">Modificar</b-button>
          <b-button size="sm" @click="eliminarEstudiante(row)" class="mr-2">Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>


<script src="@/assets/evaluacion.js"/>
