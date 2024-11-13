import Lottie from "lottie-react";
import animationData from "../../assets/lottie/Animation - 1730784615142.json";

const AppLoading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Increase the size here */}
      <div style={{ width: "500px",   }}>
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default AppLoading;
