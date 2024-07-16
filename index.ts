class Posicao {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    distanciaPara(outro: Posicao): number {
        let dx: number = outro.x - this.x;
        let dy: number = outro.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }
}

class Personagem {
    nome: string;
    saude: number;
    alcance: number;
    dano: number;
    posicao: Posicao;

    constructor(nome: string, saúde: number, alcance: number, dano: number, posicao: Posicao) {
        this.nome = nome;
        this.saude = saúde;
        this.alcance = alcance;
        this.dano = dano;
        this.posicao = posicao;
    }

    mover(direcao: string): boolean {
        switch (direcao.toLowerCase()) {
            case 'cima':
                this.posicao.y += 1;
                break;
            case 'baixo':
                this.posicao.y -= 1;
                break;
            case 'esquerda':
                this.posicao.x -= 1;
                break;
            case 'direita':
                this.posicao.x += 1;
                break;
            default:
                return false;
        }
        return true;
    }

    atacar(inimigo: Personagem): boolean {
        let distancia = this.posicao.distanciaPara(inimigo.posicao);
        if (distancia <= this.alcance) {
            inimigo.saude -= this.dano;
            return true; 
        }
        return false;
    }
}

class Tabuleiro {
    largura: number;
    altura: number;
    personagens: Personagem[];

    constructor(largura: number, altura: number) {
        this.largura = largura;
        this.altura = altura;
        this.personagens = [];
    }

    adicionarPersonagem(personagem: Personagem) {
        this.personagens.push(personagem);
    }

    removerPersonagem(nome: string) {
        this.personagens = this.personagens.filter(p => p.nome !== nome);
    }

    encontrarPersonagem(nome: string): Personagem | undefined {
        return this.personagens.find(p => p.nome === nome);
    }
}

const tabuleiro = new Tabuleiro(10, 10);
const personagem1 = new Personagem("Guerreiro", 100, 1, 10, new Posicao(0, 0));
const personagem2 = new Personagem("Arqueiro", 75, 3, 8, new Posicao(1, 1));

tabuleiro.adicionarPersonagem(personagem1);
tabuleiro.adicionarPersonagem(personagem2);

console.log(tabuleiro.encontrarPersonagem("Guerreiro"));
console.log(tabuleiro.encontrarPersonagem("Arqueiro"));

personagem1.mover("direita");
console.log(personagem1.posicao); // Deve ser (1, 0)

const ataqueBemSucedido = personagem1.atacar(personagem2);
console.log(ataqueBemSucedido); // Deve ser true ou false dependendo da posição

console.log(personagem2.saude); // Mostra a saúde do personagem 2 após o ataque
