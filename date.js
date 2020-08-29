exports.getDate = function () {
  const date = new Date();
  //var today = date.getDay();

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};

exports.getDay = function () {
  const date = new Date();
  //var today = date.getDay();

  const options = {
    weekday: "long",
  };

  return date.toLocaleDateString("en-US", options);
};
