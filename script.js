document.addEventListener('DOMContentLoaded', () => {
    const claveCorrecta = "2485";
    let saldoDisponible = 10000;
    let intentos = 0;
    const maxIntentos = 3;

    const authForm = document.getElementById('auth-form');
    const authMessage = document.getElementById('auth-message');
    const transactionSection = document.getElementById('transaction-section');
    const transactionForm = document.getElementById('transaction-form');
    const saldoDisponibleSpan = document.getElementById('saldo-disponible');
    const transactionMessage = document.getElementById('transaction-message');

    authForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const clave = document.getElementById('clave').value;

        if (clave === claveCorrecta) {
            authMessage.textContent = "Clave correcta. Acceso concedido.";
            authMessage.style.color = "green";
            document.getElementById('auth-section').style.display = 'none';
            transactionSection.style.display = 'block';
        } else {
            intentos++;
            if (intentos >= maxIntentos) {
                authMessage.textContent = "Número máximo de intentos alcanzado. Acceso denegado.";
                authMessage.style.color = "red";
                authForm.querySelector('button').disabled = true;
            } else {
                authMessage.textContent = `Respuesta no válida. Te quedan ${maxIntentos - intentos} intento(s).`;
                authMessage.style.color = "red";
            }
        }
    });

    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const retiro = parseFloat(document.getElementById('retiro').value);

        if (retiro > saldoDisponible) {
            transactionMessage.textContent = "Saldo no disponible";
        } else {
            saldoDisponible -= retiro;
            saldoDisponibleSpan.textContent = saldoDisponible.toFixed(2);
            transactionMessage.textContent = `Retiro realizado. Tu saldo disponible es de ${saldoDisponible.toFixed(2)}`;
        }
        transactionMessage.style.color = "red";
    });
});