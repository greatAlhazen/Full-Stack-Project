import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return <ArwesFooter animate>
    <Centered>
      <Paragraph style={{ fontSize: 14, margin: "20px 0" }}>
        Bu resmi bir sayfa değildir.Eğitim amaçlı olarak tasarlanmıştır.
      </Paragraph>
    </Centered>
  </ArwesFooter>
};

export default Footer;
