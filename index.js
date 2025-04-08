const fs = require("fs");
const csv = require("csv-parser");
const { parse } = require("json2csv");

const readCSV = (path) => {
  return new Promise((resolve, reject) => {
    const result = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (data) => result.push(data))
      .on("end", () => resolve(result))
      .on("error", (err) => reject(err));
  });
};

const makeCSVFile = (jsonData) => {
  const csvData = parse(jsonData);

  // Write CSV to file
  fs.writeFile(
    `./output/${new Date().getTime()}-output.csv`,
    csvData,
    (err) => {
      if (err) {
        console.error("Error writing CSV to file:", err);
      } else {
        console.log("CSV file saved as output.csv");
      }
    }
  );
};

const getRandomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};

const pickOne = (data) => {
  const length = data.length;
  if (length === 1) return data[0];
  const randomIndex = getRandomNumber(0, length - 1);
  return data[randomIndex];
};

const parseData = (inputData) => {
  return inputData.map((info) => {
    const [name, email] = Object.keys(info);
    return {
      name: info[name],
      email: info[email],
    };
  });
};

const parseOutputData = (outputData) => {
  return outputData.map((info) => {
    const [name, email, childName, childEmail] = Object.keys(info);
    return {
      Employee_Name: info[name],
      Employee_EmailID: info[email],
      Secret_Child_Name: info[childName],
      Secret_Child_EmailID: info[childEmail],
    };
  });
};

const main = async (
  inputPath = "./input/data.csv",
  prevInputPath = "./input/prev-year-data.csv"
) => {
  const inputData = await readCSV(inputPath);
  const prevInputData = await readCSV(prevInputPath);

  // throw error  if there odd number of rows. it will generate unexpected result
  if (inputData.length % 2 === 1) throw new Error("Row Should be even");
  const data = parseData(inputData);
  const oldData = parseData(prevInputData);

  const processData = [];
  const outputData = data.map((info, i) => {
    // find associated child data if exist
    const foundPreviousData = oldData.find((o) => o.email === info.email);

    /* filter data based on the condition */
    const filterData = data.filter((d, j) => {
      if (foundPreviousData && foundPreviousData.email === d.email)
        return false;
      if (processData.includes(d.email)) return false;
      return i !== j;
    });

    // pick random data from the filter data
    const matchData = pickOne(filterData);

    // return if no match data found
    if (!matchData) {
      return info;
    }

    processData.push(matchData.email);
    return { ...info, childName: matchData.email, childEmail: matchData.email };
  });
  makeCSVFile(parseOutputData(outputData));
  return outputData;
};

main();
