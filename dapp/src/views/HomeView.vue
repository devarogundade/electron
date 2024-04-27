<script setup lang="ts">
import BorrowPopup from '@/components/BorrowPopup.vue';
import SupplyPopup from '@/components/SupplyPopup.vue';
import WithdrawPopup from '@/components/WithdrawPopup.vue';
import RepayPopup from '@/components/RepayPopup.vue';
import { ref } from 'vue';

const borrowPop = ref<object | null>(null);
const supplyPop = ref<object | null>(null);
const withdrawPop = ref<object | null>(null);
const repayPop = ref<object | null>(null);

</script>

<template>
  <main>
    <div class="header_container">
      <div class="app_width">
        <header>
          <h3 class="logo">Electron</h3>
          <button class="connect">Connect Wallet</button>
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

    <div class="market_container">
      <div class="app_width">
        <p class="market_title">Supply / Withdraw</p>
        <div class="market">
          <table>
            <thead>
              <tr>
                <td>Asset</td>
                <td>Liquidity</td>
                <td>Available</td>
                <td>Borrowed</td>
                <td>Interest</td>
                <td></td>
              </tr>
            </thead>

            <tbody v-for="index in 4">
              <tr>
                <td>
                  <div class="token">
                    <img src="../assets/eth.png" alt="">
                    <p>Ethereum</p>
                  </div>
                </td>
                <td>
                  <p>$101,876.73</p>
                </td>
                <td>
                  <p>$45,454.21</p>
                </td>
                <td>
                  <p>$53,234.32</p>
                </td>
                <td>
                  <p>5.32%</p>
                </td>
                <td>
                  <button @click="supplyPop = { collateralId: 'Ethereum' }">Supply</button>
                </td>
                <td>
                  <button @click="withdrawPop = { collateralId: 'Ethereum' }">Withdraw</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="market_container market_container_borrow">
      <div class="app_width">
        <p class="market_title">Borrow / Repay</p>
        <div class="market">
          <table>
            <thead>
              <tr>
                <td>Asset</td>
                <td>Liquidity</td>
                <td>Available</td>
                <td>Borrowed</td>
                <td>Interest</td>
                <td></td>
              </tr>
            </thead>

            <tbody v-for="index in 3">
              <tr>
                <td>
                  <div class="token">
                    <img src="../assets/eth.png" alt="">
                    <p>Ethereum</p>
                  </div>
                </td>
                <td>
                  <p>$101,876.73</p>
                </td>
                <td>
                  <p>$45,454.21</p>
                </td>
                <td>
                  <p>$53,234.32</p>
                </td>
                <td>
                  <p>5.32%</p>
                </td>
                <td>
                  <button @click="borrowPop = { collateralId: 'Ethereum' }">Borrow</button>
                </td>
                <td>
                  <button @click="repayPop = { collateralId: 'Ethereum' }">Repay</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


    <!-- end of website -->
    <br> <br> <br> <br>

    <BorrowPopup v-if="borrowPop?.valueOf()" v-on:close=" borrowPop = null" />
    <SupplyPopup v-if="supplyPop?.valueOf()" v-on:close=" supplyPop = null" />
    <WithdrawPopup v-if="withdrawPop?.valueOf()" v-on:close=" withdrawPop = null" />
    <RepayPopup v-if="repayPop?.valueOf()" v-on:close=" repayPop = null" />
  </main>
</template>

<style scoped>
.header_container {
  display: flex;
  justify-content: center;
  position: sticky;
  height: 100px;
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
  border-radius: 0 0 30px 30px;
  overflow: hidden;
  padding: 0 30px;
  backdrop-filter: blur(16px);
}

.logo {
  font-size: 45px;
  user-select: none;
  font-family: "Jersey 15", sans-serif;
}

.connect {
  height: 50px;
  width: 220px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  color: #FFF;
  background-color: #1b1b4d;
  cursor: pointer;
}

.hero_container {
  margin-top: -100px;
  display: flex;
  justify-content: center;
}

.hero_container .app_width {
  width: 1400px;
  padding-top: 220px;
  padding-bottom: 160px;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  border-radius: 0 0 100px 100px;
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

.market_container table {
  width: 100%;
}

.market_container thead {
  height: 70px;
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
</style>
