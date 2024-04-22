import ProgressWrapper from "./Progressbar.style";

const Progressbar = ({ done, ...props }) => {
  return (
    <ProgressWrapper {...props}>
      <div
        className="progress-done"
        style={{ width: `${done}%`, marginLeft: "5px" }}
      >
        <p>{done}%</p>
      </div>
    </ProgressWrapper>
  );
};

export default Progressbar;
