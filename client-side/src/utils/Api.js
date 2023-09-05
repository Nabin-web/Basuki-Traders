function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, options = {}) {
  // options.credentials = 'same-origin'; // eslint-disable-line no-param-reassign
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

export async function Api(
  uri,
  dispatch,
  sucessType,
  failureType,
  data,
  method,
  metaData
) {
  try {
    const baseUrl = "https//:localhost:2500";
    const requestURL = `${baseUrl}${uri}`;
    let options = {
      method: method ?? "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data !== undefined) {
      options.method = method == "DELETE" ? "DELETE" : "POST";
      options.body = JSON.stringify(data);
    }
    const res = await request(requestURL, options);
    dispatch({ type: sucessType, payload: res });
    return res;
  } catch (err) {
    let error = null;
    try {
      const errorPromise = err?.response?.json();
      error = await errorPromise;
      if (error?.errors && error?.errors?.name === "JsonWebTokenError") {
        // network error
      } else if (error && error?.msg === "Session Expired") {
        console.log("Token Expired Error.");
        // session expire error
      } else {
        dispatch({ type: failureType, payload: error });
      }
    } catch (e) {
      console.log(e, "e");
    }
    return error;
  }
}
