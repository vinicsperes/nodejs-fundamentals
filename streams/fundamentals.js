import { Readable, Writable, Transform } from 'node:stream'

//A sacada das streams é não precisar esperar o arquivo todo ser lido para processar seus dados

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        this.push(null)
      } else {
        //Buffer é o modelo em que o node transiciona dados entre Streams
        const buff = Buffer.from(String(i))

        //isso vai ser o chunk lido na Stream de escrita
        this.push(buff)
      }
    }, 1000)
  }
}

class InverseNumberStream extends Transform {
  //chunk -> pedaço lido na stream de leitura
  //enconding -> como essa informação está codificada
  //callback -> func executada ao final
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1

    //o primeiro parâmetro da callback é para erros: new Error('not valid'), por exemplo
    callback(null, Buffer.from(String(transformed)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

//Lendo a Stream enquanto escreve no terminal
//new OneToHundredStream().pipe(process.stdout)

//Lendo dados da Stream que está retornando números de 1 a 100 e escrevendo
//esses dados dentro de uma Stream de escrita, que processa dados.
// new OneToHundredStream().pipe(new MultiplyByTenStream())

// A Stream de transformação, obrigatoriamente lê dados de um lugar e escreve em outro (Stream de comunicação)
new OneToHundredStream() 
  .pipe(new InverseNumberStream()) 
  .pipe(new MultiplyByTenStream()) 
