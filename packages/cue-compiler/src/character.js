const Character = {
  isWhiteSpace(cp) {
    return cp === 32;
  },
  isLetter(cp) {
    return (
      cp === 45 || // -
      cp === 95 || // _
      (cp >= 0x41 && cp <= 0x5a) || // A..Z
      (cp >= 0x61 && cp <= 0x7a) // a..z
    );
  },
  isChar(cp) {
    return (
      cp === 46 || // .
      cp === 45 || // -
      cp === 95 || // _
      cp === 123 ||
      cp === 125 ||
      cp === 32 ||
      cp === 10 ||
      cp === 9 ||
      cp >= 0x30 && cp <= 0x39 ||
      (cp >= 0x41 && cp <= 0x5a) || // A..Z
      (cp >= 0x61 && cp <= 0x7a) // a..z
    );
  }
}

export default Character;