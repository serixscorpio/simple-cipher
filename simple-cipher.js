module.exports = function Cipher(userKey) {
  /* returns nothing if the userKey is good, throws an error if the userKey is
   * bad for some reason
   */
  this.validateKey = (key) => {
    if (key.length === 0) {
      throw new Error('Bad key');
    }
    for (let i = 0; i < key.length; i += 1) {
      if (!'abcdefghijklmnopqrstuvwxyz'.includes(key[i])) {
        throw new Error('Bad key');
      }
    }
  };

  this.randomString = (length) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = length; i > 0; i -= 1) result += alphabet[Math.floor(Math.random() * 26)];
    return result;
  };

  // setup the key to use
  if (userKey === undefined) {
    this.key = this.randomString(100);
  } else {
    this.validateKey(userKey);
    this.key = userKey;
  }

  /*
   * Example:
   * input: 'a' -> output: 0
   * input: 'b' -> output: 1
   */
  /* eslint arrow-body-style: ["error", "always"] */
  this.calculatePositionsToShift = (character) => {
    return character.charCodeAt() - 97;
  };

  this.shiftRight = (startingAsciiCode, positionsToShift) => {
    let shiftedAsciiCode = startingAsciiCode + positionsToShift;
    if (shiftedAsciiCode > 122) { // 122 corresponds to 'z'
      shiftedAsciiCode -= 26;
    }
    return shiftedAsciiCode;
  };

  /* Examples, when shifting 3 positions to left
   * 'd' -> 'a'
   * 'c' -> 'z'
   * 'b' -> 'y'
   */
  this.shiftLeft = (cipherAscii, positionsToShift) => {
    let shiftedAsciiCode = cipherAscii - positionsToShift;
    if (shiftedAsciiCode < 97) { // 97 corresponds to 'a'
      shiftedAsciiCode += 26;
    }
    return shiftedAsciiCode;
  };

  this.substitute = (inputChar, keyChar, shiftFn) => {
    // 1. turn inputChar into ascii
    const inputAscii = inputChar.charCodeAt();
    // 2. turn keyChar into ascii
    // 3. calculate how many positions to shift based on step 2
    const positionsToShift = this.calculatePositionsToShift(keyChar);
    // 4. calculate the shifted ascii code
    const shiftedAsciiCode = shiftFn(inputAscii, positionsToShift);
    // 5. turn the shifted ascii code back into character
    return String.fromCharCode(shiftedAsciiCode);
  };

  this.encode = (plaintext) => {
    // plaintext 'aaa...'
    // output: 'bbb...' given the key is 'bbb...'
    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i += 1) {
      // we narrow down the problem to only allowing lowercase a-z

      const plainChar = plaintext[i];
      const keyChar = this.key[i % this.key.length];
      const cipherChar = this.substitute(plainChar, keyChar, this.shiftRight);

      ciphertext += cipherChar;
    }
    return ciphertext;
  };

  this.decode = (ciphertext) => {
    let decodetext = '';
    for (let i = 0; i < ciphertext.length; i += 1) {
      const cipherChar = ciphertext[i];
      const keyChar = this.key[i];
      const decodedChar = this.substitute(cipherChar, keyChar, this.shiftLeft);
      decodetext += decodedChar;
    }
    return decodetext;
  };
};
