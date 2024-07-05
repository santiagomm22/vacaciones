import Card, { CardBody } from "./components/Card";
import List from "./components/List";

function App() {
  const list: string[] = ["goku", "tanjiro", "eren"];
  const handleSelect = (elemento: string) => {
    console.log("imprimiendo", elemento);
  };

  return (
    <Card>
      <CardBody title="Hola mundo" text="Este es el texto" />
      {list.length !== 0 ? (
        <List data={list} onSelect={handleSelect} />
      ) : (
        "no hay contenido"
      )}
    </Card>
  );
}

export default App;
