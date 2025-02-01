// Selección de elementos del DOM
const financeForm = document.getElementById('finance-form');
const incomeInput = document.getElementById('income');
const expensesInput = document.getElementById('expenses');
const balanceDisplay = document.getElementById('balance');
const financeChartCanvas = document.getElementById('financeChart');

// Inicializar instancia del gráfico
let chartInstance;

/**
 * Crea y actualiza el gráfico financiero.
 * @param {number} income - Cantidad de ingresos.
 * @param {number} expenses - Cantidad de gastos.
 */
const createChart = (income, expenses) => {
  const balance = income - expenses;

  const data = {
    labels: ['Ingresos', 'Gastos', 'Saldo Disponible'],
    datasets: [
      {
        label: 'Distribución Financiera',
        data: [income, expenses, balance],
        backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
      },
    ],
  };

  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  };

  // Destruir gráfico anterior si existe
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Crear nuevo gráfico
  chartInstance = new Chart(financeChartCanvas, config);
};

/**
 * Maneja el envío del formulario.
 * @param {Event} e - Evento de envío del formulario.
 */
const handleFormSubmit = (e) => {
  e.preventDefault();

  // Validar y obtener valores de los inputs
  const income = parseFloat(incomeInput.value.trim());
  const expenses = parseFloat(expensesInput.value.trim());

  if (!validateInputs(income, expenses)) {
    alert('Por favor, ingrese valores válidos mayores o iguales a cero.');
    return;
  }

  // Calcular saldo y actualizar la interfaz
  const balance = income - expenses;
  updateBalanceDisplay(balance);

  // Actualizar el gráfico
  createChart(income, expenses);

  // Limpiar los campos del formulario
  financeForm.reset();
};

/**
 * Valida los valores ingresados.
 * @param {number} income - Valor de ingresos.
 * @param {number} expenses - Valor de gastos.
 * @returns {boolean} - Devuelve true si los valores son válidos, de lo contrario false.
 */
const validateInputs = (income, expenses) => {
  return (
    !isNaN(income) &&
    !isNaN(expenses) &&
    income >= 0 &&
    expenses >= 0
  );
};

/**
 * Actualiza el saldo disponible en la interfaz.
 * @param {number} balance - Saldo calculado.
 */
const updateBalanceDisplay = (balance) => {
  const balanceColor = balance >= 0 ? '#4caf50' : '#f44336'; // Verde si es positivo, rojo si es negativo
  balanceDisplay.textContent = `Saldo Disponible: S/.${balance.toFixed(2)}`;
  balanceDisplay.style.color = balanceColor;
};

// Escuchar el evento de envío del formulario
financeForm.addEventListener('submit', handleFormSubmit);
