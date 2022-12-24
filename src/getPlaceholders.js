import { Placeholder } from "react-bootstrap";

export function getPlaceholders(number, height, width) {
  const array = [];
  for (let i = 1; i <= number; i++) {
    array.push(
      <Placeholder as="p" animation="glow" key={i}>
        <Placeholder
          size="lg"
          style={{
            margin: "10px",
            height: `${height}px`,
            width: `${width}px`,
          }}
        />
      </Placeholder>
    );
  }
  return array;
}
