import display, { renderView } from './display';
import ROUTES from './routes';
// eslint-disable-next-line object-curly-newline
import { $, camelCaseToString, isEmpty, pokeById, pokeByIndex, pokeByName } from './utilities';
import ACHIEVEMENTS from './achievements';
import { POKEDEXFLAGS, VITAMINS } from './data';
import { openModal, closeModal } from './modalEvents';
import Poke from './poke';
import POKEDEX from './db';
import notify from './notify';
import pokedex from '../store/modules/pokedex';
import Combat from './combat';

export default (player, combatLoop, enemy, town, story, appModel) => {
    let dom;

    const UserActions = {

        changeRoute: function (newRouteId, force = false) {
            if (!force && player.alivePokeIndexes().length == 0) {
                notify('It is too dangerous to travel without a POKEMON.');
                return false;
            }
            if (combatLoop.prof || combatLoop.prof1 || combatLoop.prof2 || combatLoop.prof3) {
                notify('You cannot run away from a PROFESSOR battle.');
                return false;
            }
            if (!player.routeUnlocked(player.settings.currentRegionId, newRouteId)) {
                notify('You cannot go there yet.');
                return false;
            }
            player.settings.currentRouteId = newRouteId;
            if (ROUTES[player.settings.currentRegionId][player.settings.currentRouteId].town) {
                combatLoop.pause();
            } else {
                combatLoop.unpause();
            }
            renderView(dom, enemy, player);
            player.savePokes();
            dom.renderRouteList();

            return true;
        },
        changePokemon: function (newActiveIndex) {
            player.setActive(newActiveIndex);
            renderView(dom, enemy, player);
        },
        goToKanto: function () {
            if (player.regionUnlocked('Kanto')) {
                player.settings.currentRegionId = 'Kanto';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToJohto: function () {
            if (player.regionUnlocked('Johto')) {
                player.settings.currentRegionId = 'Johto';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToHoenn: function () {
            if (player.regionUnlocked('Hoenn')) {
                player.settings.currentRegionId = 'Hoenn';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToSinnoh: function () {
            if (player.regionUnlocked('Sinnoh')) {
                player.settings.currentRegionId = 'Sinnoh';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToUnova: function () {
            if (player.regionUnlocked('Unova')) {
                player.settings.currentRegionId = 'Unova';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToKalos: function () {
            if (player.regionUnlocked('Kalos')) {
                player.settings.currentRegionId = 'Kalos';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToAlola: function () {
            if (player.regionUnlocked('Alola')) {
                player.settings.currentRegionId = 'Alola';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToGalar: function () {
            if (player.regionUnlocked('Galar')) {
                player.settings.currentRegionId = 'Galar';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToFandom: function () {
            if (player.regionUnlocked('Fandom')) {
                player.settings.currentRegionId = 'Fandom';
                if (Object.keys(ROUTES[player.settings.currentRegionId])[0].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[0]);
                } else if (Object.keys(ROUTES[player.settings.currentRegionId])[1].charAt(0) !== '_') {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[1]);
                } else {
                    this.changeRoute(Object.keys(ROUTES[player.settings.currentRegionId])[2]);
                }
            } else {
                notify('You have not unlocked this region yet');
            }
        },
        goToNone: function () {
            notify('This region is not implemented yet');
        },
        justTestStuff: function () {
            alert('Nothing is here yet.');
        },
        enablePokeListAutoSort: function () {
            player.settings.autoSort = $('#autoSort').checked;
            // hide or show sort dropdowns
            dom.renderPokeSort();
        },
        changeCatchOption: function (newCatchOption) {
            combatLoop.changeCatch(newCatchOption);
        },
        changeListView: function (view) {
            player.settings.listView = view;
        },
        clearGameData: function () {
            if (dom.checkConfirmed('#confirmClearData')) {
                localStorage.clear();
                player.purgeData = true;
                window.location.reload(true);
            }
        },
        changeSelectedBall: function (newBall) {
            player.changeSelectedBall(newBall);
        },
        pokemonToFirst: function (pokemonIndex, from = 'roster') {
            appModel.$store.commit('pokemon/moveToFirst', { pokemonIndex, from });
            player.savePokes();
        },
        pokemonToDown: function (pokemonIndex, from = 'roster') {
            appModel.$store.commit('pokemon/moveDown', { pokemonIndex, from });
            player.savePokes();
        },
        pokemonToUp: function (pokemonIndex, from = 'roster') {
            appModel.$store.commit('pokemon/moveUp', { pokemonIndex, from });
            player.savePokes();
        },
        evolvePokemon: function (pokemonIndex) {
            player.getPokemon()[pokemonIndex].tryEvolve(player.getPokemon()[pokemonIndex].shiny(), player);
            renderView(dom, enemy, player);
        },
        prestigePokemon: function (pokemonIndex) {
            player.getPokemon()[pokemonIndex].tryPrestige(player.getPokemon()[pokemonIndex].shiny());
            renderView(dom, enemy, player);
        },
        moveToStorage: function (pokemonIndex) {
            appModel.$store.commit('pokemon/deposit', pokemonIndex);
        },
        moveToRoster: function (pokemonIndex) {
            appModel.$store.commit('pokemon/withdraw', pokemonIndex);
        },
        openPokeDex: function () {
            openModal($('#pokedexModal'));
        },
        forceSave: function () {
            player.savePokes();
            $('#forceSave').style.display = 'inline';
            setTimeout(() => { $('#forceSave').style.display = 'none'; }, 5000);
        },
        exportSaveDialog: function () {
            $('#savetextDialog .modal-card-title').innerHTML = 'Export your save';
            if (document.queryCommandSupported('copy')) {
                document.getElementById('copySaveText').style.display = 'initial';
            }
            document.getElementById('saveText').value = player.saveToString();
            document.getElementById('loadButtonContainer').style.display = 'none';
            openModal(document.getElementById('savetextModal'));
            closeModal($('#settingsModal'));
        },
        importSaveDialog: function () {
            $('#savetextDialog .modal-card-title').innerHTML = 'Import a save';
            document.getElementById('copySaveText').style.display = 'none';
            document.getElementById('saveText').value = '';
            document.getElementById('loadButtonContainer').style.display = 'block';
            openModal(document.getElementById('savetextModal'));
            closeModal($('#settingsModal'));
        },
        importSave: async function () {
            if (window.confirm('Loading a save will overwrite your current progress, are you sure you wish to continue?')) {
                await appModel.$store.dispatch('setLoading', true);
                player.loadFromString(document.getElementById('saveText').value.trim());
                await appModel.$store.dispatch('setLoading', false);
                closeModal(document.getElementById('savetextModal'));
                // reload everything
                renderView(dom, enemy, player);
                dom.renderPokeSort();
                dom.renderBalls();
                dom.renderPokeCoins();
            }
        },
        copySaveText: function () {
            document.getElementById('saveText').select();
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        },
        changeSpriteChoice: function () {
            if (document.getElementById('spriteChoiceFront').checked) {
                player.settings.spriteChoice = 'front';
            } else {
                player.settings.spriteChoice = 'back';
            }
            player.savePokes();
            renderView(dom, enemy, player);
        },
        viewStatistics: function () {
            const statisticStrings = {
                'fireBeaten': 'Fire POKEMON Beaten',
                'waterBeaten': 'Water POKEMON Beaten',
                'grassBeaten': 'Grass POKEMON Beaten',
                'electricBeaten': 'Electric POKEMON Beaten',
                'normalBeaten': 'Normal POKEMON Beaten',
                'iceBeaten': 'Ice POKEMON Beaten',
                'fightingBeaten': 'Fighting POKEMON Beaten',
                'poisonBeaten': 'Poison POKEMON Beaten',
                'groundBeaten': 'Ground POKEMON Beaten',
                'flyingBeaten': 'Flying POKEMON Beaten',
                'psychicBeaten': 'Psychic POKEMON Beaten',
                'bugBeaten': 'Bug POKEMON Beaten',
                'rockBeaten': 'Rock POKEMON Beaten',
                'ghostBeaten': 'Ghost POKEMON Beaten',
                'darkBeaten': 'Dark POKEMON Beaten',
                'dragonBeaten': 'Dragon POKEMON Beaten',
                'steelBeaten': 'Steel POKEMON Beaten',
                'fairyBeaten': 'Fairy POKEMON Beaten',
                'fireCaught': 'Fire POKEMON Caught',
                'waterCaught': 'Water POKEMON Caught',
                'grassCaught': 'Grass POKEMON Caught',
                'electricCaught': 'Electric POKEMON Caught',
                'normalCaught': 'Normal POKEMON Caught',
                'iceCaught': 'Ice POKEMON Caught',
                'fightingCaught': 'Fighting POKEMON Caught',
                'poisonCaught': 'Poison POKEMON Caught',
                'groundCaught': 'Ground POKEMON Caught',
                'flyingCaught': 'Flying POKEMON Caught',
                'psychicCaught': 'Psychic POKEMON Caught',
                'bugCaught': 'Bug POKEMON Caught',
                'rockCaught': 'Rock POKEMON Caught',
                'ghostCaught': 'Ghost POKEMON Caught',
                'darkCaught': 'Dark POKEMON Caught',
                'dragonCaught': 'Dragon POKEMON Caught',
                'steelCaught': 'Steel POKEMON Caught',
                'fairyCaught': 'Fairy POKEMON Caught',
                'seen': 'Pokemon Seen',
                'caught': 'Pokemon Caught',
                'released': 'Pokemon Released',
                'sold': 'Pokemon Sold',
                'beaten': 'Pokemon Beaten',
                'shinySeen': 'Shiny Pokemon Seen',
                'shinyCaught': 'Shiny Pokemon Caught',
                'shinyReleased': 'Shiny Pokemon Released',
                'shinyBeaten': 'Shiny Pokemon Beaten',
                'totalDamage': 'Total Damage Dealt',
                'totalThrows': 'Total Catch Attempts',
                'successfulThrows': 'Successfully Caught',
                'pokeballThrows': 'Pokeball Throws',
                'pokeballSuccessfulThrows': 'Caught with Pokeball',
                'greatballThrows': 'Greatball Throws',
                'greatballSuccessfulThrows': 'Caught with Greatball',
                'ultraballThrows': 'Ultraball Throws',
                'ultraballSuccessfulThrows': 'Caught with Ultraball',
                'masterballThrows': 'Masterball Throws',
                'masterballSuccessfulThrows': 'Caught with Masterball',
                'totalPokeCoins': 'Total PokeCoins Obtained',
                'totalCatchCoins': 'Total CatchCoins Obtained',
                'totalBattleCoins': 'Total BattleCoins Obtained',
                'totalExp': 'Total Experience Earned',
            };
            let statList = '';
            for (const statValue in player.statistics) {
                statList += `<li>${statisticStrings[statValue]}: ${player.statistics[statValue]}</li>`;
            }
            document.getElementById('statisticsList').innerHTML = statList;
            openModal(document.getElementById('statisticsModal'));
        },
        viewInventory: function () {
            let inventoryHTML = '';
            const vitamins = Object.keys(VITAMINS);
            for (let i = 0; i < vitamins.length; i++) {
                const vitamin = vitamins[i];
                const vitaminName = VITAMINS[vitamin].display;
                const count = player.vitamins[vitamin];
                const image = `assets/images/vitamins/${vitamin}.png`;
                inventoryHTML += `<li class="vitaminItem"><div class="inventoryVitaminAlignmentHelper"></div><img src="${image}"></img><span class="itemName">${vitaminName}</span><button class="button" onclick="userInteractions.openVitaminModal('${vitamin}')">Use (${count} available)</button></li>`;
            }
            document.getElementById('inventoryList').innerHTML = inventoryHTML;
            openModal(document.getElementById('inventoryModal'));
        },
        renderBeatenAchievement: function () {
            const beatenReq = player.statisticsRequirements.beaten;
            const beaten1Req = player.statisticsRequirements.beaten1;
            if (player.statistics.beaten > beatenReq) { return beaten1Req; } else { return beatenReq; }
        },
        renderCaughtAchievement: function () {
            const caughtReq = player.statisticsRequirements.caught;
            const caught1Req = player.statisticsRequirements.caught1;
            if (player.statistics.caught > caughtReq) { return caught1Req; } else { return caughtReq; }
        },
        renderOwnedAchievement: function () {
            const ownedReq = player.statisticsRequirements.owned;
            const owned1Req = player.statisticsRequirements.owned1;
            if (player.countPokedex(5) + player.countPokedex(7) > ownedReq) { return owned1Req; } else { return ownedReq; }
        },
        renderPokemonDefeated: function () {
            const pokemonDefeatedElement = $('#pokemonDefeated');
            pokemonDefeatedElement.innerHTML = `${player.statistics.beaten}/${this.renderBeatenAchievement()}`;
        },
        renderPokemonCaught: function () {
            const pokemonCaughtElement = $('#pokemonCaught');
            pokemonCaughtElement.innerHTML = `${player.statistics.caught}/${this.renderCaughtAchievement()}`;
        },
        renderPokemonOwned: function () {
            const pokemonOwnedElement = $('#pokemonOwned');
            pokemonOwnedElement.innerHTML = `${player.countPokedex(5) + player.countPokedex(7)}/${this.renderOwnedAchievement()}`;
        },
        checkPokemonDefeated: function () {
            if (player.statistics.beaten > 49 && !player.events.beaten) {
                player.ballsAmount.masterball += 50;
                dom.renderBalls();
                alert('You defeated 50 POKEMON and earned 50 MASTERBALLS');
                player.events.beaten = true;
            }
            if (player.events.beaten && player.statistics.beaten > 99 && !player.events.beaten1) {
                player.ballsAmount.masterball += 100;
                dom.renderBalls();
                alert('You defeated 100 POKEMON and earned 100 MASTERBALLS');
                player.events.beaten1 = true;
            } else { alert('Defeat more Pokemon and try again'); }
        },
        checkPokemonCaught: function () {
            if (player.statistics.caught > 49 && !player.events.caught) {
                player.ballsAmount.masterball += 99;
                dom.renderBalls();
                alert('You caught 100 POKEMON and earned 50 MASTERBALLS');
                player.events.caught = true;
            }
            if (player.events.caught && player.statistics.caught > 999 && !player.events.caught1) {
                player.ballsAmount.masterball += 100;
                dom.renderBalls();
                alert('You caught 1000 POKEMON and earned 100 MASTERBALLS');
                player.events.caught1 = true;
            } else { alert('catch more Pokemon and try again'); }
        },
        checkPokemonOwned: function () {
            if (player.countPokedex(5) + player.countPokedex(7) > 100 && !player.events.owned) {
                player.ballsAmount.masterball += 99;
                dom.renderBalls();
                alert('You caught 100 POKEMON and earned 50 MASTERBALLS');
                player.events.owned = true;
            }
            if (player.events.owned && player.countPokedex(5) + player.countPokedex(7) > 150 && !player.events.owned1) {
                player.ballsAmount.masterball += 100;
                dom.renderBalls();
                alert('You caught 1000 POKEMON and earned 100 MASTERBALLS');
                player.events.owned1 = true;
            } else { alert('catch more varied Pokemon and try again'); }
        },
        viewAchievements: function () {
            this.renderPokemonDefeated();
            this.renderPokemonCaught();
            this.renderPokemonOwned();
            openModal(document.getElementById('achievementsModal'));
        },
        enterCode: function () {
            // eslint-disable-next-line prefer-const
            let secretCode = prompt('Please enter your secret code', 'Secret Code');
            if (secretCode === 'Charmander' && !player.secretCodes.charmander) {
                alert('This is a placeholder');
            } else {
                alert('Code Invalid or Already Claimed');
            }
        },
        viewSettings: function () {
            openModal(document.getElementById('settingsModal'));
            closeModal(document.getElementById('bagModal'));
        },
        viewPokeDex: function () {
            openModal(document.getElementById('pokedexModal'));
        },
        viewEvoStones: function () {
            if (!isEmpty(player.evoStones)) {
                let evoStonesHTML = '';
                for (const evoStones in player.evoStones) {
                    evoStonesHTML += `${'<img src="assets/images/evoStones/'}${[evoStones]}.png"></img>`;
                }
                document.getElementById('evoStoneList').innerHTML = evoStonesHTML;
                openModal(document.getElementById('evoStonesModal'));
                closeModal(document.getElementById('bagModal'));
            } else {
                notify('You have no Evolution Stones');
            }
        },
        viewKeyItems: function () {
            if (!isEmpty(player.unlocked)) {
                let keyItemsHTML = '';
                for (const keyItems in player.unlocked) {
                    keyItemsHTML += `${'<img src="assets/images/keyItems/'}${[keyItems]}.png"></img>`;
                }
                document.getElementById('keyItemsList').innerHTML = keyItemsHTML;
                openModal(document.getElementById('keyItemsModal'));
                closeModal(document.getElementById('bagModal'));
            } else {
                notify('You have no Key Items');
            }
        },
        viewBag: function () {
            openModal(document.getElementById('bagModal'));
        },
        renderTown: function () {
            openModal(document.getElementById('townModal'));
            const pokeMart = $('#pokeMartButton');
            const npc = $('#npcButton');
            const prof = $('#profButton');
            const story = $('#storyButton');
            const route = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            pokeMart.style.display = (route.pokeMart) ? '' : 'none';
            pokeMart.innerHTML = (route.pokeMart) ? 'PokeMart' : '';
            npc.style.display = (route.npc) ? '' : 'none';
            npc.innerHTML = (route.npc) ? route.npc.name : '';
            story.style.display = (route.story) ? '' : 'none';
            story.innerHTML = (route.story) ? route.story.name : '';
            prof.style.display = (route.prof) ? '' : 'none';
            prof.innerHTML = (route.prof) ? route.prof.name : '';
        },
        openMenu: function () {
            document.getElementById('menu').style.right = '0px';
            document.getElementById('openMenu').style.display = 'none';
            document.getElementById('closeMenu').style.display = 'block';
        },
        closeMenu: function () {
            document.getElementById('menu').style.right = '-250px';
            document.getElementById('closeMenu').style.display = 'none';
            document.getElementById('openMenu').style.display = 'block';
        },
        viewShop: function () {
            // closeModal(document.getElementById('townModal'));
            const region = player.settings.currentRegionId.toLowerCase();
            town.renderPokeCoinShop(region);
            town.renderBattleCoinShop(region);
            town.renderCatchCoinShop(region);
            closeModal(document.getElementById('townModal'));
            openModal(document.getElementById('shopModal'));
        },
        openVitaminModal: function (vitamin) {
            if (!VITAMINS[vitamin]) {
                return notify(`Invalid vitamin '${vitamin}'`);
            }
            const data = VITAMINS[vitamin];
            const name = data.display;
            const count = player.vitamins[vitamin];
            if (!count) {
                return notify('You don\'t have any of these.');
            }
            const vitaminModal = document.getElementById('vitaminModal');
            vitaminModal.setAttribute('data-vitamin', vitamin);
            this.updateVitaminModal();
            openModal(vitaminModal);
        },
        updateVitaminModal: function () {
            const vitaminModal = document.getElementById('vitaminModal');
            const vitamin = vitaminModal.getAttribute('data-vitamin');
            const data = VITAMINS[vitamin];
            const count = player.vitamins[vitamin];
            document.getElementById('vitaminName').innerText = data.display;
            document.getElementById('vitaminCount').innerText = count;
            let vitaminPokemonHTML = '';
            const list = player.getPokemon();
            for (let i = 0; i < list.length; i++) {
                const poke = list[i];
                vitaminPokemonHTML += `<li class="vitaminModalPokemon"><img src="${poke.image().party}"> <button class="button" onclick="userInteractions.useVitamin('${vitamin}', ${i})">${poke.getAppliedVitamins(data.stat)}/${poke.getMaxVitamins(data.stat)}</button></li>`;
            }
            document.getElementById('vitaminPokemon').innerHTML = vitaminPokemonHTML;
        },
        useVitamin: function (vitamin, pokemonIndex) {
            const vitaminData = VITAMINS[vitamin];
            const count = player.vitamins[vitamin];
            const poke = player.pokemons[pokemonIndex];
            if (count <= 0 || !vitaminData || !poke) {
                return;
            }
            if (poke.tryUsingVitamin(vitaminData.stat)) {
                player.vitamins[vitamin]--;
                this.updateVitaminModal();
            }
        },
        playerComputer: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId].name;
            closeModal(document.getElementById(`${routeData.replace(/ /g, '').toLowerCase()}pokecenterModal`));
            openModal(document.getElementById('playercomputerModal'));
        },
        closePlayerComputer: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId].name;
            openModal(document.getElementById(`${routeData.replace(/ /g, '').toLowerCase()}pokecenterModal`));
            closeModal(document.getElementById('playercomputerModal'));
        },
        oakLab: function () {
            openModal(document.getElementById('oaklabModal'));
        },
        oakLabExit: function () {
            closeModal(document.getElementById('oaklabModal'));
            if (player.events.oakParcelReceived) {
                openModal(document.getElementById('pallettownnooakModal'));
            } else {
                openModal(document.getElementById('pallettownModal'));
            }
        },
        oakAide1: function () {
            if (player.events.oakAide1 != true) {
                alert('I am just a simple aide. No need to talk to me again');
                player.events.oakAide1 = true;
            } else if (player.events.oakAide1 === true && !player.events.oakAide1A) {
                alert('No, honestly, I have work to do. Please leave me alone');
                player.events.oakAide1A = true;
            } else if (player.events.oakAide1A && !player.events.oakAide1B) {
                alert('Please just take the Pokeballs and leave me alone');
                player.events.oakAide1B = true;
                player.ballsAmount.pokeball += 10;
                dom.renderBalls();
            } else if (player.events.oakAide1B === true && !player.events.oakAide1C) {
                alert('Fine, start over... Leave me alone and check your Pokeballs');
                player.events.oakAide1C = true;
                player.ballsAmount.pokeball = 0;
                dom.renderBalls();
            } else if (player.events.oakAide1C) {
                alert('Leave me alone before something REALLY bad happens to you and your POKEMON');
            }
        },
        oakAide2: function () {
            if (!player.events.oakAide1) {
                alert('Have you talked to the other aide? They get a little overwhelmed sometimes, I would be careful if I were you.');
            } else if (player.events.oakAide1C === true && !player.events.oakAide2) {
                alert('I am sorry for my coworker. Please take these as an apology and try to avoid dangerous NPCs in the future.');
                player.ballsAmount.pokeball += 10;
                dom.renderBalls();
                player.events.oakAide2 = true;
            } else { alert('Hiya! I work as an Aide. Be sure to talk to other NPCs as well. Some of us do stuff, others not so much.'); }
        },
        oakLabOak: function () {
            if (player.countPokedex(5) > 40 && !player.unlocked.kantoFirstStagePass) {
                alert('Great job on catching the Kanto region starters. Take this Pass to unlock deeper areas previously inaccessible.');
                player.unlocked.kantoFirstStagePass = true;
                dom.renderRouteList();
            } else if (!player.unlocked.kantoFirstStagePass) {
                alert('It seems you need to research Pokemon a bit more thoroughly before I can grant you access to other areas.');
            } else if (player.countPokedex(5) < 80 && !player.unlocked.kantoSecondStagePass) {
                alert('Keep researching more pokemon to unlock more areas.');
            } else if (player.countPokedex(5) > 80 && !player.unlocked.kantoSecondStagePass) {
                alert('You have been an excellent help with my research. Take this Second Stage Pass to explore new areas.');
                player.unlocked.kantoSecondStagePass = true;
                dom.renderRouteList();
            } else { alert('More to come, check back soon'); }
        },
        blueOakLab: function () {
            if (!player.events.oakParcelReceived) {
                alert('My grandpa Prof. Oak should be somewhere around Pallet Town waiting for his parcel to arrive.');
            } else if (player.events.oakParcelReceived && !player.events.oakParcelGiven) {
                alert('You should go talk to my grandpa. He has something important to tell us and I am tired of waiting.');
            } else if (player.events.oakParcelGiven && player.events.Squirtle === true) {
                alert('There will be a trainer battle implemented here later on based on your choosing Squirtle');
            } else if (player.events.oakParcelGiven && player.events.Charmander === true) {
                alert('There will be a trainer battle implemented here later onbased on your choosing Charmander');
            } else if (player.events.oakParcelGiven && player.events.Bulbasaur === true) {
                alert('There will be a trainer battle implemented here later onbased on your choosing Bulbasaur');
            }
        },
        test: function () {
            alert('PLACEHOLDER');
        },
        profBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (routeData.prof && routeData.prof.poke.length > 0) {
                combatLoop.prof = {
                    name: routeData.prof.name,
                    badge: routeData.prof.badge,
                    win: routeData.prof.win,
                    reward: routeData.prof.reward,
                };
                combatLoop.profPoke = Object.values({ ...routeData.prof.poke });
                combatLoop.unpause();
                combatLoop.refresh();
            }
        },
        npcBattle: function () {
            const routeData = ROUTES[player.settings.currentRegionId][player.settings.currentRouteId];
            if (routeData.npc && routeData.npc.poke.length > 0) {
                combatLoop.npc = {
                    name: routeData.npc.name,
                    event: routeData.npc.event,
                };
                combatLoop.npcPoke = Object.values({ ...routeData.npc.poke });
                combatLoop.unpause();
                combatLoop.refresh();
            }
        },
        megaBeedrillQuest: function () {
            if ((player.typeStats.bugBeaten + player.typeStats.poisonBeaten >= 500) && (!player.events.megaBeedrillQuest)) {
                alert("You've unlocked the Mega Beedrill quest!");
                player.defeatedWith.Beedrill = 0;
                if ((player.typeStats.bugBeaten >= 1000) && (player.typeStats.poisonBeaten >= 1000)) {
                    if (player.defeatedWith.Beedrill >= 2500) {
                        player.megaStones.beedrillite = 1;
                        player.statistics.MegaQuestCompleted++;
                        player.events.megaBeedrillQuest = true;
                    }
                }
            }
        },
        megaSableyeQuest: function () {
            if ((player.typeStats.ghostBeaten + player.typeStats.darkBeaten >= 250) && (!player.events.megaSableyeQuest)) {
                alert("You've unlocked the Mega Sableye quest!");
                player.defeatedWith.Sableye = 0;
                if ((player.typeStats.darkBeaten >= 500) && (player.typeStats.ghostBeaten >= 500)) {
                    if (player.defeatedWith.Sableye >= 5000) {
                        player.megaStones.sablenite = 1;
                        player.statistics.MegaQuestCompleted++;
                        player.events.megaSableyeQuest = true;
                    }
                }
            }
        },
        // This part ^^^ was not within the actions brackets, also, add poke was not correctly utilized.
        closeStory: function () {
            if (story.canClose) {
                $('#storyContainer').style.display = 'none';
            }
        },
        attachDOM: (_dom) => {
            dom = _dom;
        },
    };

    return UserActions;
};

export const dummy = new Proxy({}, {
    get(target, prop) {
        return () => {};
    },
});
