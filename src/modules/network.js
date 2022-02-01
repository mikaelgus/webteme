/**
 * Fetch JSON data from API
 *
 * @param {Srting} url api endpoint
 */
const fetchData = async (url, useProxy = false) => {
  if (useProxy) {
    url = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  }
  let jsonData;
  try {
    const responce = await fetch(url);
    if (useProxy) {
      const parseData = await responce.json();
      jsonData = JSON.parse(parseData.contents);
    } else {
      jsonData = await responce.json();
    }

    console.log("what comes? ", jsonData);
    if (!responce.ok) {
      throw new Error(`HTTP ${responce.status}`);
    }
  } catch (error) {
    console.log("fetch data error", error);
    jsonData = [];
  }
  return jsonData;
};

export { fetchData };
