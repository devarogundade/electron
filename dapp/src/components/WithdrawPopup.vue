<script setup lang="ts">
import { getPosition, getPositions } from '@/scripts/subgraph';
import { getToken } from '@/scripts/tokens';
import type { Position } from '@/types';
import { onMounted, ref } from 'vue';
// import ArrowDownIcon from './ArrowDownIcon.vue';

import { useStore } from 'vuex';
import { key } from '../store';
import { withdraw } from '@/scripts/electron';
import Converter from '@/scripts/converter';

const store = useStore(key);

const isDropdown = ref(false);

const progress = ref(false);

const emit = defineEmits(['close', 'unClose']);

const props = defineProps({
    pool: { type: Object, required: true }
});

const withdrawCollateral = async () => {
    if (progress.value) return;
    progress.value = true;

    const hash = await withdraw(props.pool.poolId);

    console.log(hash);

    if (!hash) {

    } else {
        if (store.state.address) {
            store.commit('setPositions', await getPositions(store.state.address));
        }

        emit('close');
    }

    progress.value = false;
};

const position = ref<Position | null>(null);

const initialize = async () => {
    if (store.state.address) {
        position.value = await getPosition(props.pool.poolId, store.state.address);
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
                    <h3>Withdraw</h3>
                    <p @click="emit('close')">Close</p>
                </div>

                <div class="borrow">
                    <div class="label">Amount</div>

                    <br>

                    <div class="input_wrapper">
                        <input type="number" placeholder="0.00" disabled
                            :value="Converter.fromWei(position?.collateral || '0')">
                        <div class="token_drowndown" @click="isDropdown = !isDropdown.valueOf()">
                            <div class="token">
                                <div class="" style="display: flex; align-items: center; gap: 10px;">
                                    <img :src="getToken(props.pool.collateralId)!!.image" alt="">
                                    <p>{{ getToken(props.pool.collateralId)!!.name }}</p>
                                </div>
                                <!-- <ArrowDownIcon /> -->
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="label">
                        Available:
                        {{ position?.collateral }}
                        {{ getToken(props.pool.collateralId)!!.symbol }}
                    </div>

                    <br> <br>

                    <button class="action" @click="withdrawCollateral">
                        {{ progress.valueOf() ? 'Withdrawing..' : 'Withdraw' }}
                    </button>
                </div>

                <br> <br>
            </div>
        </div>
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
    border-radius: 20px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
}

.scroll::-webkit-scrollbar {
    display: none;
}

.popup_wrapper {
    width: 450px;
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
}

.token_drowndown {
    position: relative;
    background: #714cc8;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
}

.tokens {
    position: absolute;
    background: #2e136d;
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
    background-image: radial-gradient(at 50% 100%, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%);
    border-radius: 10px;
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