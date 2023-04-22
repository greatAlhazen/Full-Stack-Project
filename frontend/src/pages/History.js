import { useMemo } from "react";
import { Appear, Table, Paragraph } from "arwes";

const History = props => {
  const tableBody = useMemo(() => {
    return props.launches?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return <tr key={String(launch.launchNumber)}>
          <td>
            <span style={
              {color: launch.success ? "greenyellow" : "red"}
            }>█</span>
          </td>
          <td>{launch.launchNumber}</td>
          <td>{new Date(launch.date).toDateString()}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.customers?.join(", ")}</td>
        </tr>;
      });
  }, [props.launches]);

  return <article id="history">
    <Appear animate show={props.entered}>
      <Paragraph>History of mission launches including SpaceX launches starting from the year 2006.</Paragraph>
      <Table animate>
        <table style={{tableLayout: "fixed"}}>
          <thead>
            <tr>
            <th style={{width: "2rem"}}></th>
            <th style={{width: "6rem"}}>Numara</th>
            <th style={{width: "10rem"}}>Tarih</th>
            <th style={{width: "11rem"}}>Görev</th>
            <th style={{width: "11rem"}}>Roket</th>
              <th>Müşteriler</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </table>
      </Table>
    </Appear>
  </article>;
}
  
export default History;