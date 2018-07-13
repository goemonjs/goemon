const { buildSchema } = require('graphql');

class HelloService {

  public get schema() {
    return buildSchema(`
        type Query {
          hello: String,
          rollDice(numDice: Int!, numSides: Int): [Int],
          hoge(value: String): String,
          plus(a: Int, b: Int): Int
        }
      `
    );
  }

  public get rootValue() {
    return {
      hello: this.hello,
      rollDice: this.rollDice,
      hoge: this.hoge,
      plus: this.plus
    };
  }

  public hello() {
    let result = 'Hello world!';
    return result;
  }

  public rollDice({numDice, numSides}) {
    let output: number[] = [];
    for (let i = 0; i < numDice; i++) {
      let diceResult = 1 + Math.floor(Math.random() * (numSides || 6));
      output.push(diceResult);
    }
    return output;
  }

  public hoge({value}) {
    let result = 'Hoge world!' + value;
    return result;
  }

  public plus({a, b}) {
    return a + b;
  }
}

export default new HelloService();
