import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("products").del();

    // Inserts seed entries
    await knex("products").insert([
        {
            "name": "Camiseta Básica",
            "description": "Camiseta de algodão 100% com corte regular.",
            "price": 49.9,
            "category": "Moda",
            "pictureUrl": "1.jpeg"
        },
        {
            "name": "Smartphone X10",
            "description": "Smartphone com 128GB de armazenamento e câmera de 48MP.",
            "price": 1999.99,
            "category": "Eletronicos",
            "pictureUrl": "https://example.com/images/smartphone-x10.jpg"
        },
        {
            "name": "Sofá 3 Lugares",
            "description": "Sofá confortável com revestimento em tecido de alta qualidade.",
            "price": 1299,
            "category": "CasaDecoracao",
            "pictureUrl": "https://example.com/images/sofa-3-lugares.jpg"
        },
        {
            "name": "Creme Hidratante Facial",
            "description": "Creme hidratante com ácido hialurônico para todos os tipos de pele.",
            "price": 59.9,
            "category": "SaudeBeleza",
            "pictureUrl": "https://example.com/images/creme-hidratante.jpg"
        },
        {
            "name": "Bicicleta Mountain Bike",
            "description": "Bicicleta com suspensão dupla e 21 marchas.",
            "price": 2499,
            "category": "EsporteLazer",
            "pictureUrl": "https://example.com/images/mountain-bike.jpg"
        },
        {
            "name": "Livro: A Arte da Guerra",
            "description": "Clássico da literatura sobre estratégia e liderança.",
            "price": 29.9,
            "category": "Livros",
            "pictureUrl": "https://example.com/images/a-arte-da-guerra.jpg"
        },
        {
            "name": "Caderno Universitário",
            "description": "Caderno com 200 folhas pautadas e capa dura.",
            "price": 19.9,
            "category": "Papelaria",
            "pictureUrl": "https://example.com/images/caderno-universitario.jpg"
        },
        {
            "name": "Boneca de Pano",
            "description": "Boneca artesanal feita com materiais hipoalergênicos.",
            "price": 39.9,
            "category": "Brinquedos",
            "pictureUrl": "https://example.com/images/boneca-de-pano.jpg"
        },
        {
            "name": "Fone de Ouvido Bluetooth",
            "description": "Fone de ouvido sem fio com cancelamento de ruído ativo.",
            "price": 399.9,
            "category": "Eletronicos",
            "pictureUrl": "https://example.com/images/fone-bluetooth.jpg"
        },
        {
            "name": "Mesa de Escritório",
            "description": "Mesa compacta com acabamento em madeira e estrutura metálica.",
            "price": 599,
            "category": "CasaDecoracao",
            "pictureUrl": "https://example.com/images/mesa-escritorio.jpg"
        },
        {
            "name": "Tênis Esportivo",
            "description": "Tênis leve e confortável, ideal para corridas e caminhadas.",
            "price": 299.9,
            "category": "EsporteLazer",
            "pictureUrl": "https://example.com/images/tenis-esportivo.jpg"
        },
        {
            "name": "Jaqueta de Couro",
            "description": "Jaqueta estilosa feita com couro sintético de alta qualidade.",
            "price": 499.9,
            "category": "Moda",
            "pictureUrl": "https://example.com/images/jaqueta-couro.jpg"
        },
        {
            "name": "Kit de Ferramentas",
            "description": "Conjunto com 50 peças para reparos domésticos.",
            "price": 149.9,
            "category": "CasaDecoracao",
            "pictureUrl": "https://example.com/images/kit-ferramentas.jpg"
        },
        {
            "name": "Jogo de Panelas Antiaderentes",
            "description": "Conjunto com 5 panelas antiaderentes de alta durabilidade.",
            "price": 349.9,
            "category": "CasaDecoracao",
            "pictureUrl": "https://example.com/images/jogo-panelas.jpg"
        },
        {
            "name": "Câmera Fotográfica Digital",
            "description": "Câmera compacta com resolução de 20MP e zoom óptico de 10x.",
            "price": 1299.9,
            "category": "Eletronicos",
            "pictureUrl": "https://example.com/images/camera-digital.jpg"
        },
        {
            "name": "Mochila Escolar",
            "description": "Mochila resistente com compartimento para notebook.",
            "price": 99.9,
            "category": "Papelaria",
            "pictureUrl": "https://example.com/images/mochila-escolar.jpg"
        },
        {
            "name": "Meu Produto",
            "description": "Esse é o meu produto incrível",
            "price": 100,
            "category": "Eletronicos",
            "pictureUrl": "21.jpeg"
        }
    ]);
};
