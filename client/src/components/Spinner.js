import React from "react";
import { BeatLoader } from "react-spinners";

const override = `
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
`;

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <BeatLoader
          css={override}
          size={18}
          margin={2}
          color={"#BDBDC0"}
          loading={true}
        />
      </div>
    );
  }
}

export default Spinner;
