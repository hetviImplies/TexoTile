export const OnlyNum = /[^0-9]/g;
export const Decimal = /[^0-9 .]/g;
export const RemoveZero = /^0+(?!\.|$)/;
export const emailRegex = /^(?:[\w\.-\s]+)?@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
export const DecimalNum = /^\d+(\.\d{0,2})?$/;



export const Validation = (text, setValue, lable) => {
  let formattedText = text;
  // Check if label is "machine", apply specific validation
  if (lable === 'Machine') {
    formattedText = formattedText.replace(OnlyNum, ''); // Remove any non-numeric characters
  } else {
    let decimalCount = 0;
    formattedText = formattedText
      .split('')
      .filter(char => {
        if (char === '.') {
          decimalCount++;
          return decimalCount <= 1; // allow only one decimal point
        }
        return char.match(/[0-9]/); // allow only numbers
      })
      .join('');
    const decimalIndex = formattedText.indexOf('.');
    if (decimalIndex !== -1) {
      const decimalPart = formattedText.substring(decimalIndex + 1);
      if (decimalPart.length > 2) {
        formattedText = formattedText.substring(0, decimalIndex + 3); // Allow only up to two digits after the decimal point
      }
    }
  }
  setValue(formattedText);
};

export const Validation_YarnData = (text, setvalue) => {
  const formattedText = text.replace(/[^0-9.]/g, '').replace(/^0+(?!\.|$)/, '');
  setvalue(
    formattedText.includes('.')
      ? formattedText.substring(0, formattedText.indexOf('.') + 3)
      : formattedText,
  );
};
