const initXpTable = (): Array<number> => {
    const BASE_XP = 550;
    let xpTable: number[] = [];
    for (let x = 0; x < 200; x++) {
        if (x === 0) { xpTable.push(0); }
        else if (x === 1) { xpTable.push(0); }
        else {
            let mod = x + 80;
            let pre = Math.floor(Math.pow(BASE_XP * (x * 1.016), (mod * 0.008)));
            xpTable.push(Math.floor((pre/9) + xpTable[x-1]));
        }
    }
    console.log(xpTable);
    return xpTable;
}

const XpTable = initXpTable();

const DidLevelUp = (level: number, xp: number) => xp >= XpTable[level + 1];

export default {
    XpTable,
    DidLevelUp
}
