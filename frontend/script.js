// 1. SELEÇÃO DE ELEMENTOS
const form = document.getElementById('formCadastro');
const inputCpf = document.getElementById('cpf');
const inputTelefone = document.getElementById('telefone');

// 2. MÁSCARA DE CPF EM TEMPO REAL
// Usamos o evento 'input' porque ele dispara a cada tecla digitada
inputCpf.addEventListener('input', (e) => {
    // Pegamos o valor, removemos tudo que NÃO é número (RegEx \D)
    let v = e.target.value.replace(/\D/g, "");
    
    // Aplicamos a formatação progressivamente
    if (v.length > 3) v = v.replace(/^(\d{3})(\d)/, "$1.$2");
    if (v.length > 6) v = v.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
    if (v.length > 9) v = v.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    
    e.target.value = v; // Devolve o valor formatado para o campo
});

// 3. MÁSCARA DE TELEFONE (Formato: (00) 00000-0000)
inputTelefone.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, "");
    
    if (v.length > 2) v = v.replace(/^(\d{2})(\d)/, "($1) $2");
    if (v.length > 7) v = v.replace(/(\d{5})(\d)/, "$1-$2");
    
    e.target.value = v;
});

// 4. PROCESSAMENTO DO FORMULÁRIO
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Criamos um objeto com os dados limpos para o futuro Banco de Dados
    const dadosAluno = {
        nome: document.getElementById('nome').value.trim().toUpperCase(),
        cpf: inputCpf.value.replace(/\D/g, ""), // Remove pontos e traços antes de salvar
        telefone: inputTelefone.value.replace(/\D/g, ""),
        matricula: gerarMatricula()
    };

    alert(`Sucesso! Aluno: ${dadosAluno.nome}\nMatrícula: ${dadosAluno.matricula}`);
    
    form.reset(); // Limpa o formulário
});

// 5. FUNÇÃO DE MATRÍCULA (Encapsulamento)
function gerarMatricula() {
    let proximo = localStorage.getItem('contador') || 1;
    const ano = 2026;
    const formatado = String(proximo).padStart(4, '0');
    
    localStorage.setItem('contador', parseInt(proximo) + 1);
    return `${ano}${formatado}`;
}