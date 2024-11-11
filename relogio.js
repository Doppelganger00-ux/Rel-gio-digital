// Obtém elementos do DOM para manipular o relógio e os fusos horários
const clockElement = document.getElementById('clock');
const timezoneSelect = document.getElementById('timezone');
const timezoneSearch = document.getElementById('timezoneSearch');

// Função para atualizar o relógio
const updateClock = () => {
    const selectedTimezone = timezoneSelect.value; // Obtém o fuso horário selecionado
    const now = new Date(); // Cria um novo objeto de data
    const options = {
        timeZone: selectedTimezone, // Define o fuso horário
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false // Usa o formato de 24 horas
    };
    // Atualiza o texto do elemento clock com a hora formatada
    clockElement.textContent = new Intl.DateTimeFormat('pt-BR', options).format(now);
};

// Função para preencher a lista de fusos horários
const populateTimezones = () => {
    const timezones = Intl.supportedValuesOf('timeZone'); // Obtém fusos horários suportados
    timezones.forEach(tz => {
        const option = document.createElement('option'); // Cria um elemento de opção
        option.value = tz; // Define o valor da opção como o fuso horário
        option.textContent = tz; // Define o texto da opção
        timezoneSelect.appendChild(option); // Adiciona a opção ao select
    });
    // Define o fuso horário padrão como o do dispositivo
    timezoneSelect.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
};

// Evento para filtrar fusos horários com base na entrada do usuário
timezoneSearch.addEventListener('input', () => {
    const filter = timezoneSearch.value.toLowerCase(); // Obtém o valor da pesquisa em minúsculas
    const options = timezoneSelect.options; // Obtém todas as opções do select
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        // Mostra ou esconde opções com base na correspondência do texto
        option.style.display = option.textContent.toLowerCase().includes(filter) ? '' : 'none';
    }
});

// Inicializa o relógio e a lista de fusos horários
populateTimezones();
updateClock();
setInterval(updateClock, 1000); // Atualiza o relógio a cada segundo