<script setup lang="ts">
import Web3 from 'web3';
// @ts-ignore
import { useStore } from 'vuex';
import { key } from '../store';
import { getVerifiers } from '@/scripts/verifiers';
import { getVerifier } from '@/scripts/verifiers';
import type { Verifier } from '@/types';
import { NoirAPI } from '@/scripts/noir';
import { hexToBytes, stringToBytes, toBytes } from 'viem';
import { notify } from '@/reactives/notify';

const emit = defineEmits(['close', 'unClose']);

const useProof = async () => {

};

const startVerifier = async (proofId: `0x${string}`) => {
    const verifier = getVerifier(proofId);

    if (verifier?.proofId == '0x66756e6473566572696669657200000000000000000000000000000000000000') {
        startFundsVerifier(verifier);
    }
};

const startFundsVerifier = async (verifier: Verifier) => {
    const { web3Instance, accounts } = await getWeb3();

    if (accounts.length == 0) {

        return;
    }

    const hashed_message = web3Instance.utils.stringToHex('Some data');

    if (!hashed_message) {
        return;
    }

    web3Instance.eth.personal.sign(
        hashed_message,
        accounts[0],
        '',
        async (error, signature) => {
            const noir = new NoirAPI();

            const response = await noir.proveFunds([
                hexToBytes(accounts[0], { size: 65 }),
                hexToBytes(signature as `0x${string}`, { size: 65 }),
                hexToBytes(hashed_message as `0x${string}`, { size: 32 })
            ]);

            if (response) {
                notify.push({
                    title: 'Proof generated.',
                    description: response,
                    category: 'success'
                });
            } else {
                notify.push({
                    title: 'Failed to generate proof.',
                    description: 'Try again.',
                    category: 'error'
                });
            }
        }
    );

};

const getWeb3 = async () => {
    let web3Instance;
    let accounts;

    if (window.ethereum) {
        web3Instance = new Web3(window.ethereum);
        try {
            await window.ethereum.request({
                method: "wallet_requestPermissions",
                params: [{
                    eth_accounts: {}
                }]
            });

            accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("accounts: ", accounts);
        } catch (error) {
            console.error("User denied account access");
            throw new Error("User denied account access");
        }
    } else {
        console.error("No web3 instance found, please install MetaMask");
        throw new Error("No web3 instance found, please install MetaMask");
    }

    return { web3Instance, accounts };
};
;</script>

<template>
    <div class="popup_container_2">
        <div class="scroll">
            <div class="popup_wrapper">
                <div class="header">
                    <h3>+0%</h3>
                    <p @click="emit('close')">Cancel</p>
                </div>

                <div class="verifiers">
                    <div class="verifier" v-for="verifier, index in getVerifiers()" :key="index">
                        <h3>{{ verifier.description }} (+{{ verifier.points }}%)</h3>
                        <button @click="startVerifier(verifier.proofId)">Start proving</button>

                        <br> <br>
                    </div>

                    <button class="action" @click="useProof">
                        Continue with (+0%)
                    </button>
                </div>

                <br> <br>
            </div>
        </div>
    </div>
</template>

<style scoped>
.popup_container_2 {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #000e34e9;
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.scroll {
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
}

.scroll::-webkit-scrollbar {
    display: none;
}

.popup_wrapper {
    width: 600px;
    max-height: 80vh;
}

.header {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #00000064;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: #fff;
}

.header p {
    padding: 10px 0;
    color: #d20808;
    cursor: pointer;
    font-weight: 600px;
}

.verifiers {
    padding: 0 20px;
}

.verifier {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
}


.verifier h3 {
    font-size: 20px;
    line-height: 30px;
    margin-bottom: 20px;
}

.verifier button {
    padding: 0 20px;
    height: 36px;
    background: #5454d5;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
}

.action {
    height: 50px;
    width: 100%;
    background: #1b1b4d;
    border: none;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
}
</style>