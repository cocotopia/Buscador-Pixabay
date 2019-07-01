import React, { Component } from "react";
import Buscador from "./components/Buscador";
import Resultado from "./components/Resultado";

class App extends Component {
  state = {
    termino: "",
    imagenes: [],
    pagina: ""
  };

  scrollArriba = () => {
    const element = document.querySelector(".jumbotron");
    element.scrollIntoView("smooth", "start");
  };

  paginaAnterior = () => {
    let pagina = this.state.pagina; // leer el state de la pagina actual
    if (pagina === 1) return null; // leer si la pagina es uno ya no ir atraz
    pagina = pagina - 1; // sumar uno a la pagina actual
    this.setState({ pagina }, () => {
      this.consultarApi(); // callback consultar nuevamente
      this.scrollArriba(); // scroll arriba
    }); // agregar el cambio al state
    //console.log(pagina);
  };

  paginaSiguiente = () => {
    let pagina = this.state.pagina; // leer el state de la pagina actual
    pagina = pagina + 1; // sumar uno a la pagina actual
    this.setState({ pagina }, () => {
      this.consultarApi(); // callback consultar nuevamente
      this.scrollArriba(); // scroll arriba
    }); // agregar el cambio al state
    //console.log(pagina);
  };

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=12917655-4ccdd7204469b34ea898e2f09&q=${termino}&per_page=12&page=${pagina}`;
    //console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }));
  };

  datosBusqueda = termino => {
    this.setState(
      {
        termino: termino,
        pagina: 1
      },
      () => {
        this.consultarApi();
      }
    );
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">Buscador de imágenes</h1>
          <p className="lead">
            from <strong>Pixabay</strong>
          </p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>

        {/*this.state.termino*/}
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
