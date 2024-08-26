import { Hourglass } from "react-loader-spinner";
import Row from "react-bootstrap/Row";

export default function Loader({ children, isLoading }) {
  return isLoading ? (
    <Row className="justify-content-center">
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#306cce", "#72a1ed"]}
      />
    </Row>
  ) : (
    children
  );
}
