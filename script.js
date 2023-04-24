// Leer el archivo CSV con los resultados
d3.csv("resultados.csv").then(function (datos) {
    // Obtener los datos de la tabla
    var columnas = ["cluster", "rotacion_promedio", "headcount_2023", "headcount_2024"];
    var filas = [];
    datos.forEach(function (dato) {
      var fila = [];
      columnas.forEach(function (columna) {
        fila.push(dato[columna]);
      });
      filas.push(fila);
    });
  
    // Crear la tabla con los datos
    $("#tabla").DataTable({
      data: filas,
      columns: [
        { title: "Cluster" },
        { title: "Rotación promedio" },
        { title: "Headcount 2023" },
        { title: "Headcount 2024" },
      ],
    });
  
    // Obtener los datos para la gráfica
    var clusters = datos.map(function (dato) {
      return dato.cluster;
    });
    var rotacion = datos.map(function (dato) {
      return dato.rotacion_promedio;
    });
    var headcount2023 = datos.map(function (dato) {
      return dato.headcount_2023;
    });
    var headcount2024 = datos.map(function (dato) {
      return dato.headcount_2024;
    });
  
    // Crear la gráfica con los datos
    var trace1 = {
      x: clusters,
      y: rotacion,
      name: "Rotación promedio",
      type: "bar",
    };
    var trace2 = {
      x: clusters,
      y: headcount2023,
      name: "Headcount 2023",
      type: "bar",
    };
    var trace3 = {
      x: clusters,
      y: headcount2024,
      name: "Headcount 2024",
      type: "bar",
    };
    var data = [trace1, trace2, trace3];
    var layout = { barmode: "group", title: "Resultados" };
    Plotly.newPlot("grafica", data, layout);
  });  
