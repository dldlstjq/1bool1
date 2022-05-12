import axios from "axios";

export function axiosRequest(
  url,
  method,
  params = null,
  data = null,
  contentType = null
) {
  let axiosData = { method, url: url };
  if (params) axiosData.params = params;
  if (data) axiosData.data = data;
  if (contentType) axiosData.headers = { "Content-Type": contentType };
  console.log(axiosData);
  axios(axiosData)
    .then((res) => {
      return res.data.object;
    })
    .catch((err) => console.log(err));
}
