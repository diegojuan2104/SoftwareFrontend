<template>
  <div>
    <b-container>
      <!-- Content here -->

      <h1>Inscripción propuesta de convenio</h1>
      
      <br />

      <b-form action="javascript:void(0)" @submit="crearEstudiante()">
        <b-form-group label="Nombre de la entidad" label-for="nombreEntidad">
          <b-form-input
            class="form-control"
            type="text"
            placeholder="Ingrese el nombre de la entidad a realizar uns convenio con la Universidad de Medellín"
            id="nombreEntidad"
          />
        </b-form-group>
        <br />
        <h3>Información del representante</h3>
         <p>Ingrese a continuación la siguiente información acerca del representante de la entidad.</p>

        <b-form-group label="Nombre Completo" label-for="nombreRep">
          <b-form-input
            class="form-control"
            type="text"
            id="nombreRep"
            placeholder="Ingrese nombre completo"
          />
        </b-form-group> 

        <b-form-group label="Email" label-for="emailRep">
          <b-form-input
            class="form-control"
            type="mail"
            id="emailRep"
            placeholder="Ingrese correo electrónico"
          />
        </b-form-group> 
      

      <b-form-group label="Teléfono" label-for="telefonoRep">
          <b-form-input
            class="form-control"
            type="number"
            id="telefonoRep"
            placeholder="Ingrese telefóno de contacto"
          />
        </b-form-group> 


        <b-form-group label="Dirección" label-for="direccionRep">
          <b-form-input
            class="form-control"
            type="number"
            id="direccionRep"
            placeholder="Ingrese dirección"
          />
        </b-form-group> 

        <h3>Información del Convenio</h3>
         <p>Ingrese a continuación la siguiente información acerca del convenio</p>
        <b-form-group label="" label-for="direccionRep">
          <b-form-input
            class="form-control"
            type="number"
            id="direccionRep"
            placeholder="Ingrese tipo de convenio"
          />
        </b-form-group> 
        <b-button class="bg-udem" type="submit"  v-if="!enEdicion">Subir info</b-button>
        <b-button @click="actualizarEstudiante()" variant="primary" v-else>Actualizar estudiante</b-button>
      </b-form>

      <b-table striped hover :items="lista_estudiantes">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargarEstudiante(row)" class="mr-2">Modificar</b-button>
          <b-button size="sm" @click="eliminarEstudiante(row)" class="mr-2">Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

 <!--<script src="@/assets/estudiantes.js"/>
