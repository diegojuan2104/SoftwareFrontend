<template>
  <div>
    <b-container>
      <!-- Content here -->

      <b-card class="bcard" title="">
        <b-form>
          <center>
            <h1>
              Selecciona una opcion
            </h1>
            <p class="mensaje"> esta seleccion es tempoaral y sera remplazada por un login</p>
            <div>
              <b-button class="botonIndex" href="/gestion"
                >Proponer Convenios</b-button
              >
            </div>
            <div>
              <b-button class="botonIndex" href="/seguimiento">Evaluar Convenios</b-button>
            </div>
          </center>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<style>
.botonIndex {
  width: 200px;
  margin-top: 25px;
}

.mensaje{
    color: black
    ;
}


</style>
