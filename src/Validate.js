class Validate {
  static isEmail(email) {
    return email.match(/^[a-z0-9\.]{1,}@[a-z0-9]{1,}\.[a-z0-9]{1,5}$/);
  }

  static isNumber(number) {
    return number.match(/^[0-9]{1,}$/);
  }
}

export default Validate;
