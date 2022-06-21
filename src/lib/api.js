export async function searchRepo(url) {
  
  //const url = "https://api.github.com/search/repositories?q=stars:>=10000+language:go&sort=stars&order=desc";
  //const url = "http://localhost/datos.json";
  if(!url) return;

  const response = await fetch(url, { mode: "cors" });

  const data = await response.json();

  if (!response.ok) {
    console.log(data.message);
    throw new Error("No se pudo obtener la información");
  }

  /*const transformed = [];

    for (const key in data) {
    const itemObj = {
      id: key,
      ...data[key],
    };

    transformed.push(itemObj);
  }*/

  return data;
}

export async function searchRepoFile(url) {
 
  if(!url) return;
  console.log('searchRepoFile');
  
  const response = await fetch(url, { mode: "cors" });

  const data = await response.json();

  if (!response.ok) {
    console.log(data.message);
    throw new Error("No se pudo obtener la información");
  }

  /*const transformed = [];

    for (const key in data) {
    const itemObj = {
      id: key,
      ...data[key],
    };

    transformed.push(itemObj);
  }*/

  return [data];
}
