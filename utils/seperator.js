module.exports.seperator = (number = "") => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
