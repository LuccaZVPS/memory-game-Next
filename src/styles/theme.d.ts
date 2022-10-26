import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      card: string;
      primary: string;
      secundary: string;
      insideCard: string;
      grey: string;
      card2: string;
      insideCard2: string;
    };
  }
}
