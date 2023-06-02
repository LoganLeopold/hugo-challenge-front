export const validationMethodMap ={
  /*
    RETURN ARRAYS OF ERRORS TO BE ITERATED BY FIELD RENDER && SENT TO DOCUMENT LEVEL FOR ERROR STATE
  */

  birthday: (value) => {
    let errors = []
    const bdayRegex = new RegExp(/([0][1-9]|[1][012])\/([0][1-9]|[12][0-9]|[3][01])\/(19|20)[0-9][0-9]/);
    const regTest = bdayRegex.test(value) 
    const dateErrorMessage = "Needs to be in MM/DD/YYYY format.";

    if (regTest === false) errors.push(dateErrorMessage);

    let now = new Date().getTime()
    let bday = new Date(value).getTime();
    let ageInMils = now - bday // milliseconds difference

    let age = 
      ageInMils // milliseconds
      / 1000 // to seconds
      / 60 // to minutes
      / 60 // to hours
      / 24 // to days
      / 365 // to years
    
    const ageErrorMessage = "Must be 16 years old to apply.";
      
    if (age < 16) errors.push(ageErrorMessage);
    return errors;
  },

  varChar: (value, maxLength) => {
    if (value) {
      return value.length < maxLength ? [] : [`Needs to be less than ${maxLength}`];
    }
  },
  
  year: (year) => {
    if (year > new Date().getFullYear() + 1 || year < 1985) {
      return ["Year must be a numeric value between 1985 and the year after this (in the year 2023, this value can be 2024)."]
    } else {
      return [];
    }
  },

  zipcode: (zipcode) => {
    let errors = [];
    const exp = new RegExp(/^\d{5}$/g)
    if (isNaN(zipcode)) errors.push("Zipcode must be a number.");
    if (exp.test(zipcode) === false) errors.push("Zipcode must be a valid zipcode in five-number format.");
    return errors;
  }
}

