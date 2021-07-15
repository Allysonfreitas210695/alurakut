import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = '098d45683ceef5de46bd6c8343eb6c';
        const client = new SiteClient(TOKEN);

        // Validar os dados, antes de sair cadastrando
        const registro = await client.items.create({
             itemType: "966550", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de Teste",
            // imageUrl: "https://github.com/Allysonfreitas210695.png",
            // creatorSlug: "Allysonfreitas210695"
        })

        console.log(registro);

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registro,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
} 