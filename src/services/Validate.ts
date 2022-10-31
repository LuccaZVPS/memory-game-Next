import validator from "validator";
export class Validate {
  static hasSpace(inputArray: inputArray[]): boolean {
    let array: boolean[] = [];
    inputArray.forEach((item) => {
      let space = item.txt.indexOf(" ") >= 0;
      if (space) {
        if (item.id !== undefined) {
          this.displayError("cannot contain spaces", item.id);
        }
        array.push(true);
      } else {
        array.push(false);
      }
    });

    if (array.includes(true)) {
      return true;
    }
    return false;
  }

  static lentghIsWrong(inputArray: inputArray[]): boolean {
    let array: boolean[] = [];

    inputArray.forEach((item) => {
      if (
        item.txt.length < item.minMax[0] ||
        item.txt.length > item.minMax[1]
      ) {
        if (item.id !== undefined) {
          this.displayError(
            `must contain ${item.minMax[0]}/${item.minMax[1]} characters `,
            item.id
          );
        }

        array.push(true);
      } else {
        array.push(false);
      }
    });
    if (array.includes(true)) {
      return true;
    }
    return false;
  }

  static notEqual(field1: string, field2: string, id: string): boolean {
    if (field1 === field2) {
      return false;
    }
    this.displayError("passwords do not match", id);
    return true;
  }

  static notEmail(field: string, id?: string): boolean {
    if (validator.isEmail(field)) {
      return false;
    }
    if (id !== undefined) {
      this.displayError("Invalid e-mail", id);
    }
    return true;
  }

  static displayError(error: string, id: string) {
    let input = document.getElementById(id);
    const parent = input?.parentElement;
    var errorText = parent?.querySelector("p") as HTMLParagraphElement;

    errorText.innerText = error;
  }

  static clearErrors(inputArray: inputArray[]) {
    inputArray.forEach((item) => {
      if (item.id !== undefined) {
        this.displayError("", item.id);
      }
    });
  }
}

interface inputArray {
  id?: string;
  txt: string;
  minMax: number[];
}
