import { Button } from "antd";
import { Link } from "react-router-dom";
import { SOnboarding } from "./styles";

export default function Onboarding() {

  return (
    <SOnboarding>
      <img src="/images/bank.png" alt="video" width={250} />
      <p style={{color: "black"}}>Bank branch manager</p>
      <Link to="/login">
        <Button type="primary">
          Login
        </Button>
      </Link>
    </SOnboarding>
  );
}
