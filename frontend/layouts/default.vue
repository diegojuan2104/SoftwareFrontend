<template>
  <div>
    <!--<nav class="navbar navbar-expand-lg navbar-dark bg-udem">
      <a class="navbar-brand" href="#">Gestión de propuestas de convenio</a>
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
        <ul class="navbar-nav ml-auto">
          <li>
            <nuxt-link class="wf" to="/">Cerrar Sesion</nuxt-link>
          </li>
        </ul>
      </div>
    </nav> -->

    <b-navbar toggleable type="light" variant="faded">
      <b-img
        src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg"
        fluid
        alt="Fluid image"
        width="200px"
      ></b-img>

      <div class="title">
        Gestión de Propuestas y Evaluaciones de Convenios
      </div>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <a href="/" class="link">
          Cerrar Sesión
        </a>
      </b-navbar-toggle>
    </b-navbar>

    <nuxt />
  </div>
</template>

<script>
import axios from "axios";
export default {};
</script>

<style>
.link {
  color: #ed0034;
}

.link:hover {
  text-decoration: none;
  color: #ed0034;
}
.wf {
  color: #ffffff;
  margin: 10px;
  font-size: 15px;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.title {
  font-family: "Oswald", sans-serif;
  margin: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #ed0034;
}

.center {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
}

.navbar-dark .navbar-brand {
  color: white;
  font-size: 25px;
  font-weight: bold;
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
  background-image: url("../images/background-01.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.bcard {
  margin-top: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: stretch;
  -webkit-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  -moz-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
}
</style>
