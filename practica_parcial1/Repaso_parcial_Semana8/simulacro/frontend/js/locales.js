const API_URL = "http://localhost:3001/api";

const getStores = async () => {
  const response = await fetch(`${API_URL}/locales`);
  const stores = await response.json();
  if (!stores || stores.length == 0) throw new Error();
  return stores;        
};          

const getStoresNotInAMBA = async () => {
  const response = await fetch(`${API_URL}/locales/interior`);
  const stores = await response.json();
  if (!stores || stores.length == 0) throw new Error();
  return stores;
};

const loadStores = async (stores) => {
  const tbody = document.getElementById("datos");
  tbody.innerHTML = "";
  stores.forEach((store) => {
    const row = `
          <tr>
              <td>${store.number}</td>
              <td>${store.name}</td>
              <td>${store.address}</td>
              <td>${store.city}</td>
              <td>${store.latitude}</td>
              <td>${store.longitude}</td>
          `;
    tbody.innerHTML += row;
  });
};

const searchStores = async () => {
  try {
    const stores = await getStoresNotInAMBA();
    loadStores(stores);
  } catch (err) {
    window.alert("No fue posible buscar los locales del interior")
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {const stores = await getStores();
  loadStores(stores);
} catch (err) {
    window.alert("No fue posible buscar los locales")
  }
  // Se utiliza el handler onClick dentro del html
  //const interiorButton = document.getElementById("btn-interior");
  //interiorButton.addEventListener("click", searchStores);
});
