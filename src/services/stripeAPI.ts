import axios from "axios";
import { API_URL } from "../config/api";
import { Token } from "@stripe/stripe-js";

const checkout = ({
  cardToken,
  points,
}: {
  cardToken: Token | undefined;
  points: number;
}) =>
  axios
    .post((API_URL as string) + "/checkout", {
      cardToken,
      points,
    })
    .then((res) => res.data.data);

export default { checkout };
