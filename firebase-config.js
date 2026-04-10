// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, push, get, child, update, remove } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW21_cocni8lZTfPqEJTem4itJkvMTIMQ",
  authDomain: "cantina-19288.firebaseapp.com",
  projectId: "cantina-19288",
  storageBucket: "cantina-19288.firebasestorage.app",
  messagingSenderId: "100483187826",
  appId: "1:100483187826:web:7d4575eeee546539e76eeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Variáveis globais
let produtosFirebase = [];
let vendasFirebase = [];
let despesasFirebase = [];
let categoriasFirebase = [];

// Função para carregar dados do Firebase em tempo real
function carregarDadosFirebase() {
    // Carregar produtos
    const produtosRef = ref(database, 'produtos');
    onValue(produtosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            produtosFirebase = Object.values(data);
            localStorage.setItem('produtos', JSON.stringify(produtosFirebase));
        } else {
            produtosFirebase = [];
            localStorage.setItem('produtos', JSON.stringify([]));
        }
        
        // Atualizar tela se a função existir
        if(typeof carregarProdutos === 'function') carregarProdutos();
        if(typeof carregarProdutosFirebase === 'function') carregarProdutosFirebase();
        if(typeof carregarProdutosNoSelect === 'function') carregarProdutosNoSelect();
    });
    
    // Carregar vendas
    const vendasRef = ref(database, 'vendas');
    onValue(vendasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            vendasFirebase = Object.values(data);
            localStorage.setItem('vendas', JSON.stringify(vendasFirebase));
        } else {
            vendasFirebase = [];
            localStorage.setItem('vendas', JSON.stringify([]));
        }
        
        if(typeof atualizarVendasHoje === 'function') atualizarVendasHoje();
        if(typeof carregarUltimasVendas === 'function') carregarUltimasVendas();
        if(typeof carregarUltimasVendasFirebase === 'function') carregarUltimasVendasFirebase();
    });
    
    // Carregar despesas
    const despesasRef = ref(database, 'despesas');
    onValue(despesasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            despesasFirebase = Object.values(data);
            localStorage.setItem('despesas', JSON.stringify(despesasFirebase));
        } else {
            despesasFirebase = [];
            localStorage.setItem('despesas', JSON.stringify([]));
        }
        
        if(typeof carregarDespesas === 'function') carregarDespesas();
    });
    
    // Carregar categorias
    const categoriasRef = ref(database, 'categorias');
    onValue(categoriasRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            categoriasFirebase = Object.values(data);
            localStorage.setItem('categorias', JSON.stringify(categoriasFirebase));
        } else {
            categoriasFirebase = [];
            localStorage.setItem('categorias', JSON.stringify([]));
        }
        
        if(typeof carregarCategorias === 'function') carregarCategorias();
        if(typeof carregarCategoriasFirebase === 'function') carregarCategoriasFirebase();
        if(typeof carregarCategoriasNoSelect === 'function') carregarCategoriasNoSelect();
    });
}

// Função para salvar produtos no Firebase
function salvarProdutosFirebase(produtos) {
    const produtosRef = ref(database, 'produtos');
    set(produtosRef, produtos);
}

// Função para adicionar um novo produto
function adicionarProdutoFirebase(produto) {
    const produtosRef = ref(database, 'produtos');
    get(produtosRef).then((snapshot) => {
        let produtos = [];
        if (snapshot.exists()) {
            produtos = Object.values(snapshot.val());
        }
        produtos.push(produto);
        set(produtosRef, produtos);
    });
}

// Função para salvar venda no Firebase
function salvarVendaFirebase(venda) {
    const vendasRef = ref(database, 'vendas');
    get(vendasRef).then((snapshot) => {
        let vendas = [];
        if (snapshot.exists()) {
            vendas = Object.values(snapshot.val());
        }
        vendas.push(venda);
        set(vendasRef, vendas);
    });
}

// Função para salvar despesa no Firebase
function salvarDespesaFirebase(despesa) {
    const despesasRef = ref(database, 'despesas');
    get(despesasRef).then((snapshot) => {
        let despesas = [];
        if (snapshot.exists()) {
            despesas = Object.values(snapshot.val());
        }
        despesas.push(despesa);
        set(despesasRef, despesas);
    });
}

// Função para salvar categorias no Firebase
function salvarCategoriasFirebase(categorias) {
    const categoriasRef = ref(database, 'categorias');
    set(categoriasRef, categorias);
}

// Função para adicionar uma nova categoria
function adicionarCategoriaFirebase(categoria) {
    const categoriasRef = ref(database, 'categorias');
    get(categoriasRef).then((snapshot) => {
        let categorias = [];
        if (snapshot.exists()) {
            categorias = Object.values(snapshot.val());
        }
        categorias.push(categoria);
        set(categoriasRef, categorias);
    });
}

// Função para excluir venda no Firebase
function excluirVendaFirebase(id) {
    const vendasRef = ref(database, 'vendas');
    get(vendasRef).then((snapshot) => {
        if (snapshot.exists()) {
            let vendas = Object.values(snapshot.val());
            let novasVendas = vendas.filter(v => v.id !== id);
            set(vendasRef, novasVendas);
        }
    });
}

// Função para excluir despesa no Firebase
function excluirDespesaFirebase(id) {
    const despesasRef = ref(database, 'despesas');
    get(despesasRef).then((snapshot) => {
        if (snapshot.exists()) {
            let despesas = Object.values(snapshot.val());
            let novasDespesas = despesas.filter(d => d.id !== id);
            set(despesasRef, novasDespesas);
        }
    });
}

// Função para excluir produto no Firebase
function excluirProdutoFirebase(id) {
    const produtosRef = ref(database, 'produtos');
    get(produtosRef).then((snapshot) => {
        if (snapshot.exists()) {
            let produtos = Object.values(snapshot.val());
            let novosProdutos = produtos.filter(p => p.id !== id);
            set(produtosRef, novosProdutos);
        }
    });
}

// Função para atualizar produto no Firebase
function atualizarProdutoFirebase(id, novosDados) {
    const produtosRef = ref(database, 'produtos');
    get(produtosRef).then((snapshot) => {
        if (snapshot.exists()) {
            let produtos = Object.values(snapshot.val());
            for(let i = 0; i < produtos.length; i++) {
                if(produtos[i].id === id) {
                    produtos[i] = { ...produtos[i], ...novosDados };
                    break;
                }
            }
            set(produtosRef, produtos);
        }
    });
}

// Inicializar
carregarDadosFirebase();

// Exportar funções para uso global (para versão não-modular)
if(typeof window !== 'undefined') {
    window.database = database;
    window.salvarProdutosFirebase = salvarProdutosFirebase;
    window.adicionarProdutoFirebase = adicionarProdutoFirebase;
    window.salvarVendaFirebase = salvarVendaFirebase;
    window.salvarDespesaFirebase = salvarDespesaFirebase;
    window.salvarCategoriasFirebase = salvarCategoriasFirebase;
    window.adicionarCategoriaFirebase = adicionarCategoriaFirebase;
    window.excluirVendaFirebase = excluirVendaFirebase;
    window.excluirDespesaFirebase = excluirDespesaFirebase;
    window.excluirProdutoFirebase = excluirProdutoFirebase;
    window.atualizarProdutoFirebase = atualizarProdutoFirebase;
}