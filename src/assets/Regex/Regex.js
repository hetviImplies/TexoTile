export const OnlyNum = /[^0-9]/g
export const Decimal = /[^0-9 .]/g
export const RemoveZero = /^0+(?!\.|$)/

export const DecimalNum = /^\d+(\.\d{0,2})?$/
export const Validation=(text,setValue,lable)=>{
    let formattedText = text;
    console.log('label: ', lable);
  // Check if label is "machine", apply specific validation
  if (lable === "Machine") {

    formattedText = formattedText.replace(OnlyNum, '');  // Remove any non-numeric characters
  } else {
    formattedText = formattedText
      .replace(Decimal, '')  // Remove any non-numeric characters
      .replace(RemoveZero, '');  // Remove leading zeros, unless the number is "0" or starts with "0."
      const decimalIndex = formattedText.indexOf('.');
  if (decimalIndex !== -1) {
    formattedText = formattedText.substring(0, decimalIndex + 3);  // Allow only up to two digits after the decimal point
  }
  }
  setValue(formattedText);
  }



export const Validation_YarnData =(text,setvalue)=>{
    const formattedText = text.replace(/[^0-9.]/g, '').replace(/^0+(?!\.|$)/, '');
    setvalue(formattedText.includes('.')? formattedText.substring(0, formattedText.indexOf('.') + 3) : formattedText);
}

