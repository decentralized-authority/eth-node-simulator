import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const min = parseInt(process.argv[process.argv.length - 2]);
const max = parseInt(process.argv[process.argv.length - 1]);

const port = 3333;

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

express()
  .use(bodyParser.json())
  .use(cors())
  .post('*', (req, res) => {
    const randomInt = getRandomInt(min, max);
    const { body = {} } = req;
    let payload: string;
    if(!body.method) {
      return res.sendStatus(400);
    } else if(body.method === 'eth_blockNumber') {
      payload = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        result: '0xfc38c6',
      });
    } else {
      payload = JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        result: {
          number: '0xb442',
          hash: '0x1fb425a9f6d8a3ce857106ffd2b5f482f9a9e17cb40927de51d85a4f34a5ce53',
          parentHash: '0x30257c51fea60fba01c03a03b8d6ffcf37e8ddff4c9cb24ea86336b8aa5474eb',
          nonce: '0x0000000000000000',
          mixHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
          sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
          logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          stateRoot: '0x1ca236ef70c2da91d8001df9cc3e2904c016788d095dce89142b072151f5441a',
          miner: '0x45df588b05a675b5f16e253aa15d90333df9fedf',
          difficulty: '0x0',
          extraData: '0x',
          size: '0x275',
          gasLimit: '0x6f05b59d3b20000',
          gasUsed: '0x0',
          vrf: '0x0000000000000000000000000000000000000000000000000000000000000000',
          vrfProof: '0x',
          timestamp: '0x5d1bf180',
          transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
          receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
          uncles: [],
          transactions: []
        },
      });
    }
    setTimeout(() => {
      res.type('application/json');
      res.status(200);
      res.send(JSON.parse(payload));
    }, randomInt);
  })
  .use((req, res) => {
    res.sendStatus(404);
  })
  .listen(port, () => {
    console.log(`eth-node-simulator listening on port ${port}`);
  });
