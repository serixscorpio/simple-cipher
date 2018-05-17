module.exports = class Cipher {

// setup the key to use
  constructor(userKey) {
    if (userKey === undefined) {
      this.key = Cipher.randomString(100);
    } else {
      Cipher.validateKey(userKey);
      this.key = userKey;
    }
  }

  /* returns nothing if the userKey is good, throws an error if the userKey is
   * bad for some reason
   */
  static validateKey(key) {
    if (key.length === 0) {
      throw new Error('Bad key');
    }
    for (let i = 0; i < key.length; i += 1) {
      if (!'abcdefghijklmnopqrstuvwxyz'.includes(key[i])) {
        throw new Error('Bad key');
      }
    }
  }

  static randomString(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = length; i > 0; i -= 1) result += alphabet[Math.floor(Math.random() * 26)];
    return result;
  }

  /*
   * Example:
   * input: 'a' -> output: 0
   * input: 'b' -> output: 1
   */
  /* eslint arrow-body-style: ["error", "always"] */
  static calculatePositionsToShift(character) {
    return character.charCodeAt() - 97;
  }

  static shiftRight(startingAsciiCode, positionsToShift) {
    let shiftedAsciiCode = startingAsciiCode + positionsToShift;
    if (shiftedAsciiCode > 122) { // 122 corresponds to 'z'
      shiftedAsciiCode -= 26;
    }
    return shiftedAsciiCode;
  }

  /* Examples, when shifting 3 positions to left
   * 'd' -> 'a'
   * 'c' -> 'z'
   * 'b' -> 'y'
   */
  static shiftLeft(cipherAscii, positionsToShift) {
    let shiftedAsciiCode = cipherAscii - positionsToShift;
    if (shiftedAsciiCode < 97) { // 97 corresponds to 'a'
      shiftedAsciiCode += 26;
    }
    return shiftedAsciiCode;
  }

  substituteRight(inputChar, i) {
    const keyChar = this.key[i % this.key.length];
    // 1. turn inputChar into ascii
    const inputAscii = inputChar.charCodeAt();
    // 2. turn keyChar into ascii
    // 3. calculate how many positions to shift based on step 2
    const positionsToShift = Cipher.calculatePositionsToShift(keyChar);
    // 4. calculate the shifted ascii code
    const shiftedAsciiCode = Cipher.shiftRight(inputAscii, positionsToShift);
    // 5. turn the shifted ascii code back into character
    return String.fromCharCode(shiftedAsciiCode);
  }

  substituteLeft(inputChar, i) {
    const keyChar = this.key[i % this.key.length];
    const inputAscii = inputChar.charCodeAt();
    const positionsToShift = Cipher.calculatePositionsToShift(keyChar);
    const shiftedAsciiCode = Cipher.shiftLeft(inputAscii, positionsToShift);
    return String.fromCharCode(shiftedAsciiCode);
  }

  encode(plaintext) {
      // plaintext 'aaa...'
    // output: 'bbb...' given the key is 'bbb...'
  	return plaintext.split("").map(this.substituteRight,this).join("")
  }

  decode(ciphertext) {
    return ciphertext.split("").map(this.substituteLeft,this).join("")
  }
};
