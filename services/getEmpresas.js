import { useState, useEffect } from "react";
import useSWR from "swr"
import axios from "axios";

export default function getEmpresas() {
  const [empresas, setEmpresas] = useState();

  const { data, error } = useSWR('http://cartoes-back.test/api/empresas', url => axios.get(url).then(res => res.data.data));

  useEffect(() => {
    if (data) {
      const transformadData = [];
      for (const key in data) {
        transformadData.push({
          id: data[key].id,
          grupo_id: data[key].grupo === null ? '' : data[key].grupo.id,
          grupo_nome: data[key].grupo === null ? '#' : data[key].grupo.nome,
          nome: data[key].nome,
          email: data[key].email,
          cnpj: data[key].cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"),
          status: data[key].ativa == 0 ? 'Inativa' : 'Ativa'
        });
      }
      setEmpresas(transformadData);
    }
  }, [data], [empresas])

  if (!empresas) {
    return;
  }

  return empresas;
}
