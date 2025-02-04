import Message from "./Message";
function ConversationContent() {
  return (
    <div className="pt-3 flex-grow px-4 overflow-hidden overflow-y-scroll">
      <Message
        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt assumenda voluptatum quod ipsa rerum iste repudiandae vel aliquid qui error."
        type="sender"
        time={`120:17PM`}
      />
      <Message
        message="Elit. Nesciunt assumenda voluptatum quod ipsa rerum iste repudiandae vel aliquid qui error."
        type="receiver"
        time={`120:17PM`}
      />
      <Message
        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt assumenda "
        type="sender"
        time={`120:17PM`}
      />
      <Message
        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt assumenda voluptatum quod ipsa rerum iste repudiandae vel aliquid qui error."
        type="sender"
        time={`120:17PM`}
      />
      <Message
        message="Elit. Nesciunt assumenda voluptatum quod ipsa rerum iste repudiandae vel aliquid qui error."
        type="receiver"
        time={`120:17PM`}
      />
      <Message
        message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt assumenda "
        type="sender"
        time={`120:17PM`}
      />
    </div>
  );
}

export default ConversationContent;
