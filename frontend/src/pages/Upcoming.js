import { useMemo } from "react";
import { 
  withStyles,
  Appear,
  Link,
  Paragraph,
  Table,
  Words,
} from "arwes";

import Clickable from "../components/Clickable";

const styles = () => ({
  link: {
    color: "red",
    textDecoration: "none",
  },
});

const Upcoming = props => {
  const { 
    entered,
    launches,
    classes,
    abortLaunch,
  } = props;

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.launchNumber)}>
          <td>
            <Clickable style={{color:"red"}}>
              <Link className={classes.link} onClick={() => abortLaunch(launch.launchNumber)}>
                ✖
              </Link>
            </Clickable>
          </td>
          <td>{launch.launchNumber}</td>
          <td>{new Date(launch.date).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.destination}</td>
        </tr>;
      });
  }, [launches, abortLaunch, classes.link]);

  return <Appear id="upcoming" animate show={entered}>
    <Paragraph>Yaklaşan görevler aşağıda ki gibidir.</Paragraph>
    <Words animate>Uyarı! ✖' e tıklayarak görevi sonlandırabilirsiniz </Words>
    <Table animate show={entered}>
      <table style={{tableLayout: "fixed"}}>
        <thead>
          <tr>
            <th style={{width: "3rem"}}></th>
            <th style={{width: "6rem"}}>Numara</th>
            <th style={{width: "10rem"}}>Tarih</th>
            <th style={{width: "11rem"}}>Görev</th>
            <th style={{width: "11rem"}}>Roket</th>
            <th>Varış Yeri</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </table>
    </Table>
  </Appear>;
}

export default withStyles(styles)(Upcoming);