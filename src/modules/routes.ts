import { PokemonNameType } from './db';

interface UnlockData {
    badges: Record<string, boolean>,
}

type ItemSpecialRequirement = {
    type: 'item',
    item: string, // do you have a proper "item" type?
  }

  type PokemonDefeatSpecialRequirement = {
    type: 'pokemonTypeDefeat',
    statistic: string,
    need: number,
  }

  type EvoStoneSpecialRequirement = {
      type: 'evoStone',
      evoStone: string,
  }

type SpecialRequirement = ItemSpecialRequirement | PokemonDefeatSpecialRequirement | EvoStoneSpecialRequirement;

interface SpecialPokemon {
    requirement: SpecialRequirement,
    pokemon: PokemonNameType[],
  }

interface NPC {
    name: string,
    poke?: Array<[PokemonNameType, number]>,
    reward?: string,
    event?: string,
    megaStone?: string,
    megaStones?: string[],
}
// we might want professor specific stuff later, ignore warning
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Professor extends NPC {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Story extends NPC {}

interface Town {
    name: string,
    town: true,
    prof?: Professor,
    pokeMart?: true,
    npc?: NPC,
    story? : Story,
    _unlock?: UnlockData,
}

interface Route {
    name: string,
    pokes: PokemonNameType[],
    minLevel: number,
    maxLevel: number,
    // this should be a town name, but we don't know them all until later
    // may want to define all town names before this for stronger typing
    respawn: string,
    modal?: string,
    _unlock?: UnlockData,
    _special?: SpecialPokemon[],
}

interface RegionData {
    _global?: {
        pokes: PokemonNameType[],
        rarePokes?: PokemonNameType[],
        superRare?: PokemonNameType[],
    },

    _unlock?: UnlockData,
}

type RegionLocations = Record<string, Town | Route>

// This isn't perfect. We would like for typescript to know
// that `ROUTES.Kanto._global` can only be the type listed in RegionData,
// but it is unable to figure that out with the current definition.
type Routes = Record<string, RegionLocations | RegionData>

const ROUTES: Routes = {
    Kanto: {
        _global: {
            pokes: [],
            rarePokes: [],
            superRare: [],
        },
        palletTown: {
            name: 'Starter Base',
            town: true,
            prof: {
                name: 'Prof. Oak\'s Lab',
                event: 'profOak1',
            },
            pokeMart: true,
        },
        kantoPlains: {
            name: 'Plains',
            pokes: ['Rattata', 'Nidoran F', 'Nidoran M', 'Doduo', 'Oddish', 'Ekans', 'Jigglypuff', 'Lickitung', 'Drowzee', 'Tauros', 'Vulpix', 'Ponyta', 'Electabuzz', 'Growlithe', 'Bulbasaur'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Ivysaur'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Nidorina'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Nidorino'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Gloom'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Raticate'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Arbok'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Tangela'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Wigglytuff'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Farfetchd'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Hypno'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Rapidash'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Arcanine'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Scyther'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Kangaskhan'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Ninetales'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Venusaur'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Nidoking'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Nidoqueen'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Dodrio'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Vileplume'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Nidoking'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Nidoqueen'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Dodrio'] },
            ],
        },
        kantoForest: {
            name: 'Forest',
            pokes: ['Caterpie', 'Weedle', 'Pidgey', 'Pikachu', 'Bellsprout', 'Paras', 'Venonat', 'Exeggcute', 'Rattata', 'Ekans'],
            minLevel: 10,
            maxLevel: 20,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Kakuna'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Metapod'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Pidgeotto'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Weepinbell'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Raichu'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Raticate'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Arbok'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Beedrill'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Butterfree'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Pidgeot'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Victreebel'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Parasect'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Venomoth'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Exeggutor'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Pinsir'] },
            ],
        },
        kantoLake: {
            name: 'Lake',
            pokes: ['Squirtle', 'Psyduck', 'Slowpoke', 'Shellder', 'Krabby', 'Horsea', 'Staryu', 'Goldeen', 'Magikarp', 'Poliwag', 'Dratini'],
            minLevel: 30,
            maxLevel: 40,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Wartortle'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Poliwhirl'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Dragonair'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Seaking'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Seadra'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Kingler'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Cloyster'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Blastoise'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Golduck'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Slowbro'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Starmie'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Gyarados'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Poliwrath'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Dragonite'] },
            ],
        },
        kantoSea: {
            name: 'Sea',
            pokes: ['Tentacool', 'Staryu', 'Shellder', 'Seel', 'Horsea', 'Lapras', 'Omanyte', 'Kabuto', 'Squirtle', 'Krabby'],
            minLevel: 30,
            maxLevel: 40,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Wartortle'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Poliwhirl'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Starmie'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Seaking'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Seadra'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Kingler'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Cloyster'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Blastoise'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Starmie'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Dewgong'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Lapras'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Omastar'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Kabutops'] },
            ],
        },
        kantoCave: {
            name: 'Cave',
            pokes: ['Charmander', 'Zubat', 'Diglett', 'Gastly', 'Mankey', 'Machop', 'Clefairy', 'Abra', 'Geodude', 'Onix', 'Drowzee', 'Cubone'],
            minLevel: 20,
            maxLevel: 30,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Charmeleon'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Golbat'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Dugtrio'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Haunter'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Kadabra'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Graveler'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Machoke'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Magmar'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Clefable'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Charizard'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Primeape'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Machamp'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Alakazam'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Gengar'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Golem'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Hypno'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Marowak'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Snorlax'] },
            ],
        },
        kantoField: {
            name: 'Field',
            pokes: ['Spearow'],
            minLevel: 30,
            maxLevel: 40,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Kakuna'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Metapod'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Nidorina'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Nidorino'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Doduo'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Tangela'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Tauros'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Butterfree'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Beedrill'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Nidoqueen'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Nidoking'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Rhydon'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Chansey'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Kangaskhan'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Scyther'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Pinsir'] },
            ],
        },
        kantoTown: {
            name: 'Town',
            pokes: ['Pikachu', 'Magnemite', 'Grimer', 'Voltorb'],
            minLevel: 20,
            maxLevel: 30,
            modal: 'kantoRoute2Bottom',
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Electabuzz'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Raichu'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Magneton'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Muk'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Electrode'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Porygon'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Zapdos'] },
            ],
        },
        kPokemonMansion: {
            name: 'Pokemon Mansion',
            pokes: ['Rattata', 'Ekans', 'Vulpix', 'Meowth', 'Growlithe', 'Ponyta', 'Gastly', 'Koffing'],
            minLevel: 40,
            maxLevel: 50,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Raticate'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Arbok'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Persian'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Haunter'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Ninetales'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Arcanine'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Gengar'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Weezing'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Magmar'] },
                { requirement: { type: 'item', item: 'kantoSecondStagePass' }, pokemon: ['Ditto'] },
            ],
        },
        kVictoryRoad: {
            name: 'Victory Road',
            pokes: ['Pidgeot', 'Arbok', 'Sandslash', 'Golbat', 'Venomoth', 'Primeape', 'Machoke', 'Graveler', 'Onix', 'Exeggutor', 'Marowak', 'Hitmonchan', 'Hitmonlee', 'Rhydon', 'Moltres'],
            minLevel: 50,
            maxLevel: 60,
            respawn: 'palletTown',
        },
        kCeruleanCave: {
            name: 'Cerulean Cave',
            pokes: ['Blastoise', 'Venusaur', 'Charizard', 'Nidoqueen', 'Nidoking', 'Jigglypuff', 'Wigglytuff', 'Vileplume', 'Alakazam', 'Machamp', 'Victreebel', 'Rapidash', 'Golem', 'Dodrio', 'Gengar', 'Hypno', 'Lickitung', 'Mr. Mime', 'Aerodactyl', 'Dragonite', 'Mewtwo'],
            minLevel: 60,
            maxLevel: 70,
            respawn: 'palletTown',
        },
    },
};

export default ROUTES;
