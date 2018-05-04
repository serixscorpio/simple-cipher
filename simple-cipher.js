module.exports = function Cipher() {
  this.randomString = (length) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = length; i > 0; --i) result += alphabet[Math.floor(Math.random() * 26)];
    return result;
	};

  this.key = this.randomString(100);

  /*
   * Example:
   * input: 'a' -> output: 0
   * input: 'b' -> output: 1
   */
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

  this.substitute = (plainChar, keyChar) => {
    // 1. turn plainChar into ascii
    const plainAscii = plainChar.charCodeAt();
    // 2. turn keyChar into ascii
    // 3. calculate how many positions to shift based on step 2
    const positionsToShift = this.calculatePositionsToShift(keyChar);
    // 4. calculate the shifted ascii code
    const shiftedAsciiCode = this.shiftRight(plainAscii, positionsToShift);
    // 5. turn the shifted ascii code back into character. call this cipherChar.
    return String.fromCharCode(shiftedAsciiCode);
  };

  this.substituteDecode = () => {
  //1. turn encoded into ascii
  //2. turn
  };

  this.encode = (plaintext) => {
    // plaintext 'aaa...'
    // output: 'bbb...' given the key is 'bbb...'
    let ciphertext = '';
    for (let i = 0; i < plaintext.length; i += 1) {
      // we narrow down the problem to only allowing lowercase a-z

      const plainChar = plaintext[i];
      const keyChar = this.key[i];
      const cipherChar = this.substitute(plainChar, keyChar);

      ciphertext += cipherChar;
      console.log(ciphertext);
    }
    return ciphertext; // this is incorrect for now
  };

  this.decode = (ciphertext) => {

  	let decodetext = '';
  	for (let i = 0; i < ciphertext.length; i += 1) {

  		}

  };

};
