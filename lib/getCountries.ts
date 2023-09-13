import { gql } from "@apollo/client";

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      native
      capital
      emoji
      emojiU
      currency
      continent {
        name
      }
      languages {
        code
        name
      }
    }
  }
`;

export default GET_COUNTRIES;
