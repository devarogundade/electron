import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import type { ForeignCallInput, ForeignCallOutput } from '@noir-lang/noir_js';
import { JSONRPCClient } from "json-rpc-2.0";
import { toHex } from 'viem';

import circuit from "../circuits/funds.json";

export class NoirAPI {
    private async foreignCallHandler(
        name: string,
        inputs: ForeignCallInput[]
    ): Promise<ForeignCallOutput[]> {
        // // declaring the JSONRPCClient
        // const client: JSONRPCClient = new JSONRPCClient(async (jsonRPCRequest: any) => {
        //     // hitting the same JSON RPC Server we coded above
        //     const response = await fetch("http://localhost:8000", {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json",
        //         },
        //         body: JSON.stringify(jsonRPCRequest),
        //     });
        //     if (response.status === 200) {
        //         return response
        //             .json()
        //             .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
        //     } else if (jsonRPCRequest.id !== undefined) {
        //         return Promise.reject(new Error(response.statusText));
        //     }
        // });

        console.log('name', name);


        // const oracleReturn = await client.request(name, [
        //     { Array: inputs[0].map((i: any) => toHex(i)) },
        // ]);

        // return [oracleReturn.values[0].Array];
        return ['100000000'];
    }

    async proveFunds(inputs: any): Promise<string | null> {
        try {
            console.log(inputs);

            const backend = new BarretenbergBackend(circuit as any);
            const noir = new Noir(circuit as any, backend);

            console.log(noir);


            const result = await noir.generateProof(inputs, this.foreignCallHandler);

            console.log(result);

            return toHex(result.proof);
        } catch (error) {
            console.error(error);

            return null;
        }
    }
}