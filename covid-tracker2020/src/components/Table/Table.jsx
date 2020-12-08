import React, { useState, useEffect } from "react";
import { fetchProvince } from "../../api";
import NumberFormat from "react-number-format";
import "./Table.module.css";

const Table = () => {
  const [dataProvinsi, setDataProvinsi] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setDataProvinsi(await fetchProvince());
    };
    fetchApi();
  }, [setDataProvinsi]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Provinsi</th>
            <th>Positif</th>
            <th>Sembuh</th>
            <th>Meninggal</th>
          </tr>
        </thead>
        <tbody>
          {dataProvinsi.map((provinsi) => (
            <tr key={provinsi.namaProvinsi}>
              <td>{provinsi.namaProvinsi}</td>
              <td>
                <NumberFormat
                  value={provinsi.confirmed}
                  thousandSeparator={true}
                  displayType={"text"}
                />
              </td>
              <td>
                <NumberFormat
                  value={provinsi.recovered}
                  thousandSeparator={true}
                  displayType={"text"}
                />
              </td>
              <td>
                <NumberFormat
                  value={provinsi.deaths}
                  thousandSeparator={true}
                  displayType={"text"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;