function isAlphabetical(inputString) {
  // Regular expression to match only alphabetical characters
  const alphabeticalRegex = /^[a-zA-Z]+$/;

  // Test the input string against the regular expression
  return alphabeticalRegex.test(inputString);
}

function reponseFormat(response_object, status_code, msg="", data = null) {
  return response_object.status(status_code).send({
              status: status_code,
              msg: msg,
              data: data,
              // token:token,
            })
};



module.exports = { isAlphabetical, reponseFormat };
