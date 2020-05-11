<template>
  <div>
    <b-container>
      <!-- Content here -->

      <b-card class="bcard" title>
        <b-form>
          <center>
            <h1>LOGIN</h1>
            <p class="mensaje">Iniciar sesion como estudiante o como evaluador</p>
            <div>
              <b-form-group label="Email" label-for="usuario">
                <b-form-input
                  class="form-control"
                  type="text"
                  id="email"
                  placeholder="Ingrese su email"
                  v-bind:required="true"
                  v-model="correo"
                />
              </b-form-group>
              <b-form-group label="Contraseña" label-for="contraseña">
                <b-form-input
                  class="form-control"
                  type="password"
                  id="contrasena"
                  placeholder="Ingrese la contraseña"
                  v-bind:required="true"
                  v-model="contrasena"
                />
              </b-form-group>
              <b-button class="botonIndex" href="/propuestas">Iniciar Sesion</b-button>

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
