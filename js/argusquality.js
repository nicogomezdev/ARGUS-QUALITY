let radarChart = null;

document.getElementById("evaluacionForm").addEventListener("submit", function(e){
  e.preventDefault();

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

  document.getElementById("resultado").innerText = `Calificación final: ${promedio.toFixed(1)} (${interpretacion})`;
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

  // Creamos el documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

  // Título principal
  doc.setFontSize(16);
  doc.text("Informe de Evaluación de Calidad de Software", 20, 20);

  doc.setFontSize(12);
  doc.text("Resultados de las métricas (escala de 0 a 5):", 20, 35);

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

  // Texto con métricas
  const datos = [
    `Funcionalidad: ${funcionalidad.toFixed(1)}`,
    `Usabilidad: ${usabilidad.toFixed(1)}`,
    `Seguridad: ${seguridad.toFixed(1)}`,
    `Rendimiento: ${rendimiento.toFixed(1)}`,
    `Confiabilidad: ${confiabilidad.toFixed(1)}`,
    `Eficiencia: ${eficiencia.toFixed(1)}`,
    `Portabilidad: ${portabilidad.toFixed(1)}`,
  ];

  // Escribimos cada línea en el PDF
  let y = 45;
  datos.forEach(dato => {
    doc.text(dato, 25, y);
    y += 8;
  });

  // Calificación final
  y += 5;
  doc.setFont(undefined, "bold");
  doc.text(`Calificación final: ${promedio.toFixed(1)} (${interpretacion})`, 20, y);
  doc.setFont(undefined, "normal");

  // 🧠 Capturamos la gráfica de Chart.js como imagen
  const canvas = document.getElementById("graficoCalidad");
  const imgData = canvas.toDataURL("image/png");

  // Agregamos el gráfico debajo del texto
  doc.addImage(imgData, "PNG", 30, y + 10, 140, 140);

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