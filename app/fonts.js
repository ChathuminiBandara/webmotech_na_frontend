import { Poppins ,Quicksand } from "next/font/google";

export const poppins = Poppins({
    weight: ["100","200","300", "400","500", "600","700","800", "900"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
  });

  export const quicksand = Quicksand({
    weight: ["300", "400","500", "600","700"],
    style: ["normal"],
    subsets: ["latin"],
    display: "swap",
  });