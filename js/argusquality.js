let radarChart = null;

document.getElementById("evaluacionForm").addEventListener("submit", function(e){
  e.preventDefault();
  let titulo = document.getElementById("titulo").value;
  let funcionalidad = parseFloat(document.getElementById("funcionalidad").value);
  let usabilidad = parseFloat(document.getElementById("usabilidad").value);
  let seguridad = parseFloat(document.getElementById("seguridad").value);
  let rendimiento = parseFloat(document.getElementById("rendimiento").value);
  let confiabilidad = parseFloat(document.getElementById("confiabilidad").value);
  let eficiencia = parseFloat(document.getElementById("eficiencia").value);
  let portabilidad = parseFloat(document.getElementById("portabilidad").value);

  // Ponderado simple
  let promedio = (funcionalidad + usabilidad + seguridad + rendimiento + confiabilidad + eficiencia + portabilidad) / 7;

  let interpretacion = "";
  if(promedio < 2) interpretacion = "Baja calidad";
  else if(promedio < 3.5) interpretacion = "Calidad media";
  else interpretacion = "Alta calidad";




  document.getElementById("resultado").innerText = `Calificación final para software ${titulo}: ${promedio.toFixed(1)} (${interpretacion})`;
    const ctx = document.getElementById('graficoCalidad').getContext('2d');

  // Si ya existe un gráfico anterior, lo destruimos antes de crear uno nuevo
  if (radarChart) {
    radarChart.destroy();
  }

  // 6️⃣ Datos para la gráfica
  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Funcionalidad',
        'Usabilidad',
        'Seguridad',
        'Rendimiento',
        'Confiabilidad',
        'Eficiencia',
        'Portabilidad'
      ],
      datasets: [{
        label: 'Evaluación de calidad (0 - 5)',
        data: [
          funcionalidad,
          usabilidad,
          seguridad,
          rendimiento,
          confiabilidad,
          eficiencia,
          portabilidad
        ],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // azul transparente
        borderColor: 'rgba(54, 162, 235, 1)',       // borde azul fuerte
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      scales: {
        r: {
          angleLines: { color: '#ccc' },
          suggestedMin: 0,
          suggestedMax: 5,
          ticks: { stepSize: 1, color: '#555' },
          pointLabels: { color: '#222', font: { size: 14 } }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
});




// Escuchamos el clic en el botón PDF
document.getElementById("btnpdf").addEventListener("click", function() {

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logo = document.getElementById("logoAQ");
  if (logo) {
    const imgData = logo.src;
    doc.addImage(imgData, "PNG", 160, 5, 30, 15); // (x, y, width, height)
  }
  // Título principal (en mayúscula y negrilla)
  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text("INFORME DE EVALUACIÓN DE CALIDAD DE SOFTWARE", 20, 30);

  // Descripción con título dinámico (ajustada y en negrilla)
  const titulo = document.getElementById("titulo").value.toUpperCase() || "SIN TÍTULO";
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  const textoDescripcion = `RESULTADOS DE LA EVALUACIÓN DEL SOFTWARE "${titulo}" SEGÚN LAS MÉTRICAS \n DE CALIDAD (ESCALA DE 0 A 5):`;
  const lineas = doc.splitTextToSize(textoDescripcion, 200);
  doc.text(lineas, 20, 35);

  // Restablecer fuente normal
  doc.setFont(undefined, "normal");

  // Obtener valores del formulario
  const funcionalidad = parseFloat(document.getElementById("funcionalidad").value);
  const usabilidad     = parseFloat(document.getElementById("usabilidad").value);
  const seguridad      = parseFloat(document.getElementById("seguridad").value);
  const rendimiento    = parseFloat(document.getElementById("rendimiento").value);
  const confiabilidad  = parseFloat(document.getElementById("confiabilidad").value);
  const eficiencia     = parseFloat(document.getElementById("eficiencia").value);
  const portabilidad   = parseFloat(document.getElementById("portabilidad").value);

  const promedio = (funcionalidad + usabilidad + seguridad + rendimiento + confiabilidad + eficiencia + portabilidad) / 7;
  const interpretacion = promedio < 2 ? "Baja calidad" : (promedio < 3.5 ? "Calidad media" : "Alta calidad");

  // Texto con métricas
  const datos = [
    `Funcionalidad: ${funcionalidad.toFixed(1)}`,
    `Usabilidad: ${usabilidad.toFixed(1)}`,
    `Seguridad: ${seguridad.toFixed(1)}`,
    `Rendimiento: ${rendimiento.toFixed(1)}`,
    `Confiabilidad: ${confiabilidad.toFixed(1)}`,
    `Eficiencia: ${eficiencia.toFixed(1)}`,
    `Portabilidad: ${portabilidad.toFixed(1)}`
  ];

  // Escribir métricas
  let y = 55;
  datos.forEach(dato => {
    doc.text(dato, 25, y);
    y += 8;
  });

  // Calificación final (en negrilla)
  y += 5;
  doc.setFont(undefined, "bold");
  doc.text(`CALIFICACIÓN FINAL: ${promedio.toFixed(1)} (${interpretacion.toUpperCase()})`, 20, y);
  doc.setFont(undefined, "normal");

  // Capturamos la gráfica
  const canvas = document.getElementById("graficoCalidad");
  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 45, y + 10, 140 , 140);

  // Guardamos el archivo
  doc.save("informe_calidad_software.pdf");
});

document.getElementById("btncsv").addEventListener("click", function() {
  // Obtenemos los valores del formulario
  const funcionalidad = parseFloat(document.getElementById("funcionalidad").value);
  const usabilidad     = parseFloat(document.getElementById("usabilidad").value);
  const seguridad      = parseFloat(document.getElementById("seguridad").value);
  const rendimiento    = parseFloat(document.getElementById("rendimiento").value);
  const confiabilidad  = parseFloat(document.getElementById("confiabilidad").value);
  const eficiencia     = parseFloat(document.getElementById("eficiencia").value);
  const portabilidad   = parseFloat(document.getElementById("portabilidad").value);

  const promedio = (funcionalidad + usabilidad + seguridad + rendimiento + confiabilidad + eficiencia + portabilidad) / 7;
  let interpretacion = promedio < 2 ? "Baja calidad" : (promedio < 3.5 ? "Calidad media" : "Alta calidad");

  // Creamos los encabezados y datos
  const encabezados = ["Criterio", "Calificación"];
  const datos = [
    ["Funcionalidad", funcionalidad.toFixed(1)],
    ["Usabilidad", usabilidad.toFixed(1)],
    ["Seguridad", seguridad.toFixed(1)],
    ["Rendimiento", rendimiento.toFixed(1)],
    ["Confiabilidad", confiabilidad.toFixed(1)],
    ["Eficiencia", eficiencia.toFixed(1)],
    ["Portabilidad", portabilidad.toFixed(1)],
    ["Promedio", promedio.toFixed(1)],
    ["Interpretación", interpretacion]
  ];

  // Convertimos todo a formato CSV
  let csvContent = encabezados.join(",") + "\n";
  datos.forEach(fila => {
    csvContent += fila.join(",") + "\n";
  });

  // Creamos el blob (archivo en memoria)
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Creamos un enlace temporal para descargar
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "resultado_calidad.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});