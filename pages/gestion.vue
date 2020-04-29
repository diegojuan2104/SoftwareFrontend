<template>
  <div>
    <b-container>
      <!-- Content here -->

      <h1>Inscripción propuesta de convenio</h1>
      
      <br />

      <b-form action="javascript:void(0)" @submit="crearPropuesta()">
        <b-form-group label="Nombre de la entidad" label-for="nombreEntidad">
          <b-form-input
            class="form-control"
            type="text"
            placeholder="Ingrese el nombre de la entidad a realizar un convenio con la Universidad de Medellín"
            id="nombreEntidad"
            v-model="propuesta.nombreEntidad"
            v-bind:required="true"
          />
        </b-form-group>
        <br />
        <h3>Información del representante</h3>
         <p>Ingrese a continuación la siguiente información acerca de la persona que propone el convenio.</p>

         <b-form-group label="Identificacion" label-for="identificacion">
          <b-form-input
            class="form-control"
            type="text"
            id="id"
            placeholder="Ingrese el numero de su documento"
            v-model="propuesta.identificacion"
            v-bind:required="true"
          />
        </b-form-group> 

        <b-form-group label="Nombre Completo" label-for="nombre">
          <b-form-input
            class="form-control"
            type="text"
            id="nombre"
            placeholder="Ingrese nombre completo"
            v-model="propuesta.nombreCompleto"
            v-bind:required="true"
          />
        </b-form-group>

        <b-form-group label="Ocupacion" label-for="ocupacion">
          <b-form-input
            class="form-control"
            type="text"
            id="ocupacion"
            placeholder="Ingrese su ocupacion"
            v-model="propuesta.ocupacion"
            v-bind:required="true"
          />
        </b-form-group>  

        <b-form-group label="Email" label-for="email">
          <b-form-input
            class="form-control"
            type="email"
            id="email"
            placeholder="Ingrese correo electrónico"
            v-model="propuesta.email"
            v-bind:required="true"
          />
        </b-form-group> 
      

      <b-form-group label="Teléfono" label-for="telefono">
          <b-form-input
            class="form-control"
            type="number"
            id="telefono"
            placeholder="Ingrese telefóno de contacto"
            v-model="propuesta.telefono"
            v-bind:required="true"
          />
        </b-form-group> 


        <b-form-group label="Dirección" label-for="direccion">
          <b-form-input
            class="form-control"
            type="text"
            id="direccion"
            placeholder="Ingrese dirección"
            v-model="propuesta.direccion"
            v-bind:required="true"
          />
        </b-form-group> 

        <h3>Información del Convenio</h3>
         <p>Ingrese a continuación la siguiente información acerca del convenio</p>
        <b-form-group label="Tipo de convenio" label-for="tipoConvenio">
          <b-form-input
            class="form-control"
            type="text"
            id="tipoConvenio"
            placeholder="Ingrese tipo de convenio"
            v-model="propuesta.tipoConvenio"
            v-bind:required="true"
          />
        </b-form-group> 

        <b-form-group label="Iniciativa" label-for="razonConvenio">
          <b-form-input
            class="form-control"
            type="text"
            id="razonConvenio"
            placeholder="Detalle el objetívo o propósito de la iniciativa"
            v-model="propuesta.iniciativa"
            v-bind:required="true"
          />
        </b-form-group>

        <b-form-group label="Posibles beneficios" label-for="beneificiosConvenio">
          <b-form-input
            class="form-control"
            type="text"
            id="beneficiosConvenio"
            placeholder="Mencione posibles beneficios del convenio"
            v-model="propuesta.posiblesBeneficios"
            v-bind:required="true"
          />
        </b-form-group>
        <b-button class="bg-udem" type="submit"  v-if="!enEdicion">Subir info</b-button>
        <b-button clas="bg-udem" @click="actualizarPropuesta()" variant="primary" v-else>Actualizar estudiante</b-button>
      </b-form>

      <b-table striped hover :items="listareducida">
        <template v-slot:cell(Modificar)="row">
          <b-button size="sm" @click="cargarPropuesta(row)" class="bg-udem">Modificar</b-button>
        </template>
        <template v-slot:cell(Eliminar)="row">
          <b-button size="sm" @click="eliminarPropuesta(row)" class="bg-udem">Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>


<script src="@/assets/propuestas.js"/>
