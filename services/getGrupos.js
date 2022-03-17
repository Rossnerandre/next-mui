import { useState, useEffect } from "react";
import useSWR from "swr"
import axios from "axios";

export default function getGrupos() {
  const [grupos, setGrupos] = useState();

  const { data, error } = useSWR('http://cartoes-back.test/api/grupos', url => axios.get(url).then(res => res.data.data))
  useEffect(() => {
    if (data) {
      const transformadData = [];
      for (const key in data) {
        transformadData.push({
          id: data[key].id,
          nome: data[key].nome,
          cnpj: data[key].cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
        });
      }
      setGrupos(transformadData);
    }
  }, [data], [grupos])

  if (!grupos) {
    return;
  }

  return grupos;
}
