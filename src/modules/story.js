import { $, pokeByIndex } from './utilities';
import POKEDEX from './db.ts';
import { renderView } from './display';
import { POKEDEXFLAGS } from './data';
import { openModal, closeModal } from './modalEvents';
import { pokeImage } from './poke';

export default (player, enemy, combatLoop, Poke) => {
    let dom;

    const Story = {
        canClose: true,
        displayStory: function (title, content, canClose) {
            this.canClose = canClose;
            openModal($('#storyModal'));
            $('#storyDialog .modal-card-title').innerHTML = title;
            $('#storyContent').innerHTML = content;
        },
        stories: {
            firstPoke: function () {
                const title = 'OtherNamelessPokemonGa,e';
                let storyHTML = '<p>Hello there and welcome!</p>';
                storyHTML += '<p>My name is Samuel Oak! People call me the POKEMON PROF!</p>';
                storyHTML += '<p>I have asked you to come to assist me in gathering information on POKEMON</p>';
                storyHTML += '<p>As you go forth on your journey please do send me a lot of POKEMON to research.</p>';
                storyHTML += '<p>The more that you send me the more places you will be able to go and POKEMON you will be able to see.</p>';
                storyHTML += '<p>First, pick your partner POKEMON and go forth!</p>';
                storyHTML += `<p><img src="${Story.helpers.getPokeImg(1)}" onclick="story.helpers.selectFirstPoke(1)">`;
                storyHTML += `<img src="${Story.helpers.getPokeImg(5)}" onclick="story.helpers.selectFirstPoke(5)">`;
                storyHTML += `<img src="${Story.helpers.getPokeImg(10)}" onclick="story.helpers.selectFirstPoke(10)">`;
                storyHTML += `<img src="${Story.helpers.getPokeImg(33)}" onclick="story.helpers.selectFirstPoke(33)"></p>`;
                Story.displayStory(title, storyHTML, false);
            },
        },
        helpers: {
            getPokeImg: function (id) {
                return pokeImage('normal', 'front', POKEDEX[id - 1].name);
            },
            selectFirstPoke: function (id) {
                const starterPoke = new Poke(pokeByIndex(id), 5);
                player.addPoke(starterPoke);
                player.addPokedex(starterPoke.pokeName(), POKEDEXFLAGS.ownNormal);
                player.setActive(0);
                player.events[starterPoke.pokeName()] = true;
                combatLoop.unpause();
                renderView(dom, enemy, player);
                dom.renderRoutesBox();
                closeModal($('#storyModal'));
            },
        },
        attachDOM: (_dom) => dom = _dom,
    };

    return Story;
};
