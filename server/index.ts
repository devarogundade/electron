import { JSONRPCServer } from 'json-rpc-2.0';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const server = new JSONRPCServer();

interface SingleForeignCallParam {
    Single: string,
}

interface ArrayForeignCallParam {
    Array: string[],
}

type ForeignCallParam = SingleForeignCallParam | ArrayForeignCallParam;

interface ForeignCallResult {
    values: ForeignCallParam[],
}

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    const jsonRPCRequest = req.body;
    server.receive(jsonRPCRequest).then((jsonRPCResponse) => {
        if (jsonRPCResponse) {
            res.json(jsonRPCResponse);
        } else {
            res.sendStatus(204);
        }
    });
});

server.addMethod(
    'get_balance_eth',
    async (params: SingleForeignCallParam[]): Promise<ForeignCallResult> => {
        console.log(params);

        const balance = 10000;

        return { values: [{ Single: balance.toString() }] };
    }
);

server.addMethod(
    'has_binance_sbt',
    async (params: SingleForeignCallParam[]): Promise<ForeignCallResult> => {
        console.log(params);

        const hasSbt = true;

        return { values: [{ Single: hasSbt.toString() }] };
    }
);

server.addMethod(
    'get_followers_count',
    async (params: SingleForeignCallParam[]): Promise<ForeignCallResult> => {
        console.log(params);

        const randomFollowers = randomIntFromInterval(90, 200);

        return { values: [{ Single: randomFollowers.toString() }] };
    }
);

function randomIntFromInterval(min: number, max: number) {
    // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`⚡ Server is started on http://localhost:${port}`);
});