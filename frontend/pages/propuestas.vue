<template>
  <div>
    <b-container>
      <!-- Content here -->

      <div>
        <b-card class="bcard" title>
          <b-form action="javascript:void(0)" @submit="crearPropuesta()">
            <h1>Inscripción propuesta de convenio</h1>

            <h4>
              Ingrese a continuación la siguiente información acerca del
              convenio
            </h4>
            <br />
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
            <b-form-group label="Entidades involucradas" label-for="nombreEntidad">
              <b-form-select
                @change="seleccionarEntidad()"
                id="entidadSeleccionada"
                v-model="entidadSeleccionada"
                :options="entidadesReducidas"
              ></b-form-select>

              <h4>Lista de entidades involucradas</h4>
              <b-card>
                <b-table ref="tablaEntidadesAgre" striped hover :items="this.entidadesAgregadasReducidas">
                  <template v-slot:cell(Detalles)="row">
                    <b-button size="sm" @click="detallesPropuesta(row)" class="bg-udem boton">Detalles</b-button>
                  </template>
                  <template v-slot:cell(Eliminar)="row">
                    <b-button size="sm" @click="eliminarEntidad(row)" class="bg-udem boton">Eliminar</b-button>
                  </template>
                </b-table>
              </b-card>
            </b-form-group>
            <b-form-group label="Teléfono/Celular" label-for="telefono">
              <b-form-input
                class="form-control"
                type="number"
                id="telefono"
                placeholder="Ingrese telefóno/Celular de contacto"
                v-model="propuesta.telefono"
                v-bind:required="true"
              />
            </b-form-group>

            <b-form-group label="Descripción de la iniciativa" label-for="razonConvenio">
              <b-form-textarea
                class="form-control"
                type="text"
                id="razonConvenio"
                placeholder="Detalle el objetívo o propósito de la iniciativa"
                v-model="propuesta.iniciativa"
                v-bind:required="true"
              />
            </b-form-group>

            <b-form-group label="Posibles beneficios" label-for="beneificiosConvenio">
              <b-form-textarea
                class="form-control"
                type="text"
                id="beneficiosConvenio"
                placeholder="Mencione posibles beneficios del convenio"
                v-model="propuesta.posiblesBeneficios"
                v-bind:required="true"
              />
            </b-form-group>

            <div class="d-flex justify-content-end">
              <b-button class="bg-udem boton" type="submit" v-if="!this.enEdicion">Subir info</b-button>
              <b-button
                clas="bg-udem boton"
                @click="actualizarPropuesta()"
                v-else
              >Actualizar propuesta</b-button>
            </div>
          </b-form>
        </b-card>
      </div>
      <b-card class="bcard">
        <h3>Propuestas Realizadas</h3>
        <b-table ref="tablaPropuestas" striped hover :items="this.propuestasReducidas">
          <template v-slot:cell(Modificar)="row">
            <b-button size="sm" @click="cargarPropuesta(row)" class="bg-udem boton">Modificar</b-button>
          </template>
          <template v-slot:cell(Eliminar)="row">
            <b-button size="sm" @click="eliminarPropuesta(row)" class="bg-udem boton">Eliminar</b-button>
          </template>
          <template v-slot:cell(Detalles)="row">
            <b-button size="sm" @click="detallesPropuesta(row)" class="bg-udem boton">Detalles</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script src="@/assets/propuestas.js"/>
