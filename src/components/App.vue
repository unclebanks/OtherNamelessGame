<template>
  <div id="gameContainer">
    <PokemonList :ui="ui" />
    <RoutesBox />
    <Inventory />
    <EnemyBox />
    <PlayerBox />
    <PartyBox
      :ui="ui"
      :player="player"
    />
  </div>

  <Modals :ui="ui" />
</template>

<script>

import RoutesBox from './RoutesBox.vue';
import Inventory from './Inventory.vue';
import EnemyBox from './EnemyBox.vue';
import PlayerBox from './PlayerBox.vue';
import PartyBox from './PartyBox.vue';
import PokemonList from './PokemonList/PokemonList.vue';
import Modals from './Modals.vue';

// Fake userInteractions object that does nothing
// to be replaced on game start when a real one is created.
import { dummy } from '../modules/actions';

export default {
    components: {
        RoutesBox,
        Inventory,
        EnemyBox,
        PlayerBox,
        PokemonList,
        PartyBox,
        Modals,
    },

    data() {
        return {
            ui: dummy,
            player: {},
        };
    },
};
</script>
