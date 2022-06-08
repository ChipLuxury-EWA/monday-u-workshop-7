import fs from "fs";
const jediFile = "jedi_list.json";

async function replaceJedi(jediId, jedi, res) {
    //DONE write logic replacing jedi by it's id with newly passed jedi
    const jediArray = await readJediFile();
    const index = jediArray.findIndex((item) => item.id == jediId);
    if (index === -1) {
        res.status(404).json("Id not found");
        return;
    } else {
        jediArray[index] = jedi;
        writeJediFile(jediArray);
        return jediArray;
    }
}

async function deleteJedi(jediId, res) {
    //DONE Delete jedi by given id in our file
    const jediArray = await readJediFile();
    const index = jediArray.findIndex((item) => item.id == jediId);
    if (index === -1) {
        res.status(404).json("Id not found");
        return;
    } else {
        jediArray[index].deleted = true;
        writeJediFile(jediArray);
        return getAll();
    }
}

async function undoDeleteJedi(jediId, res) {
    const jediArray = await readJediFile();
    const index = jediArray.findIndex((item) => item.id == jediId);
    if (index === -1) {
        res.status(404).json("Id not found");
        return;
    } else {
        delete jediArray[index].deleted;
        writeJediFile(jediArray);
        return jediArray;
    }
}

async function getAll() {
    //DONE obtain all saved jedis and return it to callee
    const data = await readJediFile();
    const jedis = data.filter((jedi) => jedi.deleted !== true);
    return jedis;
}

const addJedi = async (jedi) => {
    let data = await readJediFile();
    if (!data) {
        data = [];
    }

    data.push(jedi);
    await writeJediFile(data);
    return data;
};

async function getJedi(id) {
    const data = await readJediFile();
    return data.find((value) => value.id === id);
}

async function readJediFile() {
    try {
        const data = await fs.readFileSync(jediFile);
        const jedisArray = JSON.parse(data.toString());
        return jedisArray;
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeJediFile(content) {
    try {
        await fs.writeFileSync(jediFile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}

async function joinTheDarkSide() {
    const jedisArray = await readJediFile();
    const theForceIndex = jedisArray.findIndex(
        (jedi) => jedi.name === "Anakin Skywalker"
    );
    const theDarkSideIndex = jedisArray.findIndex(
        (jedi) => jedi.name === "Darth Vader"
    );
    
    // [jedisArray[theForceIndex], jedisArray[theDarkSideIndex]] = [jedisArray[theDarkSideIndex], jedisArray[theDarkSideIndex]]
    jedisArray[theForceIndex] = jedisArray[theDarkSideIndex]

    return jedisArray;
}

export default {
    addJedi,
    getJedi,
    getAll,
    replaceJedi,
    deleteJedi,
    undoDeleteJedi,
    joinTheDarkSide,
};
