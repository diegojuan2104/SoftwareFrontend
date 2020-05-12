<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-udem">
      <a class="navbar-brand" href="#">Gestión de Convenios</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li>
            <nuxt-link class="wf" to="/">Inicio</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
    <nuxt />
  </div>
</template>

<style>
.wf {
  color: #ffffff;
  margin: 10px;
  font-size: 15px;
}
.custom-control-input:checked ~ .custom-control-label::before {
    color: #fff;
    border-color: black;
    background-color: #ba0f16;
}

.navbar-dark .navbar-brand {
  color: white;
  font-size: 25px;
  font-weight: bold;
}

.btn-secondary:hover {
  color: #ba0f16;
  background-color: white;
}
.btn-primary:hover {
  color: #ba0f16;
  background-color: white;
}

.boton {
  border-radius: 55px 55px 55px 55px;
  -moz-border-radius: 55px 55px 55px 55px;
  -webkit-border-radius: 55px 55px 55px 55px;
  border: 0.5px solid #000000;
}

.btn-secondary {
  border-radius: 55px 55px 55px 55px;
  -moz-border-radius: 55px 55px 55px 55px;
  -webkit-border-radius: 55px 55px 55px 55px;
  border: 0.5px solid #000000;
  background-color: #ba0f16;
}

.wf:hover {
  color: #ba0f16;
  padding: 7.5px;
  background-color: white;
  text-decoration: none;
  font-weight: bold;

  border-radius: 55px 55px 55px 55px;
  -moz-border-radius: 55px 55px 55px 55px;
  -webkit-border-radius: 55px 55px 55px 55px;
  border: 0.5px solid #000000;
}

.bg-udem {
  background-color: #ba0f16;
}

body {
  background-color: #cad1db;
}

.bcard {
  margin: 35px;

  border-radius: 40px 40px 40px 40px;
  -moz-border-radius: 40px 40px 40px 40px;
  -webkit-border-radius: 40px 40px 40px 40px;
  border: 1px solid #000000;
}
</style>
