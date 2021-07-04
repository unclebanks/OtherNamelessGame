import { PokemonNameType } from './db';

interface UnlockData {
    badges: Record<string, boolean>,
}

interface GymLeader {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    badge?: string,
    win?: string,
    reward?: string,
    event?: string,
    megaStone?: string,
    megaStones?: string[],
    req?: string,
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

interface GymTrainer1 {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    win?: string,
    reward?: string,
    event?: string,
    req?: string,
}

interface GymTrainer2 {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    req?: string,
    win?: string,
    reward?: string,
    event?: string,
}

interface GymTrainer3 {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    req?: string,
    win?: string,
    reward?: string,
    event?: string,
}

interface EliteFour1 {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    win?: string,
    reward?: string,
    event?: string,
    megaStone?: string,
    megaStones?: string[],
}

interface EliteFour2 {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    req?: string,
    win?: string,
    reward?: string,
    event?: string,
    megaStone?: string,
    megaStones?: string[],
}

interface EliteFour3 {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    req?: string,
    win?: string,
    reward?: string,
    event?: string,
    megaStone?: string,
    megaStones?: string[],
}

interface EliteFour4 {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    req?: string,
    win?: string,
    reward?: string,
    event?: string,
    megaStone?: string,
    megaStones?: string[],
}

interface EliteFourChampion {
    name: string,
    poke: Array<[PokemonNameType, number]>,
    req?: string,
    win?: string,
    reward?: string,
    event?: string,
    megaStone?: string,
    megaStones?: string[],
}

interface Gym {
    name: string,
    gymLeader?: GymLeader,
    gymTrainer1?: GymTrainer1,
    gymTrainer2?: GymTrainer2,
    gymTrainer3?: GymTrainer3,
    eliteFour1?: EliteFour1,
    eliteFour2?: EliteFour2,
    eliteFour3?: EliteFour3,
    eliteFour4?: EliteFour4,
    eliteFourChampion?: EliteFourChampion,
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
    gym?: Gym,
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

    // Need to do something about these, can probably be made into
    // an unlock condition and become part of UnlockData.
    kantoOldRod?: 1
    kantoGoodRod?: 1
    kantoSuperRod?: 1
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
        kViridianForest: {
            name: 'Viridian Forest',
            pokes: ['Bulbasaur', 'Caterpie', 'Weedle', 'Pidgey', 'Spearow', 'Pikachu', 'Oddish', 'Bellsprout'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
            _special: [
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Ivysaur'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Kakuna'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Metapod'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Pidgeotto'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Gloom'] },
                { requirement: { type: 'item', item: 'kantoFirstStagePass' }, pokemon: ['Weepinbell'] },
            ],
        },
        kMtMoon: {
            name: 'Mt. Moon',
            pokes: ['Sandshrew', 'Nidoran F', 'Nidoran M', 'Clefairy', 'Zubat', 'Paras', 'Meowth', 'Geodude', 'Onix', 'Eevee'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kRockTunnel: {
            name: 'Rock Tunnel',
            pokes: ['Charmander', 'Zubat', 'Mankey', 'Abra', 'Geodude', 'Onix', 'Drowzee', 'Cubone', 'Snorlax'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kDiglettsCave: {
            name: 'Diglett\'s Cave',
            pokes: ['Diglett'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kSafariZone: {
            name: 'Safari Zone',
            pokes: ['Butterfree', 'Beedrill', 'Nidorina', 'Nidorino', 'Paras', 'Venonat', 'Farfetchd', 'Doduo', 'Exeggcute', 'Rhyhorn', 'Chansey', 'Tangela', 'Kangaskhan', 'Scyther', 'Pinsir', 'Tauros'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kPowerPLant: {
            name: 'Power Plant',
            pokes: ['Pikachu', 'Magnemite', 'Grimer', 'Voltorb', 'Electabuzz', 'Porygon', 'Zapdos'],
            minLevel: 3,
            maxLevel: 5,
            modal: 'kantoRoute2Bottom',
            respawn: 'palletTown',
        },
        kSeafoamIslands: {
            name: 'Seafoam Islands',
            pokes: ['Squirtle', 'Psyduck', 'Slowpoke', 'Seel', 'Shellder', 'Krabby', 'Horsea', 'Staryu', 'Jynx', 'Lapras', 'Articuno'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kPokemonMansion: {
            name: 'Pokemon Mansion',
            pokes: ['Rattata', 'Ekans', 'Vulpix', 'Persian', 'Growlithe', 'Ponyta', 'Gastly', 'Koffing', 'Magmar', 'Ditto'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kVictoryRoad: {
            name: 'Victory Road',
            pokes: ['Pidgeot', 'Arbok', 'Sandslash', 'Golbat', 'Venomoth', 'Primeape', 'Machoke', 'Graveler', 'Onix', 'Exeggutor', 'Marowak', 'Hitmonchan', 'Hitmonlee', 'Rhydon', 'Moltres'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kCeruleanCave: {
            name: 'Cerulean Cave',
            pokes: ['Blastoise', 'Venusaur', 'Charizard', 'Nidoqueen', 'Nidoking', 'Jigglypuff', 'Wigglytuff', 'Vileplume', 'Alakazam', 'Machamp', 'Victreebel', 'Rapidash', 'Golem', 'Dodrio', 'Gengar', 'Hypno', 'Lickitung', 'Mr. Mime', 'Aerodactyl', 'Dragonite', 'Mewtwo'],
            minLevel: 2,
            maxLevel: 5,
            respawn: 'palletTown',
        },
        kOldRod: {
            name: 'Kanto Old Rod',
            pokes: ['Magikarp'],
            minLevel: 5,
            maxLevel: 5,
            respawn: 'palletTown',
            kantoOldRod: 1,
        },
        kGoodRod: {
            name: 'Kanto Good Rod',
            pokes: ['Poliwag', 'Goldeen', 'Magikarp'],
            minLevel: 5,
            maxLevel: 15,
            respawn: 'palletTown',
            kantoGoodRod: 1,
        },
        kSuperRod: {
            name: 'Kanto Super Rod',
            pokes: ['Psyduck', 'Poliwag', 'Poliwhirl', 'Tentacool', 'Tentacruel', 'Slowpoke', 'Slowbro', 'Shellder', 'Krabby', 'Kingler', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Magikarp', 'Gyarados', 'Dratini', 'Dragonair'],
            minLevel: 5,
            maxLevel: 40,
            respawn: 'palletTown',
            kantoSuperRod: 1,
        },
    },
};

export default ROUTES;
