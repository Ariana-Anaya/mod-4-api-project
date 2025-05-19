// for pricess higher than 1,000 per night, use this helper function to make sure any leading 0's are respected

const concatenateNextGroup = (priceString, nextGroupNum) => {
  let nextGroupString;
  if (!priceString.includes(".")) {
    nextGroupString = nextGroupNum.toFixed(2);
  } else {
    nextGroupString = nextGroupNum.toString();
  }
  if (nextGroupNum < 100 && nextGroupNum > 9) {
    priceString = `,0${nextGroupString}` + priceString;
  } else if (nextGroupNum < 10) {
    priceString = `,00${nextGroupString}` + priceString;
  } else {
    priceString = `,${nextGroupString}` + priceString;
  }
  return priceString;
};

const fixPrice = (priceToFix) => {
  if (!priceToFix) return;
  let numCommas = Math.floor(Math.log10(priceToFix) / 3);
  if (numCommas === 0) {
    return `$${priceToFix.toFixed(2)}`;
  }
  let fixedPrice = "";
  while (numCommas > 0) {
    const group = priceToFix % 1000;
    fixedPrice = concatenateNextGroup(fixedPrice, group);
    priceToFix = Math.floor(priceToFix / 1000);
    numCommas--;
  }
  fixedPrice = `$${priceToFix}` + fixedPrice;
  return fixedPrice;
};

export default fixPrice;
