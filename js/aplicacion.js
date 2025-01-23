// Obtener referencias a los elementos del DOM
const financeForm = document.getElementById('finance-form');
const incomeInput = document.getElementById('income');
const expensesInput = document.getElementById('expenses');
const balanceDisplay = document.getElementById('balance');
const financeChartCanvas = document.getElementById('financeChart');

// Inicializar datos para el gráfico
let chartInstance;

const createChart = (income, expenses) => {
  const data = {
    labels: ['Ingresos', 'Gastos', 'Saldo Disponible'],
    datasets: [
      {
        label: 'Distribución Financiera',
        data: [income, expenses, income - expenses],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };

  const config = {
    type: 'pie',
    data: data,
  };

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(financeChartCanvas, config);
};

// Manejar el envío del formulario
financeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener valores de ingresos y gastos
  const income = parseFloat(incomeInput.value);
  const expenses = parseFloat(expensesInput.value);

  if (isNaN(income) || isNaN(expenses)) {
    alert('Por favor, ingrese valores válidos.');
    return;
  }

  // Calcular el saldo
  const balance = income - expenses;

  // Mostrar el saldo en la interfaz
  balanceDisplay.textContent = `Saldo Disponible: $${balance.toFixed(2)}`;

  // Actualizar el gráfico
  createChart(income, expenses);
});
