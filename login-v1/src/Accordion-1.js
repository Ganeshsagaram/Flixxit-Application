import Accordion from 'react-bootstrap/Accordion';

function BasicExample() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
         Body 1
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
        Body 2
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;