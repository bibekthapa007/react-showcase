var errors = {};

function isURL(str) {
  var res = str.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res) {
    return true;
  } else {
    errors.link = "Sorry link is not valid";
    // return false;
  }
}

function isValidString(str, data) {
  const length = str.length;
  if (length === 0) {
    errors[data] = "Field is required";
  } else if (length > 4) {
    return true;
  } else {
    errors[data] = "Should be more than 4 letter";
  }
}

function isFromValid(data) {
  isURL(data.link);
  isValidString(data.title, "title");
  isValidString(data.artist, "artist");
  isValidString(data.medium, "medium");
  isValidString(data.contributor, "contributor");

  if (Object.keys(errors).length === 0) {
    console.log("empty");
    return true;
  } else {
    return errors;
  }
}

export { isFromValid };
