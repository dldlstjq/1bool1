import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_URL } from "../../..";

export function useFetch(url, page, size) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: BASE_URL + url,
      params: { page: page - 1, size },
    })
      .then((res) => {
        if (res.data.object?.length > 0) setData(res.data.object);
      })
      .catch((err) => console.log(err));
  }, [url, page, size]);

  return data;
}

export function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  // const reset = useCallback(() => setForm(initialForm), [initialForm]);
  return [form, onChange];
}
