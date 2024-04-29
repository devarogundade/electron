<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import ArrowDownIcon from './ArrowDownIcon.vue';
import VerifierPopup from './VerifierPopup.vue';
// @ts-ignore
import { useStore } from 'vuex';
import { key } from '../store';
import { borrow, calculateLtv } from '@/scripts/electron';
import type { Position, Proof } from '@/types';
import { getLoans, getPools, getPosition } from '@/scripts/subgraph';
import Converter from '@/scripts/converter';
import { getToken } from '@/scripts/tokens';
import { convertFromTo } from '@/scripts/erc20';
import { notify } from '@/reactives/notify';

const store = useStore(key);

const isDropdown = ref(false);

const estimatedPrincipal = ref('0');
const progress = ref(false);

const emit = defineEmits(['close', 'unClose']);

const props = defineProps({
    pool: { type: Object, required: true }
});

const ltv = ref<any>('70');

const pass = ref<any>([]);
const proofs = ref<Proof[]>([]);

const borrowLoan = async () => {
    if (progress.value) return;
    progress.value = true;

    const hash = await borrow(
        props.pool.poolId,
        proofs.value
    );
    if (hash) {
        notify.push({
            title: 'Transaction successful.',
            description: 'Transaction was sent.',
            category: 'success',
            linkTitle: 'View Trx',
            linkUrl: `https://sepolia.scrollscan.com/tx/${hash}`
        });

        if (store.state.address) {
            setTimeout(async () => {
                store.commit('setPools', await getPools());
                store.commit('setLoans', await getLoans(store.state.address));
            }, 3000);
        }

        emit('close');
    } else {
        notify.push({
            title: 'Failed to send transaction.',
            description: 'Try again.',
            category: 'error'
        });
    }

    progress.value = false;
};

const proofing = ref(false);

const position = ref<Position | null>(null);

const cancelProofs = () => {
    proofs.value = [];
    proofing.value = false;
};

const updateLtv = async () => {
    const points = pass.value.reduce((n: any, { points }: any) => n + points, 0);

    ltv.value = Number(await calculateLtv(proofs.value)) + points;

    const conversion = await convertFromTo(
        props.pool.collateralId,
        props.pool.principalId,
        Converter.toWei(position.value?.collateral || '0')
    );

    estimatedPrincipal.value = (
        Number(Converter.fromWei(conversion)) *
        Number((Number(ltv.value) + points) / 100)
    ).toFixed(2);
};

const initialize = async () => {
    if (store.state.address) {
        position.value = await getPosition(props.pool.poolId, store.state.address);

        updateLtv();
    }
};

onMounted(() => {
    initialize();
});
</script>

<template>
    <div class="popup_container">
        <div class="scroll">
            <div class="popup_wrapper">
                <div class="header">
                    <h3>Borrow</h3>
                    <p @click="emit('close')">Close</p>
                </div>

                <div class="borrow">
                    <div class="label">Collateral</div>

                    <br>

                    <div class="input_wrapper">
                        <input type="number" placeholder="0.00" disabled
                            :value="Converter.fromWei(position?.collateral || '0')">
                        <div class="token_drowndown">
                            <div class="token">
                                <div class="" style="display: flex; align-items: center; gap: 10px;">
                                    <img :src="getToken(props.pool.collateralId)!!.image" alt="">
                                    <p>{{ getToken(props.pool.collateralId)!!.symbol }}</p>
                                </div>
                                <!-- <ArrowDownIcon /> -->
                            </div>
                        </div>
                    </div>

                    <br> <br>

                    <div class="label ">Loan-To-Value</div>

                    <br>

                    <p class="ltv">Your current loan to value ratio is <span>{{ ltv }}%</span></p>

                    <br>

                    <div class="zk_proofs">
                        <p>With 100% anonymousity provide some proofs to amplify your LTV above 80%</p>
                        <button @click="proofing = true">Provide proofs</button>
                    </div>

                    <br> <br>

                    <div class="label">Principal</div>

                    <br>

                    <div class="input_wrapper">
                        <input type="number" placeholder="0.00" disabled :value="Converter.fromWei(estimatedPrincipal)">
                        <div class="token_drowndown" @click="isDropdown = !isDropdown.valueOf()">
                            <div class="token">
                                <div class="" style="display: flex; align-items: center; gap: 10px;">
                                    <img :src="getToken(props.pool.principalId)!!.image" alt="">
                                    <p>{{ getToken(props.pool.principalId)!!.symbol }}</p>
                                </div>
                                <!-- <ArrowDownIcon /> -->
                            </div>
                        </div>
                    </div>

                    <br> <br>

                    <button class="action" @click="borrowLoan">
                        {{ progress.valueOf() ? 'Borrowing..' : 'Borrow' }}
                    </button>
                </div>

                <br> <br>
            </div>
        </div>

        <VerifierPopup v-if="proofing?.valueOf()"
            v-on:completed="pass = $event; updateLtv(); proofing = false; initialize();" v-on:close="cancelProofs" />
    </div>
</template>

<style scoped>
.popup_container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #00000064;
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
    width: 450px;
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

.borrow {
    padding: 0 20px;
    margin-top: 30px;
}

.input_wrapper {
    display: flex;
    align-items: center;
    background-color: #dfdfdf;
    border-radius: 10px;
}

.input_wrapper input {
    height: 50px;
    width: 320px;
    border: none;
    background: none;
    outline: none;
    padding: 0 20px;
    font-weight: 500;
    font-size: 16px;
}

.token {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    color: white;
    gap: 10px;
    height: 50px;
    width: 120px;
}

.token img {
    width: 20px;
    height: 20px;
    border-radius: 10px;
}

.token_drowndown {
    position: relative;
    background: #714cc8;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
}

.tokens {
    position: absolute;
    background: #CCC;
    border-radius: 10px;
    top: 55px;
}

.tokens .token {
    border-bottom: 1px solid #714cc8;
}

.tokens .token:last-child {
    border: none;
}

.zk_proofs {
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    border-radius: 10px;
    text-align: center;
    padding: 30px;
}

.zk_proofs p {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    font-weight: 600;
}

.zk_proofs button {
    height: 40px;
    width: 180px;
    border-radius: 10px;
    border: none;
    background: #714cc8;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
}

.ltv span {
    font-size: 20px;
    color: #1b1b4d;

}

td {
    padding: 0 10px;
    height: 60px;
    font-size: 14px;
    min-width: 100px;
}

thead td {
    font-size: 16px;
    font-weight: 600;
    height: 40px;
}

td button {
    height: 30px;
    width: 100%;
    background: #1b1b4d;
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