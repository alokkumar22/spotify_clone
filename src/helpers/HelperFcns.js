
export const getTokenFromURL = () => {
  const hashParams = {};
  window.location.hash
    .substring(1)
    .split("&")
    .forEach((param) => {
      hashParams[param.split("=")[0]] = decodeURIComponent(param.split("=")[1]);
    });
  return hashParams;
};

export const camelCaseToSentenceCase = (text) => {
  const result = text.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

export const getFormattedDate = (_date) => {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${day}-${month}-${year}`;
};

export const getFormattedDuration = (duration_ms) => {
  const durationSec = Math.floor(duration_ms / 1000);
  const min = Math.floor(durationSec / 60)
    .toString()
    .padStart(2, "0");
  const sec = (durationSec - 60 * min).toString().padStart(2, "0");
  return `${min} : ${sec}`;
};
