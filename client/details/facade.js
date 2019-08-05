import {serverUrl} from "../../commons/config.js"

export const getPropsOfSelected = async (name, props) => {
  const queryParams = props.map((prop, i) => `param=${prop}`).join('&')
  const response = await fetch(`${serverUrl}${name}?${queryParams}`);
  return await response.json() || {};
}
