export const validationSchema = {
  title(value) {
    if (value?.length >= 6) return true;
    return "Title is mandatory or too short";
  },
  price(value) {
    /*
        ^ - Representa el inicio de la cadena.
        [0-9]+ - Representa cualquier número del 0 al 9. El + indica que debe haber al menos un dígito, pero puede haber más.
        $ - Representa el final de la cadena.
    */
    if (/^[0-9]+$/.test(value)) return true;
    return "Price should only be numbers";
  },
  rooms(value) {
    if (value) return true;
    return "Select a quantity";
  },
  bathrooms(value) {
    if (value) return true;
    return "Select a quantity";
  },
  parking(value) {
    if (value) return true;
    return "Select a quantity";
  },
  description(value) {
    if (value) return true;
    return "Add a description";
  },
};

export const imageSchema = {
  image(value) {
    if (value) return true;
    return "Image is mandatory";
  },
};
