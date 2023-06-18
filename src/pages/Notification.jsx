import { useEffect, useState } from 'react';

const Notification = ({ message, duration }) => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <>
      {showNotification && <div className="notification">{message}</div>}
      <style jsx>{`
        .notification {
          background-color: #212F3D;
          color:white;
          border-radius: 5px;
          width:200px;
          font-size: 18px;
          font-weight: bold;
          font-family: Roboto;
          height:48px;
          boxShadow: 0 3px 6px #00000029;
          padding: 15px;
          position: fixed;
          text-align:center;
          padding-top:10px;
          
          top: 100px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
        }
      `}</style>
    </>
  );
};

export default Notification;