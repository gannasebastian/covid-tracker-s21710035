import axios from 'axios';

const url = 'https://covid19.mathdro.id/api'; // buat url untuk API (global case + countries)
const urlIndo = 'https://indonesia-covid-19.mathdro.id/api'; // url untuk API (Indonesia Provinces)

// Fetch Data utama (global)
export const fetchData = async (country) => {
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`;
    }

    try {
        const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(changeableUrl);
        //const modifiedData = {confirmed, recovered, deaths, lastUpdate};
        return {confirmed, recovered, deaths, lastUpdate};
    } catch (error) {
        console.log(error);
    }
}

// Fetch Data per-hari (global)
export const fetchDailyData = async () => {
    try {
        const  {data} = await axios.get(`${url}/daily`);

        //console.log(data);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

// Fetch Data per-negara (global => termasuk indonesia)
export const fetchCountries = async () => {
    try {
        const { data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}

// Fetch Data kasus di Indonesia
export const fetchIndo = async () => {
    try {
      const { data: { jumlahKasus: confirmed, meninggal: deaths, sembuh: recovered }, } = await axios.get(urlIndo);
      return { confirmed, recovered, deaths };
    } catch (err) {
      console.log(err);
    }
  }

// Fetch Data kasus di Indonesia (provinsi)
export const fetchProvince = async () => {
    try {
        const  {data: {data: provinces}, } = await axios.get(`${urlIndo}/provinsi`);
        return provinces.map((provinsi) => ({
            name: provinsi.provinsi,
            confirmed: provinsi.kasusPosi,
            recovered: provinsi.kasusSemb,
            deaths: provinsi.kasusMeni,
        }));
    } catch (error) {
        console.log(error);
    }
}