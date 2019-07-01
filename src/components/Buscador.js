import React, { Component } from "react";

class Buscador extends Component {
  busquedaRef = React.createRef();

  obtenerDatos = e => {
    e.preventDefault();
    const termino = this.busquedaRef.current.value; // tomamos el valor de input
    this.props.datosBusqueda(termino); // lo enviamos al componente principal
  };

  render() {
    return (
      <form onSubmit={this.obtenerDatos}>
        <div className="row">
          <div className="form-group col-md-8">
            <input
              ref={this.busquedaRef}
              type="text"
              className="form-control form-control-lg"
              placeholder="Buscar Imágen"
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="submit"
              className="btn btn-danger btn-lg btn-block"
              value="Buscar"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default Buscador;
