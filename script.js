const tableKeyBegin = document.querySelector("#key-begin");
const tableKeyRemoveCheck = document.querySelector("#key-removeCheck");
const tableShift = document.querySelectorAll(".shiftTable");
const tableShrink = document.querySelectorAll(".shrinkTable");
const tableOpeningReplacing = document.querySelector("#openingReplacing");
const additions = document.querySelector("#additions");
const tableConnected = document.querySelector("#connected");
const tableEndingReplacing = document.querySelector("#endingReplacing");
const indexBtn_Box = document.querySelector("#indexBtn-box");

////////////
const openedText_TablesBox = document.querySelector("#openedText-tableBox");
const pBlocked_TableBox = document.querySelector("#pBlocked-tableBox");
const sBlocked_TableBox = document.querySelector("#sBlocked-tableBox");
const straightReplaced_TableBox = document.querySelector("#straightReplaced-tableBox");
////////////

// const key = "PROTOCOL";
// const openedText = "В камень стрелять - только стрелы терять";
// const shiftsNums = [9, 10, 11];
// let partIndex = 0;
let openedTextArrs = [];

function main(key, openedText, shiftsNums, n=0) {
    const shiftingOnce = [1, 2, 9, 16];

    tableKeyBegin.textContent = "";
    tableKeyRemoveCheck.textContent = "";
    tableOpeningReplacing.textContent = "";
    additions.textContent = "";
    tableConnected.textContent = "";
    tableEndingReplacing.textContent = "";
    openedText_TablesBox.textContent = "";
    pBlocked_TableBox.textContent = "";
    sBlocked_TableBox.textContent = "";
    straightReplaced_TableBox.textContent = "";

    let keyArr = [];
    let keyRemoveCheck = [];
    let shiftedArrs = [];
    let finalKeys = [];
    let openedTextArr_clean = [];
    openedTextArrs = [];
    let openingReplacingArrs = [];
    let pBlockedArrs = [];
    let pBlockedNkeyArrs = [];
    let sBlockedArrs = [];
    let straightReplacedArrs = [];
    let connected = [];
    let endingReplaced = [];

    let openedTextTables_Arr = [];
    let pBlockedTables_Arr = [];
    let sBlockedTables_Arr = [];
    let straightReplacedTables_Arr = [];

    // прописывать в иннерхтмл пон
    function setTable(arr, rows, cols=8, caption=undefined) {
        let s = "";
        if (caption != undefined) {
            s += `<caption>${caption}</caption>`
        }
        let counter = 0;
        for (let i = 0; i < rows; i++) {
            s += "<tr>";
            for (let j = 0; j < cols; j++) {
                s += `<td>${arr[counter]}</td>`;
                counter++;
            }
            s += "</tr>";
        }
        return s;
    }

    // Массив таблиц                                без инерхтмл)))))
    function setSomeTables(arr, tables_arr, element, rows=8, cols=8, caption=undefined) {
        let tempCap = caption;
        for (let i = 0; i < arr.length; i++) {
            if (tempCap == "Раунд") {
                caption = `${i+1} раунд`;
            }
            tables_arr.push(document.createElement("table"));
            tables_arr[i].innerHTML = setTable(arr[i], rows, cols, caption);
            element.appendChild(tables_arr[i]);
        }
    }

    // Меняем табличку по шаблону
    function replace(arr, pattern) {
        let replacedArr = [];
        for (let i = 0; i < pattern.length; i++) {
            replacedArr.push(arr[pattern[i]-1]);
        }
        return replacedArr;
    }

    // Добавление нумерации
    function setEnum(table, arr = undefined) {
        let tbody = table.firstChild;
        if (tbody.tagName == "CAPTION") {
            tbody = table.children[1];
        }
        for (let i = 0; i < tbody.childElementCount; i++) {
            for (let j = 0; j < tbody.children[0].childElementCount; j++) {
                let backNum = document.createElement("div");
                backNum.style.fontSize = ".8em"
                backNum.style.fontWeight = "400";
                backNum.style.color = "gray";
                if (arr === undefined)
                    backNum.innerHTML = 1+j+i*tbody.children[0].childElementCount;
                else
                    backNum.innerHTML = arr[j+i*tbody.children[0].childElementCount];
                tbody.children[i].children[j].appendChild(backNum);
            }
        }
    }

    // Забей
    // function setTd(str, cols) {
    //     let s = "";
    //     for (let i = 0; i < cols; i++) {
    //         s += `<td>${str[i]}</td>`;
    //     }
    //     return s;
    // }


    // Заполнение изначального ключа
    for (let i = 0; i < 8; i++) {
        let binChar = "00000000";
        if (i < key.length)
            binChar = Number(key[i].charCodeAt()).toString(2);
        while (binChar.length < 8) {
            binChar = "0" + binChar;
        }
        for (let j = 0; j < 8; j++) {
            keyArr.push(binChar[j]);
        }
        // keyBegin.innerHTML += `<tr id="keyRow${i+1}">${setTd(binChar, 8)}</tr>`;
    }
    tableKeyBegin.innerHTML = setTable(keyArr, 8);
    setEnum(tableKeyBegin);


    // Заполнение массива Удаления битов проверки (keyRemoveCheck)
    // for (let i = 0; i < keyArr.length; i++) {
    //     keyRemoveCheck.push(keyArr[removeCheck[i]-1]);
    // }
    keyRemoveCheck = replace(keyArr, removeCheck);

    tableKeyRemoveCheck.innerHTML = setTable(keyRemoveCheck, 7);
    setEnum(tableKeyRemoveCheck, removeCheck);


    // Сдвиги всякие начинаются
    //Сдвиг
    function shift(shift) {
        let table1 = [], table2 = [];
        for (let i = 0; i < 56; i++) {
            if (i < 28)
                table1.push(keyRemoveCheck[i]);
            else
                table2.push(keyRemoveCheck[i]);
        }
        for (let i = 1; i <= shift; i++) {
            if (shiftingOnce.includes(i)) {
                table1.push(table1.shift());
                table2.push(table2.shift());
            } else {
                for (let j = 0; j < 2; j++) {
                    table1.push(table1.shift());
                    table2.push(table2.shift());
                }
            }
        }
        let shifted = table1.concat(table2);
        return shifted;
    }

    // Делаем непосредственные сдвиги и выводим
    for (let i = 0; i < shiftsNums.length; i++) {
        shiftedArrs.push(shift(shiftsNums[i]));
        tableShift[i].innerHTML = setTable(shiftedArrs[i], 7, 8, `${shiftsNums[i]} сдвиг`);
        setEnum(tableShift[i]);
    }


    // Перестановка сжатия и ее вывод
    for (let i = 0; i < shiftsNums.length; i++) {
        finalKeys.push(replace(shiftedArrs[i], shrinking));
        tableShrink[i].innerHTML = setTable(finalKeys[i], 6, 8, `${i+1} ключ`);
        setEnum(tableShrink[i], shrinking);
    }


    // Преобразование открытого текста
    for (let i = 0; i < openedText.length; i++) {
        let AsciiChar = openedText[i].charCodeAt();
        if (AsciiChar >= 1040) {
            AsciiChar -= 848;
        }
        let binChar = Number(AsciiChar).toString(2);
        while (binChar.length < 8) {
            binChar = "0" + binChar;
        }
        for (let j = 0; j < 8; j++) {
            openedTextArr_clean.push(binChar[j]);
        }
    }
    // делим то шо выше по табличкам 8 на 8
    for (let i = 0; i < Math.ceil(openedTextArr_clean.length/64); i++) {
        let temp = [], counter = i*64;
        for (let j = 0; j < 64; j++) {
            char = openedTextArr_clean[counter]
            if (char === undefined) {
                char = 0;
            }
            temp.push(char);
            counter++
        }
        openedTextArrs.push(temp);
    }
    //Создание таблиц
    // for (let i = 0; i < openedTextArrs.length; i++) {
    //     openedTextTables_Arr.push(document.createElement("table"));
    //     openedTextTables_Arr[i].innerHTML = setTable(openedTextArrs[i], 8);
    //     openedText_TablesBox.appendChild(openedTextTables_Arr[i]);
    //     // openedTextTablesBox.insertBefore(openedTextTables_Arr[i], tableOpenedText);
    // }


    setSomeTables(openedTextArrs, openedTextTables_Arr, openedText_TablesBox);
    for (let i = 0; i < openedTextTables_Arr.length; i++) {
        setEnum(openedTextTables_Arr[i]);
    }

    // Дабавляем буковки в таблички чтоб прикольно было
    for (let i = 0; i < openedTextTables_Arr.length; i++) {
        let counter = i*8;
        for (let child of openedTextTables_Arr[i].firstChild.children) {
            let letter = document.createElement("th");
            text = openedText[counter];
            if (text === undefined) 
                text = "";
            letter.innerHTML = text;
            let firstChild = child.firstChild;
            child.insertBefore(letter, firstChild);
            counter++;
        }
    }

    
    // Начальная перестановка (openingReplacing)
    for (let i = 0; i < openedTextArrs.length; i++) {
        openingReplacingArrs.push(replace(openedTextArrs[i], openingReplacing));
    }
    // tableOpeningReplacing.innerHTML = setTable(openingReplacingArrs[0], 8);
    
    // let pBlocked = [];
    
    function encryption(arr) {
        let leftArr = [], rightArr = [];
        for (let i = 0; i < 64; i++) {
            if (i < 32)
            leftArr.push(arr[i]);
        else
        rightArr.push(arr[i]);
}
for (let i = 0; i < finalKeys.length; i++) {
    let pBlocked = replace(rightArr, pBlock);           // P блок
    let sBlocked = [];
    pBlockedArrs.push(pBlocked);
    let pBlockedNkey = [];
    for (let j = 0; j < 48; j++) {          // Сложение с ключом
        pBlockedNkey.push(pBlocked[j] ^ finalKeys[i][j]);
    }
    pBlockedNkeyArrs.push(pBlockedNkey);
    for (let j = 0; j < 8; j++) {                   // S блок
        row = parseInt(pBlockedNkey[0+j*6].toString()+pBlockedNkey[5+j*6].toString(), 2);
        col = parseInt(pBlockedNkey[1+j*6].toString()+pBlockedNkey[2+j*6].toString()+pBlockedNkey[3+j*6].toString()+pBlockedNkey[4+j*6].toString(), 2);
        sNum = Number(sBlocks[j][row][col]).toString(2);
                while (sNum.length < 4) {
                    sNum = "0" + sNum;
                }
                for (let k = 0; k < 4; k++)
                sBlocked.push(sNum[k]);
            // preSblocked.innerHTML += `<div>${j+1}) </div>`;
            // document.body.innerHTML += sBlocks[j][row][col] + " ";
        }
        sBlockedArrs.push(sBlocked);
        let straightReplaced = replace(sBlocked, straightReplacing);    // Прямая перестановка
        straightReplacedArrs.push(straightReplaced);
        let tempRight = rightArr;
        rightArr = [];
        for (let j = 0; j < 32; j++) {
            rightArr.push(leftArr[j] ^ straightReplaced[j]);
        }
        leftArr = tempRight;
    }
    connected = leftArr.concat(rightArr);
    endingReplaced = replace(connected, endingReplacing);
}


encryption(openingReplacingArrs[n]);

// Вывод прямой перестановки 
tableOpeningReplacing.innerHTML = setTable(openingReplacingArrs[n], 8);
setEnum(tableOpeningReplacing, openingReplacing);

// Вывод P-блоков
setSomeTables(pBlockedArrs, pBlockedTables_Arr, pBlocked_TableBox, 8, 6, "Раунд");
for (let i = 0; i < pBlockedArrs.length; i++) {
        setEnum(pBlockedTables_Arr[i], pBlock);
    }
    
    let pB = "", fK = "", pNk = "", s = "";
    for (let i = 0; i < pBlockedNkeyArrs.length; i++) {       // Вывод сложения п-блоков и ключей
        let addition = document.createElement("div");
        let str = "";
        pB = "", fK = "", pNk = "", s = "";
        str += `<h3 style="padding-left: 1rem; border-left: black solid">${i+1} Раунд</h3><div>`
        let counter = 0;
        for (let j = 0; j < 48; j++) {
            if (j % 6 == 0 && j != 0) {
                str += `<div style="white-space: nowrap;">${pB} + ${fK} = ${pNk} |<b> S${j/6} = ${parseInt(s, 2)} = ${s}</b></div>`;
                additions.appendChild(addition);
                pB = "", fK = "", pNk = "", s = "";
            }
            if (j % 6 < 4) {
                s += sBlockedArrs[i][counter];
                counter++;
            }
            pB += pBlockedArrs[i][j];
            fK += finalKeys[i][j];
            pNk += pBlockedNkeyArrs[i][j];
            // pBlockedNkey.push(pBlocked[j] ^ finalKeys[i][j]);
        }
        str += `${pB} + ${fK} = ${pNk} |<b> S8 = ${parseInt(s, 2)} = ${s}</b></div>`;
        addition.innerHTML += str;
        additions.appendChild(addition);
    }
    
    
    setSomeTables(sBlockedArrs, sBlockedTables_Arr, sBlocked_TableBox, 4, 8, "Раунд");      // вывод s-блоков

    setSomeTables(straightReplacedArrs, straightReplacedTables_Arr, straightReplaced_TableBox, 4, 8, "Раунд");      // вывод s-блоков
    for (let i = 0; i < straightReplacedArrs.length; i++) {
        setEnum(straightReplacedTables_Arr[i], straightReplacing);
    }

    tableConnected.innerHTML = setTable(connected, 8);
    setEnum(tableConnected);

    tableEndingReplacing.innerHTML = setTable(endingReplaced, 8);
    setEnum(tableEndingReplacing, endingReplacing);
}

// container.style.display="flex";
// main(key, openedText, shiftsNums, partIndex);

// дебажим
// document.body.innerHTML += tableOpenedText.tagName;
// document.body.innerHTML += openingReplacingTables_Arr[0].children[0].childElementCount;
// document.body.innerHTML += Number(parseInt(pBlockedArrs[0][1]+pBlockedArrs[0][5], 2)).toString(2);
// document.body.innerHTML += String.fromCharCode(42);