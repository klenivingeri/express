const express = require('express');
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(cors())

app.get("/", cors(), (req, res, next) => {
  const linguica = {
    nome: 'erickin',
    sobrenome: 'kleniving'
  }
  res.json(linguica)
})

app.get("/nome/:pesquisa", cors(), (req, res, next) => {
  const { pesquisa } = req.params;
  console.log('1', pesquisa)
  const newArray = pesquisa.split(' ')
  const arrayDeNome = []
  for (nome of newArray) {
    arrayDeNome.push(AumentaPrimeiraLetra(nome))
  }

  console.log('2', arrayDeNome)
  res.json(arrayDeNome)
})

app.post("/v3/orders/tracking", (req, res) => {
  const { query, body } = req;
  console.log('Event')
  //res.status(400)
  //res.json({messageError: 'Algo deu errado Event'})
  res.json({
    records:[{
      order: query['order.id'],
      date: body.date,
      status: body.status,
    }]
  })
})


app.post("/v1/audit/orders", (req, res) => {
  const { body } = req;
  console.log('Sherlog')
  //res.status(400)
  //res.json({messageError: 'Algo deu errado'})
  res.json(body)
})

app.get("/v1/audit/orders/:orders/suborders/:suborders", (req, res) => {
  console.log('getSherlog', req.params.orders)
  res.json({records: { orderId: req.params.orders, suborders: req.params.suborders}})
})


app.get("/v1/oc/process/:id/uploaded_file", (req, res) => {
  const { id } = req.params;
  console.log(`Download Upload File ${id}`)
  res.json({})
  
})

app.get("/v1/oc/process/:id/error_file", (req, res) => {
  const { id } = req.params;
  console.log(`Download Upload Erro File ${id}`)
  res.json({})
})

app.get("/v1/oc/param", async (req, res) => {
  console.log({
    message: 'params',
  })

  return res.json({
    max_upload_file_size_in_bytes: 10485760,
    max_upload_file_lines: 3000,
    approval_sla_in_days: 1
  }
  );
})


app.post("/v1/oc/process/upload", async (req, res) => {
  console.log({
    message: 'post success upload',
  })

  return res.json({
    id: "5349b4ddd2781d08c09890f3",
    message: "filename.xlsx em processamento",
  });
})

app.get("/v1/oc/process", (req, res) => {
  const { start_date, end_date, status = "" } = req.query;
  console.log({
    start_date,
    end_date,
    status
  })
  if (status == "IN_QUEUE") {
    res.json([ // Fake payload para criação da tela
      {
        id: '5349b4ddd2781d08n09890f3',
        original_file_name: 'produtos-motorola.csv',
        progress: 0,
        user: 'wi_koga',
        status: 'IN_QUEUE',
        created_at: '2022-10-05T21:28:22+00:00',
      },
    ])
  }
  if (status == "") {
    res.json({
      total_elements: 4,
      content: [ // Fake payload para criação da tela
      {
        id: '5349b4ddd2781d08n09890f3',
        original_file_name: 'produtos-motorola.csv',
        progress: 0,
        user: 'wi_koga',
        status: 'IN_QUEUE',
        created_at: '2022-10-05T21:28:22+00:00',
      },
      {
        id: '5349b4ddd2781d68c09890f3',
        original_file_name: 'produtos-motorola.csv',
        progress: 40,
        user: 'wi_koga',
        status: 'PROCESSING',
        created_at: '2022-10-05T21:28:22+00:00',
      },
      {
        id: '5349b4ddd2781d08c09990f3',
        original_file_name: 'produtos-motorola.csv',
        progress: 70,
        user: 'wi_koga',
        status: 'FINISHED_SUCCESS',
        created_at: '2022-10-05T21:28:22+00:00',
        product_lines: 2,
        products: 10,
        total_product_units: 2,
        total_net_cost: 135451500,
      },
      {
        id: '5349b4ddd2781d02c09890f3',
        original_file_name: 'produtos-motorola.csv',
        progress: 90,
        user: 'wi_koga',
        status: 'FINISHED_ERROR',
        created_at: '2022-10-05T21:28:22+00:00',
      },
    ]})
  }
})

app.get("/cliente/:nome/:sobrenome", (req, res) => {
  const { nome, sobrenome } = req.params;
  res.json(`nome: ${nome} ${sobrenome}`)
})

app.listen(4000, () => {
  console.log('server in running')
})

function AumentaPrimeiraLetra(nome) {
  console.log(nome.length)
  if (nome.length <= 3) {
    return nome
  }
  return nome[0].toUpperCase() + nome.substring(1)
}