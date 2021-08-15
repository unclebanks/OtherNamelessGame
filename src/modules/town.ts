import { $ } from './utilities';

type Player = any;
type Poke = any;
type DOM = any;

interface ShopItemBase {
    name: string,
}

interface ShopItemBall extends ShopItemBase {
    ball: string,
}

interface ShopItemBattleItem extends ShopItemBase {
    battleItem: string,
}

interface ShopItemUnlockable extends ShopItemBase {
    unlockable: string,
}

interface ShopItemMegaStone extends ShopItemBase {
    megaStones: string,
}

interface ShopItemEvoStone extends ShopItemBase {
    evoStones: string,
}

type ShopItem = ShopItemBall | ShopItemBattleItem | ShopItemUnlockable | ShopItemMegaStone | ShopItemEvoStone;

interface PokecoinShopItemBase {
    pokecoins: number,
}

interface BattlecoinShopItemBase {
    battlecoins: number,
}

interface CatchcoinShopItemBase {
    catchcoins: number,
}

type PokecoinShopItem = PokecoinShopItemBase & ShopItem;

type PokecoinShop = PokecoinShopItem[];

type BattlecoinShopItem = BattlecoinShopItemBase & ShopItem;

type BattlecoinShop = BattlecoinShopItem[];

type CatchcoinShopItem = CatchcoinShopItemBase & ShopItem;

type CatchcoinShop = CatchcoinShopItem[];

interface RegionShops<T> {
    kanto: T,
    johto?: T,
    hoenn?: T,
    sinnoh?: T,
    unova?: T,
    kalos?: T,
    alola?: T,
    galar?: T,
}

class Town {
    player: Player;

    Poke: Poke;

    dom: DOM;

    pokecoinShops: RegionShops<PokecoinShop>;

    battlecoinShops: RegionShops<BattlecoinShop>;

    catchcoinShops: RegionShops<CatchcoinShop>;

    constructor(player: Player, Poke: Poke) {
        this.player = player;
        this.Poke = Poke;

        this.pokecoinShops = {
            kanto: [
                {
                    name: 'Pokeball',
                    pokecoins: 10,
                    ball: 'pokeball',
                },
                {
                    name: 'Greatball',
                    pokecoins: 250,
                    ball: 'greatball',
                },
                {
                    name: 'Ultraball',
                    pokecoins: 500,
                    ball: 'ultraball',
                },
                /*
                {
                    name: 'Revive',
                    pokecoins: 1000,
                    battleItem: 'revive',
                },
                {
                    name: 'Max Revive',
                    pokecoins: 1000,
                    battleItem: 'maxRevive',
                },
                */
            ],
        };
        this.battlecoinShops = {
            kanto: [
                {
                    name: 'Razz Berry',
                    battlecoins: 2500,
                    unlockable: 'razzBerry',
                },
            ],
        };
        this.catchcoinShops = {
            kanto: [
                {
                    name: 'Thunder Stone',
                    catchcoins: 1000,
                    evoStones: 'thunderStone',
                },
                {
                    name: 'Fire Stone',
                    catchcoins: 1000,
                    evoStones: 'fireStone',
                },
                {
                    name: 'Water Stone',
                    catchcoins: 1000,
                    evoStones: 'waterStone',
                },
                {
                    name: 'Leaf Stone',
                    catchcoins: 1000,
                    evoStones: 'leafStone',
                },
                {
                    name: 'Moon Stone',
                    catchcoins: 1000,
                    evoStones: 'moonStone',
                },
            ],
        };
    }

    renderPokeCoinShop(region: string): void {
        let shopHTML = '';
        const shop: PokecoinShop | null = region in this.pokecoinShops ? this.pokecoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        for (let i = 0; i < shop.length; i++) {
            const item = shop[i];
            let canBuy = true;
            let canBuy10 = true;
            let canBuy100 = true;
            let canBuy1000 = true;
            const own = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins) canBuy = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins * 10) canBuy10 = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins * 100) canBuy100 = false;
            if (this.player.currencyAmount.pokecoins < item.pokecoins * 1000) canBuy1000 = false;
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            const disableButton10 = (!canBuy10 || own) ? ' disabled="true"' : '';
            const disableButton100 = (!canBuy100 || own) ? ' disabled="true"' : '';
            const disableButton1000 = (!canBuy1000 || own) ? ' disabled="true"' : '';
            const buttonText = (own) ? 'Own' : 'Buy';
            const buttonText10 = (own) ? 'Own' : 'Buy 10';
            const buttonText100 = (own) ? 'Own' : 'Buy 100';
            const buttonText1000 = (own) ? 'Own' : 'Buy 1000';
            const buttonHTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i})"${disableButton}>${buttonText}</button>`;
            const button10HTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i}, 10)"${disableButton10}>${buttonText10}</button>`;
            const button100HTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i}, 100)"${disableButton100}>${buttonText100}</button>`;
            const button1000HTML = ` <button onclick="town.buyPokeCoinItem('${region}', ${i}, 1000)"${disableButton1000}>${buttonText1000}</button>`;
            if ('ball' in item) {
                shopHTML += `<li><img src="assets/images/pokeballs/${item.ball}.png" height="30" width="30"></img>: <img src="assets/images/currency/PokeCoin.png" height="16" width="16"></img>${item.pokecoins}${buttonHTML}${button10HTML}${button100HTML}${button1000HTML}</li>`;
            } else if ('battleItem' in item) {
                shopHTML += `<li><img src="assets/images/battleItems/${item.battleItem}.png" height="30" width="30"></img>: <img src="assets/images/currency/PokeCoin.png" height="16" width="16"></img>${item.pokecoins}${buttonHTML}${button10HTML}${button100HTML}${button1000HTML}</li>`;
            } else {
                shopHTML += `<li>${item.name}: <img src="assets/images/currency/PokeCoin.png" height="16" width="16"></img>${item.pokecoins}${buttonHTML}${button10HTML}${button100HTML}${button1000HTML}</li>`;
            }
        }
        $('#pokecoinShopItems').innerHTML = shopHTML;
    }

    renderBattleCoinShop(region: string): void {
        let shopHTML = '';
        const shop: BattlecoinShop | null = region in this.battlecoinShops ? this.battlecoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        for (let i = 0; i < shop.length; i++) {
            const item = shop[i];
            let canBuy = true;
            let own = false;
            let missingMegaBracelet = false;
            if (this.player.currencyAmount.battlecoins < item.battlecoins) canBuy = false;
            if ('unlockable' in item && this.player.unlocked[item.unlockable]) {
                canBuy = false;
                own = true;
            }
            if ('megaStones' in item && this.player.megaStones[item.megaStones]) {
                canBuy = false;
                own = true;
            }
            if ('megaStones' in item && !this.player.unlocked.megaBracelet) {
                canBuy = false;
                missingMegaBracelet = true;
            }
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            let buttonText = 'Buy';
            if (own) {
                buttonText = 'Own';
            }
            if (missingMegaBracelet) {
                buttonText = 'Missing Mega Bracelet';
            }
            const buttonHTML = ` <button onclick="town.buyBattleCoinItem('${region}', ${i})"${disableButton}>${buttonText}</button>`;
            const showImage = false;
            shopHTML += `<li>${showImage ? `<img src="assets/images/battleShop/${item.name}.png" height="30" width="30"></img>` : item.name}: <img src="assets/images/currency/BattleCoin.png" height="16" width="16"></img>${item.battlecoins}${buttonHTML}</li>`;
        }
        $('#battlecoinShopItems').innerHTML = shopHTML;
    }

    renderCatchCoinShop(region: string): void {
        let shopHTML = '';
        const shop: CatchcoinShop | null = region in this.catchcoinShops ? this.catchcoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        for (let i = 0; i < shop.length; i++) {
            const item = shop[i];
            let canBuy = true;
            let own = false;
            if (this.player.currencyAmount.catchcoins < item.catchcoins) canBuy = false;
            if ('unlockable' in item && this.player.unlocked[item.unlockable]) {
                canBuy = false;
                own = true;
            }
            if ('evoStones' in item && this.player.evoStones[item.evoStones]) {
                canBuy = false;
                own = true;
            }
            const disableButton = (!canBuy || own) ? ' disabled="true"' : '';
            const buttonText = (own) ? 'Own' : 'Buy';
            const buttonHTML = ` <button onclick="town.buyCatchCoinItem('${region}', ${i})"${disableButton}>${buttonText}</button>`;
            shopHTML += `${'<li><img src="assets/images/evoStones/'}${item.name}.png" height="30" width="30"></img>: <img src="assets/images/currency/CatchCoin.png" height="16" width="16"></img>${item.catchcoins}${buttonHTML}</li>`;
        }
        $('#catchcoinShopItems').innerHTML = shopHTML;
    }

    buyPokeCoinItem(region: string, index: number, amount = 1) {
        const shop: PokecoinShop | null = region in this.pokecoinShops ? this.pokecoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        const item = shop[index];
        const cost = item.pokecoins * amount;
        if (this.player.currencyAmount.pokecoins < cost) {
            return false;
        } else {
            this.player.currencyAmount.pokecoins -= cost;
            if ('ball' in item) {
                this.player.ballsAmount[item.ball] += amount;
                this.dom.renderBalls();
            } else if ('battleItem' in item) {
                this.player.battleItem[item.battleItem] += amount;
                this.dom.renderBalls();
            } else {
                throw new Error('Unhandled item type.');
            }
            this.renderPokeCoinShop(region); // force refresh of shop
            this.dom.renderCurrency();
            return true;
        }
    }

    buyBattleCoinItem(region: string, index: number) {
        const shop: BattlecoinShop | null = region in this.battlecoinShops ? this.battlecoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        const item = shop[index];
        if (this.player.currencyAmount.battlecoins < item.battlecoins) {
            return false;
        } else {
            this.player.currencyAmount.battlecoins -= item.battlecoins;
            if ('unlockable' in item) {
                this.player.unlocked[item.unlockable] = 1;
            } else if ('ball' in item) {
                this.player.ballsAmount[item.ball]++;
                this.dom.renderBalls();
            } else if ('megaStones' in item) {
                this.player.megaStones[item.megaStones] = 1;
            } else {
                throw new Error('Unhandled item type.');
            }
            this.renderBattleCoinShop(region); // force refresh of shop
            this.dom.renderCurrency();
            return true;
        }
    }

    buyCatchCoinItem(region: string, index: number) {
        const shop: CatchcoinShop | null = region in this.catchcoinShops ? this.catchcoinShops[region] : null;
        if (!shop) {
            throw new Error(`Couldn't find shop for region ${region}`);
        }
        const item = shop[index];
        if (this.player.currencyAmount.catchcoins < item.catchcoins) {
            return false;
        } else {
            this.player.currencyAmount.catchcoins -= item.catchcoins;
            if ('unlockable' in item) {
                this.player.unlocked[item.unlockable] = 1;
                this.dom.renderRouteList();
            }
            if ('evoStones' in item) {
                this.player.evoStones[item.evoStones] = 1;
                this.dom.renderRouteList();
            }
            this.renderCatchCoinShop(region); // force refresh of shop
            this.dom.renderCurrency();
            return true;
        }
    }

    attachDOM(_dom: DOM) {
        this.dom = _dom;
    }
}

export default (player: Player, Poke: Poke): Town => new Town(player, Poke);
