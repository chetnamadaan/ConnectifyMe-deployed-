import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessage from '../../context/useGetMessage.js';
import Loading from '../../components/Loading.jsx';
import useGetSocketMessage from '../../context/useGetSocketMessage';

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();
  console.log(messages);

  const lastMsgRef = useRef();

  const safeMessages = Array.isArray(messages) ? messages : [];

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }, 100);
  }, [safeMessages]);

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: 'calc(92vh - 8vh)' }}>
      {loading ? (
        <Loading />
      ) : (
        safeMessages.length > 0 &&
        safeMessages.map((message, index) => (
          <div key={message._id || index} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      )}

      {!loading && safeMessages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">Say! Hi to start the conversation</p>
        </div>
      )}
    </div>
  );
}

export default Messages;
