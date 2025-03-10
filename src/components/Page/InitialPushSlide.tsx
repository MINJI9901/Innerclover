import MessageForm from "../Form/MessageForm";
import CloverFrame from "../Layout/CloverFrame";

export default function InitialPushSlide() {
  return (
    <CloverFrame
      text={
        <>
          What do you want to say to
          <br />
          yourself of tomorrow?
        </>
      }
    >
      <MessageForm></MessageForm>
    </CloverFrame>
  );
}
