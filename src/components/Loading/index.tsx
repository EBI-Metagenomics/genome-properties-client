import "./style.css";

const Loading = ({ fontSize = "1rem" }: { fontSize?: string }) => (
  <div className="lds-ellipsis" style={{ fontSize }}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loading;
