<template>
  <div>
    <b-container>
      <!-- Content here -->

      <div>
        <b-card class="bcard" title>
          <b-form action="javascript:void(0)" @submit="crearPropuesta()">
            <h1 v-if="enEdicion">Actualización propuesta de convenio: {{ propuesta.idPropuesta }}</h1>
            <h1 v-if="!enEdicion">Inscripción propuesta de convenio</h1>
            <h4>
              Ingrese a continuación la siguiente información acerca del
              convenio
            </h4>
            <br />
            <b-form-group label="Tipo de convenio" label-for="tipoConvenio">
              <b-form-select
                class="form-control"
                type="text"
                id="tipoConvenio"
                placeholder="Ingrese tipo de convenio"
                v-model="propuesta.tipoConvenio"
                :options="tiposConvenio"
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
                <b-table
                  ref="tablaEntidadesAgre"
                  striped
                  hover
                  :items="this.entidadesAgregadasReducidas"
                >
                  <template v-slot:cell(Detalles)="row">
                    <b-button
                      size="sm"
                      @click="detallesEntidad(row)"
                      block
                      variant="danger"
                    >Detalles</b-button>
                  </template>
                  <template v-slot:cell(Eliminar)="row">
                    <b-button
                      size="sm"
                      @click="eliminarEntidad(row)"
                      block
                      variant="danger"
                    >Eliminar</b-button>
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
              <b-button
                block
                variant="danger"
                type="submit"
                v-if="this.enEdicion == false"
              >Subir info</b-button>
              <b-button
                block
                variant="danger"
                @click="actualizarPropuesta()"
                v-if="this.enEdicion == true"
              >Actualizar</b-button>
            </div>
          </b-form>
        </b-card>
      </div>
      <b-card class="bcard">
        <h3>Propuestas Realizadas</h3>
        <b-table ref="tablaPropuestas" striped hover :items="this.propuestasReducidas">
          <template v-slot:cell(Detalles)="row">
            <b-button
              block
              variant="danger"
              size="sm"
              @click="detallesPropuesta(row),(modalShow = !modalShow)"
            >Detalles</b-button>
            <b-modal id="modal-1" size="xl" v-model="modalShow" title="Detalles">
              <p class="my-4">Id propuesta: {{idPropuesta}}</p>
              <p class="my-4">Tipo Convenio: {{tipoConvenioP}}</p>
              <p class="my-4">Descripcion: {{descripcionP}}</p>
              <p class="my-4">Beneficios:{{beneficiosP}}</p>
              <p class="my-4">Estado:{{estadoP}}</p>
              <b-table responsive ref="tablaPropuestas" striped hover :items="tareas">
                <template v-slot:cell(Archivo)="row">
                  <b-button block variant="danger" size="sm" @click="descargarArchivo(row)">Archivo</b-button>
                </template>
              </b-table>
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
          <template v-slot:cell(Modificar)="row">
            <b-button block variant="danger" size="sm" @click="cargarPropuesta(row)">Modificar</b-button>
          </template>
          <template v-slot:cell(Eliminar)="row">
            <b-button block variant="danger" size="sm" @click="eliminarPropuesta(row)">Eliminar</b-button>
          </template>
        </b-table>
      </b-card>
    </b-container>
  </div>
</template>

<script src="@/assets/propuestas.js" />
