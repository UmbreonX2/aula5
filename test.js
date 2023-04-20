const {deepEqual, ok} = require('assert')
const exp = require('constants')
const database = require('./database')

const DEFAULT_ITEM_CADASTRO = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Homem de Ferro',
    poder: 'Dinheiro',
    id: 2
}

describe('manipulação de Herois', ()=>{

    before(async()=>{
        await database.remover()
        await database.cadastrar(DEFAULT_ITEM_CADASTRO)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('deve pesquisar um heroi no arquivo', async()=>{
        const expect = DEFAULT_ITEM_CADASTRO
        const [resultado] = await database.listar(expect.id)

        deepEqual(resultado, expect)
    })

    it('Deve cadastrar um herói no arquivo', async() =>{
        const expect = DEFAULT_ITEM_CADASTRO
        await database.cadastrar(DEFAULT_ITEM_CADASTRO)
        const [resultado] = await database.listar(expect.id)
        deepEqual(resultado, expect)
    })

    it('deve remover um heroi do arquivo por id', async()=>{
        const expect = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRO.id)
        deepEqual(resultado, expect)
    })

    it.only('deve atualizar um heroi pelo id', async()=>{
        const expect={
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Poder'
        }

        const novoDado={
            nome: 'Batman',
            poder: 'Poder'
        }

        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)

        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)

        deepEqual(resultado, expect)
    })

})
