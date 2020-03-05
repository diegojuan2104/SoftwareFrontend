<template>
<div>

  <nav class="navbar navbar-expand-lg navbar-dark bg-udem">
    <a class="navbar-brand" href="#">Gestión de Convenios</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
          <nuxt-link  class="wf" to="/gestion">-Inscripción de Convenio-</nuxt-link>
          <nuxt-link  class="wf" to="/seguimiento" >-Evaluacion de Convenio-</nuxt-link>
      </li>
    </ul>
    </div>
</nav>
    <nuxt />
</div>
</template>



<style>
.wf{
  color:#FFFFFF;
}
 .bg-udem{
    background-color:#BA0F16;
}


</style>
