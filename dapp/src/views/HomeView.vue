<script setup lang="ts">
import BorrowPopup from '@/components/BorrowPopup.vue';
import SupplyPopup from '@/components/SupplyPopup.vue';
import WithdrawPopup from '@/components/WithdrawPopup.vue';
import RepayPopup from '@/components/RepayPopup.vue';
import { onMounted, ref } from 'vue';

import { config, projectId, chains } from '../scripts/config';

import { createWeb3Modal } from '@web3modal/wagmi/vue';
import { useWeb3Modal } from '@web3modal/wagmi/vue';
import { watchAccount } from '@wagmi/core';

import { useStore } from 'vuex';
import { key } from '../store';
import Converter from '@/scripts/converter';
import { getPositions, getLoans, getPools } from '@/scripts/subgraph';
import { getToken } from '@/scripts/tokens';

const borrowPop = ref<object | null>(null);
const supplyPop = ref<object | null>(null);
const withdrawPop = ref<object | null>(null);
const repayPop = ref<object | null>(null);

const store = useStore(key);

createWeb3Modal({
  wagmiConfig: config,
  projectId: projectId,
  // @ts-ignore
  chains: chains,
  enableAnalytics: true
});

const modal = useWeb3Modal();

const initialize = async () => {
  store.commit('setPools', await getPools());

  if (store.state.address) {
    store.commit('setPositions', await getPositions(store.state.address));
    store.commit('setLoans', await getLoans(store.state.address));
  }
};

onMounted(() => {
  watchAccount(config, {
    onChange(account: any) {
      store.commit('setAddress', account.address);

      initialize();
    },
  });

  initialize();
});
</script>

<template>
  <main>
    <div class="header_container">
      <div class="app_width">
        <header>
          <a href="#">
            <h3 class="logo">Electron</h3>
          </a>
          <div style="display: flex; align-items: center; gap: 40px;">
            <a style="font-weight: 600; color: #000;" href="https://dorahacks.io/hackathon/v0rtex-01/buidl"
              target="_blank">V0RTEx 01</a>
            <a style="font-weight: 600; color: #000;" href="#supply">Supply</a>
            <a style="font-weight: 600; color: #000;" href="#borrow">Borrow</a>
            <a style="font-weight: 600; color: #000;" href="#faucet">Faucet</a>

            <button class="connect" @click="modal.open()">
              {{ store.state.address ?
                `${Converter.fineHash(store.state.address, 4)}`
                : 'Wallet Connect'
              }}
            </button>
          </div>
        </header>
      </div>
    </div>

    <div class="hero_container">
      <div class="app_width">
        <div class="hero">
          <h1 class="hero_text">Unlocking Higher Lending Potential with Zero-Knowledge Proofs.</h1>
        </div>
      </div>
    </div>

    <div class="market_container" id="supply">
      <div class="app_width">
        <p class="market_title">Lock or withdraw collaterals.</p>
        <div class="market">
          <table>
            <thead>
              <tr>
                <td>Collateral</td>
                <td>Pair</td>
                <td>Supplied</td>
                <td>Backing</td>
                <td>Supplied (You)</td>
                <td></td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              <tr v-for="pool, index in store.state.pools" :key="index">
                <td>
                  <div class="token">
                    <img :src="getToken(pool.collateralId)!!.image" alt="">
                    <p>{{ getToken(pool.collateralId)!!.name }}</p>
                  </div>
                </td>
                <td>
                  <div class="pair">
                    <img :src="getToken(pool.principalId)!!.image" alt="">
                    <img :src="getToken(pool.collateralId)!!.image" alt="">
                  </div>
                </td>
                <td>
                  <p>{{ Converter.fromWei(pool.totalSupplied) }} {{ getToken(pool.collateralId)!!.symbol }}</p>
                </td>
                <td>
                  <p>{{ Converter.fromWei(pool.totalBorrowed) }} {{ getToken(pool.principalId)!!.symbol }}</p>
                </td>
                <td>
                  <p>{{ Converter.fromWei(pool.totalSupplied) }} {{ getToken(pool.collateralId)!!.symbol }}</p>
                </td>
                <td>
                  <button @click="supplyPop = pool">Supply</button>
                </td>
                <td>
                  <button @click="withdrawPop = pool">Withdraw</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="market_container market_container_borrow" id="borrow">
      <div class="app_width">
        <p class="market_title">Borrow or repay loans.</p>
        <div class="market">
          <table>
            <thead>
              <tr>
                <td>Principal</td>
                <td>Pair</td>
                <td>Borrowed</td>
                <td>Backed by</td>
                <td>Borrowed (You)</td>
                <td></td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              <tr v-for="pool, index in store.state.pools" :key="index">
                <td>
                  <div class="token">
                    <img :src="getToken(pool.principalId)!!.image" alt="">
                    <p>{{ getToken(pool.principalId)!!.name }}</p>
                  </div>
                </td>
                <td>
                  <div class="pair">
                    <img :src="getToken(pool.collateralId)!!.image" alt="">
                    <img :src="getToken(pool.principalId)!!.image" alt="">
                  </div>
                </td>
                <td>
                  <p>{{ Converter.fromWei(pool.totalBorrowed) }} {{ getToken(pool.principalId)!!.symbol }}</p>
                </td>
                <td>
                  <p>{{ Converter.fromWei(pool.totalSupplied) }} {{ getToken(pool.collateralId)!!.symbol }}</p>
                </td>
                <td>
                  <p>{{ Converter.fromWei(pool.totalBorrowed) }} {{ getToken(pool.principalId)!!.symbol }}</p>
                  <p style="font-size: 12px; margin-top: 2px; color: #d20808; font-weight: 400;">
                    Interest:
                    {{ Converter.toMoney(pool.interest / 1_000_000) }}%
                  </p>
                </td>
                <td>
                  <button @click="borrowPop = pool">Borrow</button>
                </td>
                <td>
                  <button @click="repayPop = pool">Repay</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="faucet_container" id="faucet">
      <div class="app_width">
        <div class="market_title">
          Faucet
        </div>
      </div>
    </div>

    <br> <br> <br> <br>
    <br> <br> <br> <br>

    <BorrowPopup v-if="borrowPop?.valueOf()" :pool="borrowPop?.valueOf()" v-on:close=" borrowPop = null" />
    <SupplyPopup v-if="supplyPop?.valueOf()" :pool="supplyPop?.valueOf()" v-on:close=" supplyPop = null" />
    <WithdrawPopup v-if="withdrawPop?.valueOf()" :pool="withdrawPop?.valueOf()" v-on:close=" withdrawPop = null" />
    <RepayPopup v-if="repayPop?.valueOf()" :pool="repayPop?.valueOf()" v-on:close=" repayPop = null" />
  </main>
</template>

<style scoped>
.header_container {
  display: flex;
  justify-content: center;
  position: sticky;
  height: 70px;
  top: 0;
}

header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #714cc8;
  border-left: 1px solid #714cc8;
  border-right: 1px solid #714cc8;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
  padding: 0 20px;
  backdrop-filter: blur(16px);
}

.logo {
  font-size: 35px;
  user-select: none;
  font-family: "Jersey 15", sans-serif;
  color: #000;
}

.connect {
  height: 40px;
  width: 180px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #FFF;
  background-color: #1b1b4d;
  cursor: pointer;
}

.hero_container {
  margin-top: -70px;
  display: flex;
  justify-content: center;
}

.hero_container .app_width {
  width: 1180px;
  padding-top: 160px;
  padding-bottom: 80px;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 0 0 20px 20px;
}

.hero {
  display: flex;
  justify-content: center;
}

.hero_text {
  width: 1100px;
  max-width: 100%;
  font-size: 50px;
  line-height: 75px;
  text-align: center;
  color: #1b1b4d;
  text-shadow: 0 0 5px #1b1b4d3a, 0 0 10px #1b1b4d3a, 0 0 15px #1b1b4d3a, 0 0 20px #1b1b4d3a, 0 0 25px #1b1b4d3a, 0 0 30px #1b1b4d3a, 0 0
}

.market_container {
  display: flex;
  justify-content: center;
  padding-top: 80px;
}

.market {
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 20px;
  overflow: hidden;
}

.pair {
  display: flex;
  align-items: center;
}

.pair img {
  width: 24px;
  height: 24px;
  border-radius: 15px;
}

.pair img:last-child {
  margin-left: -6px;
}

.market_container table {
  width: 100%;
}

.market_container thead {
  height: 80px;
}

.market thead td {
  padding: 0 30px;
  font-weight: 600;
  color: #1b1b4d;
  font-size: 20px;
}


.market_container tbody {
  height: 60px;
}

.market td {
  font-size: 16px;
  font-weight: 500;
  padding: 0 30px;
  height: 70px;
}

.token {
  display: flex;
  align-items: center;
  gap: 10px;
}

.token img {
  width: 24px;
  height: 24px;
}

.market_title {
  font-size: 24px;
  color: #1b1b4d;
  font-weight: 500;
  margin-bottom: 30px;
}

table button {
  height: 35px;
  width: 100%;
  background: #1b1b4d;
  border: none;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 10px;
}

.market_container_borrow .market {
  background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
}

.market_container_proofs .market {
  background-color: #CDDCDC;
  background-image: radial-gradient(at 50% 100%, rgba(255, 255, 255, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%);
  background-blend-mode: screen, overlay;
}

td:nth-child(6),
td:nth-child(7) {
  width: 120px;
  padding: 0 5px;
}

table {
  padding-right: 15px;
}

td:first-child {
  width: 200px;
}

td:nth-child(2) {
  width: 60px;
}

td:nth-child(3) {
  width: 180px;
}

td:nth-child(4) {
  width: 180px;
}

td:nth-child(5) {
  width: 180px;
}

.faucet_container {
  padding-top: 80px;
  display: flex;
  justify-content: center;
}
</style>
<!--  -->