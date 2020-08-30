const STATUSES = {
  OK: 200,
  isOk(status) {
    return status === this.OK;
  },
};

const sendRequest = async (url, apiName = '') => {
  const response = await fetch(url);
  const result = await response.json();

  if (!result) {
    throw new Error(`Invalid ${apiName} response`);
  }

  return result;
};

const isString = (item) => typeof item === 'string';

export default {
  STATUSES,
  sendRequest,
  isString,
};
