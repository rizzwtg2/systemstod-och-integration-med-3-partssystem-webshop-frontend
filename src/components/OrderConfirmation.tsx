import { useParams } from "react-router-dom";
export const OrderConfirmation = () => {
  const { session_id } = useParams();

  return <div>OrderConfirmation {session_id}</div>;
};
