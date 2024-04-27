import type { Loan, Pool, Position } from './types';
import type { InjectionKey } from 'vue';
// @ts-ignore
import { createStore, Store } from 'vuex';

// define your typings for the store state
export interface State {
    address: string;
    pools: Pool[];
    positions: Position[];
    loans: Loan[];
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        address: null,
        pools: [],
        positions: [],
        loans: []
    },
    mutations: {
        setAddress(state: State, newAddress: string) {
            state.address = newAddress;
        },
        setPools(state: State, pools: Pool[]) {
            state.pools = pools;
        },
        setPositions(state: State, positions: Position[]) {
            state.positions = positions;
        },
        setLoans(state: State, loans: Loan[]) {
            state.loans = loans;
        }
    }
});