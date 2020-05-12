<template>
  <div>
    <b-container>
      <!-- Content here -->

      <b-card class="bcard" title>
        <b-form action="javascript:void(0)" @submit="iniciarSesion()">
          <center>
            <h1>LOGIN</h1>
            <p class="mensaje">Iniciar sesion como estudiante o como evaluador</p>
            <div>
              <b-form-group label="Email" label-for="usuario">
                <b-form-input
                  class="form-control"
                  type="text"
                  id="correo"
                  placeholder="Ingrese su email"
                  v-bind:required="true"
                  v-model="correo"
                />
              </b-form-group>
              <b-form-group label="Contraseña" label-for="contraseña">
                <b-form-input
                  class="form-control"
                  type="password"
                  id="clave"
                  placeholder="Ingrese la contraseña"
                  v-bind:required="true"
                  v-model="clave"
                />
              </b-form-group>
              <b-button class="bg-udem boton" type="submit" v-if="!this.enEdicion">Iniciar Sesión</b-button>

              <div>
                <b-button class="botonIndex" href="/propuestas">Proponer Convenios</b-button>
              </div>
            </div>
            <div>
              <b-button class="botonIndex" href="/evaluaciones">Evaluar Convenios</b-button>
            </div>
          </center>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script src="@/assets/index.js"/>
<style>
.botonIndex {
  width: 200px;
  margin-top: 25px;
}

.mensaje {
  color: black;
}
</style>
