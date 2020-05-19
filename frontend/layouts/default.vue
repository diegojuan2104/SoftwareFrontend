<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-udem">
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
    </nav>

    <nuxt />
  </div>
</template>

<script>
import axios from "axios";
export default {
  async beforeMount() {}
};
</script>

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
.btn-primary {
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
